'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'


export default function TeamPage() {
   const [teamMembers, setTeamMembers] = useState([])

   useEffect(() => {
    fetch('/api/professores')
      .then((res) => res.json())
      .then((data) => setTeamMembers(data));
  }, []);

    return (
        <div className="min-h-screen bg-blue-600 text-white font-sans py-12 px-4">
            <motion.h1
                className="text-4xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Conheça a nossa equipe!
            </motion.h1>
            <div className="max-w-4xl mx-auto space-y-8">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={member.name}
                        className="bg-blue-500 rounded-3xl p-6 shadow-lg"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                            <motion.div
                                className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    width={160}
                                    height={160}
                                    className="object-cover w-full h-full"
                                />
                            </motion.div>
                            <div className="flex-grow">
                                <h2 className="text-2xl font-bold">{member.name}</h2>
                                <p className="text-xl mb-4">{member.role}</p>
                                <ul className="list-disc list-inside space-y-1">
                                    {member.qualifications.map((qual, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: i * 0.1 }}
                                        >
                                            {qual.text}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}