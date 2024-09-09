'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Edit, Plus, Save, X, Lock, LogIn } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';


dotenv.config();


// Types
type Teacher = {
    id: string
    name: string
    role: string
    qualifications: string[]
    image: string
}

type Benefit = {
    id: string
    title: string
    description: string
    animationData: any
}

type Course = {
    id: string
    title: string
    icon: string
    features: string[]
}

type Testimonial = {
    id: string
    name: string
    sub: string
    sub1: string
    city: string
    text: string
    image: string
}

type SiteContent = {
    heroTitle: string
    heroSubtitle: string
    benefits: Benefit[]
    courses: Course[]
    testimonials: Testimonial[]
}



export default function AdminDashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loginPassword, setLoginPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [siteContent, setSiteContent] = useState<SiteContent>({
        heroTitle: '',
        heroSubtitle: '',
        benefits: [],
        courses: [],
        testimonials: []
    })
    const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)
    const [editingBenefit, setEditingBenefit] = useState<Benefit | null>(null)
    const [editingCourse, setEditingCourse] = useState<Course | null>(null)
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [pendingAction, setPendingAction] = useState<() => Promise<void>>(() => async () => { })
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        if (isLoggedIn) {
            const loadData = async () => {
                const [teachersData, contentData] = await Promise.all([
                    fetchTeachers(),
                    fetchSiteContent()
                ])
                setTeachers(teachersData)
                setSiteContent(contentData)
                setIsLoading(false)
            }
            loadData()
        }
    }, [isLoggedIn, refresh])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const isValid = await verifyPassword(loginPassword)
        if (isValid) {
            setIsLoggedIn(true)
            setLoginPassword('')
            setLoginError('')
        } else {
            setLoginError('Incorrect password. Please try again.')
        }
    }

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const isValid = await verifyPassword(password)
        if (isValid) {
            setShowPasswordModal(false)
            setPassword('')
            setPasswordError('')
            await pendingAction()
        } else {
            setPasswordError('Incorrect password. Please try again.')
        }
    }

    const requirePassword = (action: () => Promise<void>) => {
        setPendingAction(() => action)
        setShowPasswordModal(true)
    }

    const handleTeacherSave = async (teacher: Teacher) => {
        requirePassword(async () => {
            const updatedTeacher = await saveTeacher(teacher)
            setTeachers(teachers.map(t => t.id === updatedTeacher.id ? updatedTeacher : t))
            setEditingTeacher(null)
        })
    }

    const handleTeacherDelete = async (id: string) => {
        requirePassword(async () => {
            await deleteTeacher(id)
            setTeachers(teachers.filter(t => t.id !== id))
        })
    }

    const handleBenefitSave = async (benefit: Benefit) => {
        requirePassword(async () => {
            const updatedBenefit = await saveBenefit(benefit)
            setSiteContent({
                ...siteContent,
                benefits: siteContent.benefits.map(b => b.id === updatedBenefit.id ? updatedBenefit : b)
            })
            setEditingBenefit(null)
        })
    }

    const handleBenefitDelete = async (id: string) => {
        requirePassword(async () => {
            await deleteBenefit(id)
            setSiteContent({
                ...siteContent,
                benefits: siteContent.benefits.filter(b => b.id !== id)
            })
        })
    }

    const handleCourseSave = async (course: Course) => {
        requirePassword(async () => {
            const updatedCourse = await saveCourse(course)
            setSiteContent({
                ...siteContent,
                courses: siteContent.courses.map(c => c.id === updatedCourse.id ? updatedCourse : c)
            })
            setEditingCourse(null)
        })
    }

    const handleCourseDelete = async (id: string) => {
        requirePassword(async () => {
            await deleteCourse(id)
            setSiteContent({
                ...siteContent,
                courses: siteContent.courses.filter(c => c.id !== id)
            })
        })
    }

    const handleTestimonialSave = async (testimonial: Testimonial) => {
        requirePassword(async () => {
            const updatedTestimonial = await saveTestimonial(testimonial)
            setSiteContent({
                ...siteContent,
                testimonials: siteContent.testimonials.map(t => t.id === updatedTestimonial.id ? updatedTestimonial : t)
            })
            setEditingTestimonial(null)
        })
    }

    const handleTestimonialDelete = async (id: string) => {
        requirePassword(async () => {
            await deleteTestimonial(id)
            setSiteContent({
                ...siteContent,
                testimonials: siteContent.testimonials.filter(t => t.id !== id)
            })
        })
    }

    const handleContentSave = async () => {
        requirePassword(async () => {
            await saveSiteContent(siteContent)
            alert('Site content saved successfully!')
        })
    }

    const fetchTeachers = async (): Promise<Teacher[]> => {
        return await fetch('/api/professores').then((res) => res.json()).then((data) => { return data });
    }
    const fetchSiteContent = async (): Promise<SiteContent> => {
        const benefits = await fetch('/api/benefits').then((res) => res.json()).then((data) => { return data });
        const depoiments = await fetch('/api/depoiments').then((res) => res.json()).then((data) => { return data });
        const courses = await fetch('/api/courses').then((res) => res.json()).then((data) => { return data });
        const { title, role } = await fetch('/api/hero').then((res) => res.json()).then((data) => { return data[0] });
        return { heroTitle: title, heroSubtitle: role, benefits, courses, testimonials: depoiments }
    }

    const saveTeacher = async (teacher: Teacher): Promise<Teacher> => {
        let response

        if (teacher.id) {
            response = await fetch('/api/professores/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teacher),
            });
            console.log(response);
            
            if (!response.ok) {
                throw new Error('Erro ao atualizar professor');
            }
        } else {
            teacher.id = uuidv4()
            response = await fetch('/api/professores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teacher),
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar professor');
            }
        }

        setRefresh(!refresh)
        return await response.json()
    }

    const deleteTeacher = async (id: string): Promise<void> => {
        const response = await fetch(`/api/professores`, {
            method: 'DELETE',
            body: JSON.stringify(id)
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar professor');
        }
        setRefresh(!refresh)
    }

    const saveBenefit = async (benefit: Benefit): Promise<Benefit> => {
        let response
        if (benefit.id) {
            response = await fetch('/api/benefits', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(benefit),
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar benefício');
            }
        } else {
            benefit.id = uuidv4()
            response = await fetch('/api/benefits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(benefit),
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar benefício');
            }
        }

        setRefresh(!refresh)

        return await response.json(); // Retorna o benefício salvo
    }

    const deleteBenefit = async (id: string): Promise<void> => {
        const response = await fetch(`/api/benefits`, {
            method: 'DELETE',
            body: JSON.stringify(id),
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar benefício');
        }
        setRefresh(!refresh)
    }

    const saveCourse = async (course: Course): Promise<Course> => {
        let response
        if (course.id) {
            response = await fetch('/api/courses', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(course),
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar curso');
            }
        } else {
            course.id = uuidv4()
            response = await fetch('/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(course),
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar curso');
            }
        }


        setRefresh(!refresh)

        return await response.json(); // Retorna o curso salvo
    }

    const deleteCourse = async (id: string): Promise<void> => {
        const response = await fetch(`/api/courses`, {
            method: 'DELETE',
            body: JSON.stringify(id),
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar curso');
        }
        setRefresh(!refresh)
    }

    const saveTestimonial = async (testimonial: Testimonial): Promise<Testimonial> => {
        testimonial.id = uuidv4()
        const response = await fetch('/api/testimonials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testimonial),
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar depoimento');
        }

        setRefresh(!refresh)

        return await response.json();
    }

    const deleteTestimonial = async (id: string): Promise<void> => {
        const response = await fetch(`/api/testimonials`, {
            method: 'DELETE',
            body: JSON.stringify(id),
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar depoimento');
        }
        setRefresh(!refresh)
    }

    const saveSiteContent = async (content: SiteContent): Promise<void> => {

        const response = await fetch('/api/sitecontent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar conteúdo do site');
        }

        setRefresh(!refresh)
    }

    const verifyPassword = async (password: string): Promise<boolean> => {
        return password === process.env.NEXT_PUBLIC_PASSWORD;
    }

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter admin password"
                                required
                            />
                        </div>
                        {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
                        >
                            <LogIn className="mr-2" size={20} />
                            Login
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 text-black">
            <h1 className="text-3xl font-bold mb-8">Cre8 Admin Dashboard</h1>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Teachers</h2>
                <div className="space-y-4">
                    {teachers.map(teacher => (
                        <motion.div
                            key={teacher.id}
                            className="bg-white p-4 rounded shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold">{teacher.name}</h3>
                                <div>
                                    <button
                                        onClick={() => setEditingTeacher(teacher)}
                                        className="text-blue-500 mr-2"
                                    >
                                        <Edit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleTeacherDelete(teacher.id)}
                                        className="text-red-500"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600">{teacher.role}</p>
                            <ul className="list-disc list-inside mt-2">
                                {teacher.qualifications.map((exp, index) => (
                                    <li key={index}>{exp}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
                <button
                    onClick={() => setEditingTeacher({ id: '', name: '', role: '', qualifications: [], image: '' })}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded flex items-center"
                >
                    <Plus size={20} className="mr-2" /> Add New Teacher
                </button>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Benefits</h2>
                <div className="space-y-4">
                    {siteContent.benefits.map((benefit) => (
                        <motion.div
                            key={benefit.id}
                            className="bg-white p-4 rounded shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                                <div>
                                    <button
                                        onClick={() => setEditingBenefit(benefit)}
                                        className="text-blue-500 mr-2"
                                    >
                                        <Edit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleBenefitDelete(benefit.id)}
                                        className="text-red-500"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600">{benefit.description}</p>
                            <p className="text-gray-600">{benefit.animationData}</p>
                        </motion.div>
                    ))}
                </div>
                <button
                    onClick={() => setEditingBenefit({ id: '', title: '', description: '', animationData: null })}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded flex items-center"
                >
                    <Plus size={20} className="mr-2" /> Add New Benefit
                </button>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Courses</h2>
                <div className="space-y-4">
                    {siteContent.courses.map((course) => (
                        <motion.div
                            key={course.id}
                            className="bg-white p-4 rounded shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xl font-semibold">{course.title}</h3>
                                <div>
                                    <button
                                        onClick={() => setEditingCourse(course)}
                                        className="text-blue-500 mr-2"
                                    >
                                        <Edit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleCourseDelete(course.id)}
                                        className="text-red-500"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600">Icon: {course.icon}</p>
                            <ul className="list-disc list-inside mt-2">
                                {course.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
                <button
                    onClick={() => setEditingCourse({ id: '', title: '', icon: '', features: [] })}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded flex items-center"
                >
                    <Plus size={20} className="mr-2" /> Add New Course
                </button>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
                <div className="space-y-4">
                    {siteContent.testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            className="bg-white p-4 rounded shadow"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                                <div>
                                    <button
                                        onClick={() => setEditingTestimonial(testimonial)}
                                        className="text-blue-500 mr-2"
                                    >
                                        <Edit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleTestimonialDelete(testimonial.id)}
                                        className="text-red-500"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600">{testimonial.sub}</p>
                            <p className="text-gray-600">{testimonial.sub1}</p>
                            <p className="text-gray-600">{testimonial.city}</p>
                            <p className="mt-2">{testimonial.text}</p>
                        </motion.div>
                    ))}
                </div>
                <button
                    onClick={() => setEditingTestimonial({ id: '', name: '', sub: '', sub1: '', city: '', text: '', image: '' })}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded flex items-center"
                >
                    <Plus size={20} className="mr-2" /> Add New Testimonial
                </button>
            </section>


            {editingTeacher && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">{editingTeacher.id ? 'Edit' : 'Add'} Teacher</h2>
                        <input
                            type="text"
                            value={editingTeacher.name}
                            onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            value={editingTeacher.role}
                            onChange={(e) => setEditingTeacher({ ...editingTeacher, role: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Subtitle"
                        />
                        <input
                            type="text"
                            value={editingTeacher.image}
                            onChange={(e) => setEditingTeacher({ ...editingTeacher, image: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Image URL"
                        />
                        <div className="mb-2">
                            {editingTeacher.qualifications.map((exp, index) => (
                                <div key={index} className="flex mb-2">
                                    <input
                                        type="text"
                                        value={exp}
                                        onChange={(e) => {
                                            const newExperiences = [...editingTeacher.qualifications]
                                            newExperiences[index] = e.target.value
                                            setEditingTeacher({ ...editingTeacher, qualifications: newExperiences })
                                        }}
                                        className="flex-grow p-2 border rounded-l"
                                        placeholder={`Experience ${index + 1}`}
                                    />
                                    <button
                                        onClick={() => {
                                            const newExperiences = editingTeacher.qualifications.filter((_, i) => i !== index)
                                            setEditingTeacher({ ...editingTeacher, qualifications: newExperiences })
                                        }}
                                        className="bg-red-500 text-white px-2 py-2 rounded-r"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setEditingTeacher({
                                ...editingTeacher,
                                qualifications: [...editingTeacher.qualifications, '']
                            })}
                            className="bg-green-500 text-white px-4 py-2 rounded mb-4 w-full"
                        >
                            Add Experience
                        </button>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setEditingTeacher(null)}
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleTeacherSave(editingTeacher)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editingBenefit && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">{editingBenefit.id ? 'Edit' : 'Add'} Benefit</h2>
                        <input
                            type="text"
                            value={editingBenefit.title}
                            onChange={(e) => setEditingBenefit({ ...editingBenefit, title: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Title"
                        />
                        <input
                            type="text"
                            value={editingBenefit.animationData}
                            onChange={(e) => setEditingBenefit({ ...editingBenefit, animationData: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Animação"
                        />
                        <textarea
                            value={editingBenefit.description}
                            onChange={(e) => setEditingBenefit({ ...editingBenefit, description: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Description"
                            rows={4}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setEditingBenefit(null)}
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleBenefitSave(editingBenefit)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editingCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">{editingCourse.id ? 'Edit' : 'Add'} Course</h2>
                        <input
                            type="text"
                            value={editingCourse.title}
                            onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Title"
                        />
                        <input
                            type="text"
                            value={editingCourse.icon}
                            onChange={(e) => setEditingCourse({ ...editingCourse, icon: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Icon"
                        />
                        <div className="mb-2">
                            {editingCourse.features.map((feature, index) => (
                                <div key={index} className="flex mb-2">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => {
                                            const newFeatures = [...editingCourse.features]
                                            newFeatures[index] = e.target.value
                                            setEditingCourse({ ...editingCourse, features: newFeatures })
                                        }}
                                        className="flex-grow p-2 border rounded-l"
                                        placeholder={`Feature ${index + 1}`}
                                    />
                                    <button
                                        onClick={() => {
                                            const newFeatures = editingCourse.features.filter((_, i) => i !== index)
                                            setEditingCourse({ ...editingCourse, features: newFeatures })
                                        }}
                                        className="bg-red-500 text-white px-2 py-2 rounded-r"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setEditingCourse({
                                ...editingCourse,
                                features: [...editingCourse.features, '']
                            })}
                            className="bg-green-500 text-white px-4 py-2 rounded mb-4 w-full"
                        >
                            Add Feature
                        </button>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setEditingCourse(null)}
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleCourseSave(editingCourse)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editingTestimonial && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">{editingTestimonial.id ? 'Edit' : 'Add'} Testimonial</h2>
                        <input
                            type="text"
                            value={editingTestimonial.name}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            value={editingTestimonial.sub}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, sub: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Subtitle"
                        />
                        <input
                            type="text"
                            value={editingTestimonial.sub1}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, sub1: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Subtitle 2"
                        />
                        <input
                            type="text"
                            value={editingTestimonial.city}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, city: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="City"
                        />
                        <textarea
                            value={editingTestimonial.text}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, text: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Testimonial Text"
                            rows={4}
                        />
                        <input
                            type="text"
                            value={editingTestimonial.image}
                            onChange={(e) => setEditingTestimonial({ ...editingTestimonial, image: e.target.value })}
                            className="w-full p-2 border rounded mb-2"
                            placeholder="Image URL"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setEditingTestimonial(null)}
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleTestimonialSave(editingTestimonial)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Enter Password</h2>
                        <form onSubmit={handlePasswordSubmit}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded mb-4"
                                placeholder="Enter password"
                            />
                            {passwordError && <p className="text-red-500 mb-4">{passwordError}</p>}
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPasswordModal(false)
                                        setPassword('')
                                        setPasswordError('')
                                    }}
                                    className="bg-gray-300 text-black px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                                >
                                    <Lock size={20} className="mr-2" /> Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}