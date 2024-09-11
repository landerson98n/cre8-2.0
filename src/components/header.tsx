'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { Instagram, Linkedin, Phone, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className='bg-blue-600 sticky top-0 z-20'>
            <header className="container mx-auto px-4 md:py-6 py-3  flex justify-between items-center z-50">
                <div className="flex items-center space-x-2">
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} >
                        <Link href="/">
                            <img alt='logo' className='md:max-h-16 max-h-12 relative' src='https://ik.imagekit.io/6zjortsiwu/tr:w-390/logo_branca.webp' />
                        </Link>
                    </motion.div>
                </div>
                <nav className="hidden md:block">
                    <ul className="flex space-x-6">
                        {[{ name: 'Início', link: "/" }, { name: 'Equipe', link: "/equipe" }, { name: 'Sobre', link: "/sobre" }].map((item) => (
                            <motion.li key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={toggleMenu}>
                                <Link href={item.link} className="hover:underline">{item.name}</Link>
                            </motion.li>
                        ))}
                    </ul>
                </nav>
                <div className="hidden md:flex space-x-4">
                    {[Instagram, Phone, Linkedin].map((Icon, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onClick={toggleMenu}>
                            <Link href="#" aria-label={Icon.name}>
                                <Icon className="w-6 h-6" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
                <button className="md:hidden z-20" onClick={toggleMenu}>
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </header>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween" }}
                        className="fixed inset-0 bg-blue-600 z-5 md:hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full">
                            <nav>
                                <ul className="flex flex-col items-center space-y-6">
                                    {[{ name: 'Início', link: "/" }, { name: 'Equipe', link: "/equipe" }, { name: 'Sobre', link: "/sobre" }].map((item) => (
                                        <motion.li key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={toggleMenu}>
                                            <Link href={item.link} className="hover:underline">{item.name}</Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>
                            <div className="flex space-x-4 mt-8">
                                {[Instagram, Phone, Linkedin].map((Icon, index) => (
                                    <motion.div key={index} whileHover={{ scale: 1.2 }} onClick={toggleMenu} whileTap={{ scale: 0.8 }}>
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
        </div>

    )
}