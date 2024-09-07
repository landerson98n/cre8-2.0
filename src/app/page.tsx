'use client'
import { Instagram, Phone, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import Lottie from 'react-lottie-player'
import { useMediaQuery } from 'react-responsive'

// Import your Lottie animation data here
import trophyAnimation from '@/animations/quality.json'
import lightbulbAnimation from '@/animations/idea.json'
import bookAnimation from '@/animations/cap.json'
import successAnimation from '@/animations/email.json'
import heroAnimation from '@/animations/mundo.json'
import worldAnimation from '@/animations/world.json'
import brasilAnimation from '@/animations/brasil.json'

const benefits = [
  { title: 'Qualidade', description: 'Ensino de qualidade com nossa equipe de professores certificados internacionalmente.', animationData: trophyAnimation },
  { title: 'Soluções', description: 'Aulas individuais ou em turmas, inglês para negócios, e o que mais você precisar!', animationData: lightbulbAnimation },
  { title: '+ 275 alunos', description: 'Mais de 275 alunos fazem parte da nossa história.', animationData: bookAnimation },
  { title: 'Mundo', description: 'Alunos em 8 países.', animationData: worldAnimation },
  { title: 'Brasil	', description: 'A Cre8 já está em 18 estados do Brasil!', animationData: brasilAnimation },
]

const courses = [
  { title: 'Turmas Regulares', icon: 'https://ik.imagekit.io/6zjortsiwu/tr:w-300/regular.png', features: ['Até 5 alunos por turma', '2 aulas por semana', 'Turmas dos níveis Iniciante ao Avançado', 'Material de Cambridge, moderno e atualizado'] },
  { title: 'Aulas VIP', icon: 'https://ik.imagekit.io/6zjortsiwu/tr:w-300/vip.png', features: ['Prefere aulas exclusivas', 'Possui uma necessidades particular com inglês', 'Precisa de um estudo intensivo da língua'] },
  { title: 'Preparatório IELTS/TOEFL', icon: 'https://ik.imagekit.io/6zjortsiwu/tr:w-300/preparatorio.png', features: ['Imigrar para outro país', 'Bolsas de estudo', 'Vagas de trabalho no exterior', 'IELTS, Toefl, Cambridge, Toeic'] },
]


export default function LandingPage() {
  const isMobile = useMediaQuery({ query: '(max-width: 425px)' })
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccessAnimation(true)
    setTimeout(() => setShowSuccessAnimation(false), 3000)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const depoiments = [
    {
      name: "Lílian Carvalho ",
      sub: 'Talent Management Specialist',
      sub1: "AB InBev",
      city: "Campinas - SP",
      text: 'Sempre me comuniquei bem em Inglês, mas senti a necessidade de focar em Inglês corporativo com uma linguagem mais formal. Encontro na Cre8 o fit perfeito para isso, já que a instituição se preocupa em entregar aulas coerentes com suas necessidades!',
      image: isMobile ? 'https://ik.imagekit.io/6zjortsiwu/tr:w-200/lilian.webp' : 'https://ik.imagekit.io/6zjortsiwu/lilian.webp',
    },
    {
      name: "Gabriela Xavier",
      sub: 'Innovation Coordinator ',
      sub1: "Hospital Albert Einstein",
      city: "São Paulo - SP",
      text: 'A Cre8 foi uma indicação maravilhosa de uma grande amiga e desde então recomendo sempre a escola e o Teacher Saulo para amigos. As aulas são bem organizadas, visuais e com um conteúdo super atual, tornando o aprendizado da língua aliado a temas relevantes e profundos! ',
      image: isMobile ? 'https://ik.imagekit.io/6zjortsiwu/tr:w-200/gabriela.webp' : 'https://ik.imagekit.io/6zjortsiwu/gabriela.webp',
    },
    {
      name: "Ana Jéssica",
      sub: 'Gestora de Compras',
      sub1: "Grupo Vanguarda",
      city: "Teresina - PI",
      text: 'Já tive experiências em outras escolas, e apesar do contato com inglês, nunca senti segurança ao falar. Estou há quase um ano e meio na Cre8 por me sentir à vontade para conversar, errar e aprender com aulas que trazem tópicos e situações em que podemos praticar o inglês na vida real!',
      image: isMobile ? 'https://ik.imagekit.io/6zjortsiwu/tr:w-200/ana.webp' : 'https://ik.imagekit.io/6zjortsiwu/ana.webp',
    },
    {
      name: "Laise Paula",
      sub: 'Assessora de Comunicação',
      sub1: " ",
      city: "Caxias - MA",
      text: 'Estudo na Cre8 desde o comecinho. Posso falar com certeza que foi essencial para meu grande desenvolvimento! Hoje me sinto muito mais segura ao falar e escrever em inglês. Além disso, os professores são excelentes profissionais e as aulas dinâmicas e interessantes. Amo estudar na Cre8 e indico sempre!',
      image: isMobile ? 'https://ik.imagekit.io/6zjortsiwu/tr:w-200/laise.webp' : 'https://ik.imagekit.io/6zjortsiwu/laise.webp',
    },
    {
      name: "Daniela Corrêa ",
      sub: 'Procurement Strategy',
      sub1: "Yara Internationa",
      city: "Oslo - Noruega",
      text: 'Apesar de ter estudado inglês desde criança, me sentia muito insegura com relação a conversação e gramática. As aulas individuais me fizeram ter confiança para assumir um dos maiores desafios da minha carreira: me mudar para a Noruega! Amei o método da Cre8, com aulas dinâmicas e muita conversação!',
      image: isMobile ? 'https://ik.imagekit.io/6zjortsiwu/tr:w-200/daniela.webp' : 'https://ik.imagekit.io/6zjortsiwu/daniela.webp',
    },
    {
      name: "Kleber Ferbones",
      sub: 'Especialista em Projeto e Desenvolvimento',
      sub1: "Ambev",
      city: "São José dos Campos - SP",
      text: 'Tenho feito aulas desde o início de 2022, e tem sido uma ótima opção para mim que busco um aprendizado personalizado, focando nos pontos que preciso melhorar. Outra vantagem é a flexibilidade de horários, que me ajudam demais! Obrigado pela paciência e ensinamentos rs',
      image: isMobile ? 'https://ik.imagekit.io/6zjortsiwu/tr:w-300/Kleber.webp' : 'https://ik.imagekit.io/6zjortsiwu/Kleber.webp',
    }
  ]

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
                <ul className="flex flex-col items-center space-y-6">
                  {['Início', 'Equipe', 'Sobre'].map((item) => (
                    <motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Link href="#" className="text-2xl hover:underline" onClick={toggleMenu}>{item}</Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="flex space-x-4 mt-8">
                {[Instagram, Phone].map((Icon, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                    <Link href="#" aria-label={Icon.name}>
                      <Icon className="w-8 h-8" />
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
              Conquiste o mundo com<br />fluência em inglês!
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
                    <Lottie
                      loop
                      animationData={benefit.animationData}
                      play
                      style={{ width: 100, height: 100, margin: 'auto' }}
                    />
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
                  <img src={course.icon} className="h-32"/>
                  <h3 className="text-xl font-bold mb-4 text-white" style={{ fontFamily: "var(--Baloo-Bold)" }}>{course.title}</h3>
                  <ul className="list-disc list-inside">
                    {course.features.map((feature, i) => (
                      <li className="text-white" key={i}>{feature}</li>
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