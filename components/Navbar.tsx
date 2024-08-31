'use client'
import Link from "next/link";
import Image from 'next/image'
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Searchbar from "./Searchbar";
import Userprofile from "./Userprofile";
import { Separator } from "@/components/ui/separator"


export default function Navbar(){
    const pathname = usePathname()
    
    const links = [
        {href: '/', label: 'Library'},
        {href: '/extensions', label: 'Extensions'},
        {href: '/community', label: 'Community'},
        {href: '/membership', label: 'Membership'},
    ]
    return(
        <nav className="p-8 flex gap-x-8 items-center">
            <Link href='/' className="flex-shrink-0 block sm:hidden">
            <Image src={"/paste-logo.png"} alt={""} height={32} width={32}></Image>
            </Link>
            <Link href='/' className="flex-shrink-0 hidden sm:block">
            <Image src={"/logo.png"} alt={""} height={32} width={97}></Image>
            </Link>
            <Separator orientation="vertical" />
            <ul className="hidden lg:flex items-center gap-8">
                {links.map(({href, label}) => (
                    <li key={href} className={cn("",pathname === href?'text-white':'text-muted-foreground hover:text-gray-300')}><Link href={href}>{label}</Link></li>
                ))}
            </ul>
            <Separator orientation="vertical" />
            <Searchbar></Searchbar>
            <Separator orientation="vertical" />
            <Userprofile></Userprofile>
        </nav>
    )
}