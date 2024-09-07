'use client'
import { motion } from 'framer-motion'

const teamMembers = [
    {
        name: 'Teacher Saulo',
        role: 'Diretor Acadêmico',
        image: 'https://ik.imagekit.io/6zjortsiwu/tr:w-300/saulo.webp',
        qualifications: [
            '9 anos de experiência',
            'Mestrado em Língua, Literatura e Cultura Inglesa',
            'Especialista em Linguística e Tecnologia',
            'Graduação em Letras e Pedagogia',
            'MBA em Management (Cursando)',
            'C2 Proficiency (University of Cambridge)',
            'CELTA - Certificate in Teaching English to Speakers of Other Languages (University of Cambridge)',
            'TESOL Specialization (Arizona State University)',
            'Master Certificate in TEFL (Bridge Education Group)',
            'Certificate in Teaching Business English (The London Teacher Training College)',
            'Teaching IELTS Exam Prep (Bridge Education Group)',
            'Curiosidade: Já viveu um ano na Irlanda, e hoje estuda em Portugal. É viciado em música, voluntariado, e natureza.'
        ]
    },
    {
        name: 'Teacher Fabiana',
        role: 'Experiência com ambiente corporativo internacional',
        image: 'https://ik.imagekit.io/6zjortsiwu/tr:w-300/fabiana.webp',
        qualifications: [
            '6 anos de experiência como professora',
            'C1 Certificate (The Gallery London)',
            'Psicóloga/Carteirista',
            'Curiosidade: Já viveu na Austrália e na Espanha, trabalhando na maior organização jovem do mundo. Ama basquete, música e o cérebro humano.'
        ]
    },
    {
        name: 'Teacher Werllison',
        role: 'Experiência como Supervisor de Exames de Cambridge',
        image: 'https://ik.imagekit.io/6zjortsiwu/tr:w-300/werllison.webp',
        qualifications: [
            '10 anos de experiência',
            'Cambridge Knowledge Test 1, 2, 3(University of Cambridge)',
            'Letras - Inglês',
            'Experiência como Supervisor de Exames de Cambridge',
            'Curiosidade: É apaixonado por viagens, aviação, estudar outros idiomas e é um ótimo jogador de vôlei.'
        ]
    },
    {
        name: 'Teacher Lucas',
        role: 'Experiência com Inglês Acadêmico',
        image: 'https://ik.imagekit.io/6zjortsiwu/tr:w-300/lucas.jpeg',
        qualifications: [
            '5 anos de experiência como professor',
            'Graduado em Inglês',
            'Experiência com pesquisa acadêmica, publicação de artigos, e tem um livro publicado',
            'Curiosidade: Ama jogos, cultura geek, literatura clássica, teatro grego e estuda latim clássico.'
        ]
    },
    {
        name: 'Teacher Weslley',
        role: 'Experiência com Educação Internacional',
        image: 'https://ik.imagekit.io/6zjortsiwu/tr:w-300/wesley.jpeg',
        qualifications: [
            '10 anos de experiência',
            'Graduado em Inglês',
            'Certificado internacionalmente em Sign Language e Drama',
            'Experiência como Supervisor de Exames de Cambridge',
            'Curiosidade: Ama cozinhar, viajar e canta, e já morou nos Estados Unidos e na Holanda.'

        ]
    },
    {
        name: 'Teacher Carolina',
        role: 'Experiência em Educação Internacional e Corporativa',
        image: 'https://ik.imagekit.io/6zjortsiwu/tr:w-300/carolina.jpeg',
        qualifications: [
            '5 anos de experiência como professora de Inglês',
            'Experiência em educação internacional',
            'Doutoranda em Engenharia da Computação no ITA',
            'Curiosidade: Já viveu três anos na Ásia ensinando Inglês, fazendo doutorado e é mestre nos chopsticks'
        ]
    },
    {
        name: 'Teacher Caroline',
        role: 'Experiência com Inglês Acadêmico',
        image: 'https://ik.imagekit.io/6zjortsiwu/tr:w-300/caroline.jpeg',
        qualifications: [
            '5 anos de experiência como professora de Inglês',
            'Experiência em educação internacional',
            'Doutoranda em Engenharia da Computação no ITA',
            'Curiosidade: Já viveu três anos na Ásia ensinando Inglês, fazendo doutorado e é mestre nos chopsticks'
        ]
    },
    {
        name: 'Teacher Matheus',
        role: 'Experiência com Inglês Corporativo',
        image: 'https://ik.imagekit.io/6zjortsiwu/tr:w-300/matheus.jpeg',
        qualifications: [
            '4 anos de experiência como professor',
            'Tradutor e Engenheiro civil',
            'Experiência com Business English',
            'Curiosidade:Já viveu 3 anos na Espanha, toca guitarra, surfa e tem um canal de jogos no Youtube.',
        ]
    },
    {
        name: 'Teacher Letícia Rocha',
        role: 'Designer do time',
        image: 'https://ik.imagekit.io/6zjortsiwu/tr:w-300/leticia.jpeg',
        qualifications: [
            '5 anos de experiência como designer freelancer com foco em redes sociais',
            'Graduada em Comunicação Social (Universidade Federal do Piauí)',
            'Design Gráfico(Opa! Escola de Design)',
            'Adobe Illustrator (EBAC)',
            'Curiosidade:Além de designer, também trabalha como ilustradora freelancer e é apaixonada por arte.'
        ]
    },
]

export default function TeamPage() {
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
                                            {qual}
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