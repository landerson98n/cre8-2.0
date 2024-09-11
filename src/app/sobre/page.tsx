'use client'
import { useEffect, useState } from "react";

export default function Sobre() {
    const [sobre, setSobre] = useState('')
    useEffect(() => {
        fetch('/api/about')
            .then((res) => res.json())
            .then((data) => setSobre(data[0].text));
    }, []);

    return (
        <div className="min-h-screen bg-blue-600 text-white font-sans flex justify-center" style={{ fontFamily: "var(--Baloo-Regular)" }}>
            <div className="container px-16 md:text-3xl text-x py-44 text-justify">
                <div className="flex justify-center pb-36">
                    <img alt="logo" className='md:max-h-56 max-h-56 relative' src='https://ik.imagekit.io/6zjortsiwu/tr:w-300/logo_branca.webp' />
                </div>
                <h1>{sobre}</h1>
            </div>

        </div >
    )
}