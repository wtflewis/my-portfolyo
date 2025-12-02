import { useRouter } from 'next/router'
import { useState, useEffect} from 'react'
import Image from 'next/image'
export default function Navbar() {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const links = [
        { href: '#top', label: 'Ana Sayfa' },
        { href: '#hakkimda', label: 'Hakkımda' },
        { href: '#iletisim', label: 'İletişim' },
    ]

    const scrollToSection = (e, href) => {
        e.preventDefault()
        
        // Ana Sayfa için özel işlem
        if (href === '#top') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }
        
        const target = document.querySelector(href)
        if (target) {
            const offset = 80 // navbar height
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset
            window.scrollTo({ top, behavior: 'smooth' })
            
            // Add shine effect after scroll
            setTimeout(() => {
                target.classList.add('highlight-shine')
                setTimeout(() => {
                    target.classList.remove('highlight-shine')
                }, 1800)
            }, 600)
        }
    }
    const [scrolled, setScrolled] = useState(false)

    // değişiklik: sayfa kaydırıldığında navbar arka planı belirginleştir
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <nav
                className={
                    'fixed top-0 left-0 w-full z-50 transition-colors duration-300 ' +
                    (scrolled
                        ? 'bg-gradient-to-r from-[#e0d9cf] to-[#a6adc7] dark:from-[#0a0a0a] dark:to-[#1a1f2b] backdrop-blur-md shadow-sm'
                        : 'bg-transparent')
                }
            >
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="text-lg flex justify-center items-center font-semibold">
                        <Image src="/sticker.png" alt="Logo" width={40} height={40} />
                        <a className="font-bold gradient-text text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-gray-500 dark:from-slate-100">Ali Girişen</a>
                    </div>

                    {/* Desktop links */}
                    <ul className="hidden md:flex space-x-4 text-slate-700 font-bold dark:text-gray-200 items-center">
                        {links.map((l) => (
                            <li key={l.href}>
                                <a
                                    href={l.href}
                                    onClick={(e) => {
                                        scrollToSection(e, l.href)
                                        setOpen(false)
                                    }}
                                    className={
                                        'hover:text-slate-600 dark:hover:text-gray-400 px-3 py-1 rounded transition cursor-pointer'
                                    }
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                </div>
            </nav>

            {/* Navbar sabit olduğu için içerik örtülmemesi için boşluk */}
            <div className="h-14" />
        </>
    )
}
