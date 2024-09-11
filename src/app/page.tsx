'use client'
import { Instagram, Phone, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Lottie from 'react-lottie-player'
import successAnimation from '@/animations/email.json'
import heroAnimation from '@/animations/mundo.json'


export default function LandingPage() {
  const [benefits, setBenefits] = useState([])
  const [animationsData, setAnimationsData] = useState({});
  const [depoiments, setDepoiments] = useState([])
  const [courses, setCourses] = useState([])
  const [hero, setHero] = useState({ title: "Conquiste o mundo com fluência em inglês!", subtitle: "Aprenda inglês com quem sabe e desbloqueie um mundo de oportunidades" })

  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    fetch('/api/benefits')
      .then((res) => res.json())
      .then((data) => setBenefits(data));
  }, []);

  useEffect(() => {
    fetch('/api/depoiments')
      .then((res) => res.json())
      .then((data) => setDepoiments(data));
  }, []);


  useEffect(() => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  useEffect(() => {
    benefits.forEach((benefit) => {
      fetch(benefit.animationData)
        .then((res) => res.json())
        .then((data) => {
          setAnimationsData((prevState) => ({
            ...prevState,
            [benefit.title]: data, // Armazena a animação JSON com a chave sendo o título do benefício
          }));
        })
        .catch((error) => console.error('Erro ao carregar a animação:', error));
    });
  }, [benefits]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccessAnimation(true)
    setTimeout(() => setShowSuccessAnimation(false), 3000)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }



  return (
    <div className="min-h-screen bg-blue-600 text-white font-sans" style={{ fontFamily: "var(--Baloo-Regular)" }}>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-0 bg-blue-600 z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <nav>
                <ul className="flex flex-col items-center space-y-6 text-white">
                  {['Início', 'Equipe', 'Sobre'].map((item) => (
                    <motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Link href="#" className="text-2xl hover:underline" onClick={toggleMenu}>{item}</Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="flex space-x-4 mt-8 text-white">
                {[Instagram, Phone].map((Icon, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                    <Link href="#" aria-label={Icon.name}>
                      <Icon className="w-8 h-8" color='white' />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section className="container mx-auto px-4 text-center py-36 relative overflow-hidden">
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ opacity, scale }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "var(--Baloo-Bold)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Conquiste o mundo com fluência em inglês!
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Aprenda inglês com quem sabe e desbloqueie um mundo de oportunidades
            </motion.p>
            <motion.button
              className="bg-red-500 text-white font-bold py-3 px-8 rounded-full text-xl hover:bg-red-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Quero falar Inglês!
            </motion.button>
          </motion.div>
          <div className="absolute inset-0 z-0">
            <Lottie
              loop
              animationData={heroAnimation}
              play
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </section>

        <section className="bg-white text-blue-600 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="mb-4 h-24">
                    {animationsData[benefit.title] ? (
                      <Lottie
                        loop
                        animationData={animationsData[benefit.title]}
                        play
                        style={{ width: 100, height: 100, margin: 'auto' }}
                      />
                    ) : (
                      <p>Carregando animação...</p>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--Baloo-Bold)" }}>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white text-blue-600 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: "var(--Baloo-Bold)" }}>Depoimentos</h2>
            {
              depoiments.map(item => (
                <motion.div
                  className="bg-blue-600 text-white p-8 rounded-lg max-w-2xl mx-auto mt-10"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="flex items-center mb-4">
                    <img src={item.image} alt="Lilian Carvalho" className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h3 className="font-bold" style={{ fontFamily: "var(--Baloo-Bold)" }}>{item.name}</h3>
                      <h2  >{item.sub} - {item.sub1}</h2>
                      <h2  ></h2>
                      <div className="text-yellow-400">★★★★★</div>
                    </div>
                  </div>
                  <p className="italic">{item.text}</p>
                </motion.div>
              ))
            }

          </div>
        </section>

        <section className="bg-blue-700 py-12">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--Baloo-Bold)" }}>Agende um teste de nivelamento</h2>
              <p className="mb-8">GRATUITO e descubra seu nível de inglês!</p>
              <button className="bg-red-500 text-white font-bold py-3 px-8 rounded-full text-xl hover:bg-red-700 transition duration-300">
                Agendar teste gratuito
              </button>
            </motion.div>
          </div>
        </section>
        <section className="bg-white text-blue-600 py-20">
          <div className="container mx-auto px-4 py-20 bg-white">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: "var(--Baloo-Bold)" }}>Nossos cursos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={course.title}
                  className="bg-blue-700 p-6 rounded-lg"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <img src={course.icon} alt={course.title} className="h-32" />
                  <h3 className="text-xl font-bold mb-4 text-white" style={{ fontFamily: "var(--Baloo-Bold)" }}>{course.title}</h3>
                  <ul className="list-disc list-inside">
                    {course.features.map((feature, i) => (
                      <li className="text-white" key={i}>{feature.text}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        <section className="bg-white text-blue-600 py-20 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: "var(--Baloo-Bold)" }}>Quer saber mais?</h2>
            <motion.form
              className="max-w-md mx-auto"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="mb-4">
                <input type="text" placeholder="Nome" className="w-full p-2 rounded border border-blue-300" />
              </div>
              <div className="mb-4">
                <input type="email" placeholder="E-mail" className="w-full p-2 rounded border border-blue-300" />
              </div>
              <div className="mb-4">
                <input type="tel" placeholder="Telefone" className="w-full p-2 rounded border border-blue-300" />
              </div>
              <button type="submit" className="w-full bg-red-500 text-white font-bold py-3 px-8 rounded-full text-xl hover:bg-red-600 transition duration-300">
                Enviar
              </button>
            </motion.form>
          </div>
          <AnimatePresence>
            {showSuccessAnimation && (
              <motion.div
                className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-white p-8 rounded-lg">
                  <Lottie
                    loop={false}
                    animationData={successAnimation}
                    play
                    style={{ width: 200, height: 200 }}
                  />
                  <p className="text-center text-xl font-bold text-green-600 mt-4">Enviado com sucesso!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  )
}