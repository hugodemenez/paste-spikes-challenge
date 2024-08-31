'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import Image from "next/image"
import { BoltIcon, BookmarkIcon, GridIcon, StarIcon, StarsIcon } from "./Icons"
import { Separator } from "./ui/separator"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCallback, useState } from "react"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { useSections } from "./context/section-content"



const styles = [
    'Default',
    'Minimal',
]

const plans = [
    'Free',
    'Pro',
]

const defaultAccordionValue = ['platforms', 'sections']
export default function VerticalNavbar() {
    const searchParams = useSearchParams()
    const currentPlatform = searchParams.get('platform') ?? 'Figma'
    const currentSection = searchParams.get('section') ?? 'Hero'
    const currentStyle = searchParams.get('style') ?? 'Default'
    const currentPlan = searchParams.get('plan') ?? 'Free'

    const pathname = usePathname()

    const [showMoreSections, setShowMoreSections] = useState(false)
    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )
    const [itemsAccordeon, setItemsAccordeon] = useState<string[]>(defaultAccordionValue)
    const [openAccordeon, setOpenAccordeon] = useState(false)

    const { sections, toggleBookmark } = useSections();

    return (
            <div className="w-fit h-full p-8 overflow-y-scroll hidden sm:block">
                <Accordion type="multiple" className={cn("flex-col gap-y-6 flex")} defaultValue={defaultAccordionValue} onValueChange={setItemsAccordeon}>
                    <AccordionItem value="platform" className="border-0">
                        <AccordionTrigger className=" w-[216px] pt-0">
                            <div className={cn("flex gap-x-2 items-center", !itemsAccordeon.includes('platform') && 'text-muted-foreground ')}>
                                <BoltIcon className={!itemsAccordeon.includes('platform') ? "fill-[#7E7F81]" : 'fill-white'} />PLATFORM
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="border-l px-6 pb-0 flex flex-col gap-y-6">
                            <Link href={pathname + "?platform=webflow"} className={cn("flex gap-x-[10px]", currentPlatform != 'webflow' && 'text-muted-foreground')}><Image src={"/webflow.png"} alt={""} height={20} width={20}></Image>Webflow</Link>
                            <Link href={pathname + "?platform=figma"} className={cn("flex gap-x-[10px]", currentPlatform == 'webflow' && 'text-muted-foreground')}><Image src='/figma.png' alt={""} width={20} height={20}></Image> Figma</Link>
                        </AccordionContent>
                    </AccordionItem>
                    <svg width="216" height="1" viewBox="0 0 216 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.25" y="0.25" width="215.5" height="1" stroke="#1D1D1D" strokeWidth="0.5" strokeDasharray="8 8" />
                    </svg>
                    <AccordionItem value="sections" className="border-0">
                        <AccordionTrigger className=" w-[216px] pt-0">
                            <div className={cn("flex gap-x-2 items-center", !itemsAccordeon.includes('sections') && 'text-muted-foreground ')}>
                                <GridIcon className={!itemsAccordeon.includes('sections') ? "stroke-[#7E7F81]" : 'stroke-white'} />SECTIONS
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="border-l px-6 pb-0 flex flex-col gap-y-6">
                            {sections.slice(0, !showMoreSections ? 7 : sections.length).map(
                                (section, index) => (
                                    <Link key={'section' + index} href={pathname + '?' + createQueryString('section', section.title)} className={cn("flex items-center gap-x-[10px]", currentSection != section.title && 'text-muted-foreground')}>{currentSection == section.title && <div className="w-[6px] h-[6px] bg-gradient-to-b from-[#FF7A00] to-[#FF2900] rounded-full "></div>}{section.title}</Link>
                                )
                            )}
                        </AccordionContent>
                    </AccordionItem>
                    {itemsAccordeon.includes('sections')
                        &&
                        <Button variant={'link'} className="text-muted-foreground justify-normal px-0" onClick={() => setShowMoreSections(!showMoreSections)}>{!showMoreSections ? 'Show more +' : 'Show less -'}</Button>
                    }
                    <svg width="216" height="1" viewBox="0 0 216 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.25" y="0.25" width="215.5" height="1" stroke="#1D1D1D" strokeWidth="0.5" strokeDasharray="8 8" />
                    </svg>

                    <AccordionItem value="style" className="border-0">
                        <AccordionTrigger className=" w-[216px] pt-0">
                            <div className={cn("flex gap-x-2 items-center", !itemsAccordeon.includes('style') && 'text-muted-foreground ')}>
                                <StarsIcon className={!itemsAccordeon.includes('style') ? "stroke-[#7E7F81]" : 'stroke-white'}></StarsIcon>STYLE
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="border-l px-6 pb-0 flex flex-col gap-y-6">
                            {styles.map(
                                (style, index) => (
                                    <Link key={'style' + index} href={pathname + '?' + createQueryString('style', style)} className={cn("flex items-center gap-x-[10px]", currentStyle != style && 'text-muted-foreground')}>{currentStyle == style && <div className="w-[6px] h-[6px] bg-gradient-to-b from-[#FF7A00] to-[#FF2900] rounded-full "></div>}{style}</Link>
                                )
                            )}
                        </AccordionContent>
                    </AccordionItem>
                    <svg width="216" height="1" viewBox="0 0 216 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.25" y="0.25" width="215.5" height="1" stroke="#1D1D1D" strokeWidth="0.5" strokeDasharray="8 8" />
                    </svg>
                    <AccordionItem value="saved" className="border-0">
                        <AccordionTrigger className=" w-[216px] pt-0">
                            <div className={cn("flex gap-x-2 items-center", !itemsAccordeon.includes('saved') && 'text-muted-foreground ')}>
                                <BookmarkIcon className={!itemsAccordeon.includes('saved') ? "fill-[#7E7F81]" : 'fill-white'}></BookmarkIcon>SAVED
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="border-l px-6 pb-0 flex flex-col gap-y-6">
                            {sections.filter((section)=>section.bookmarked).map(
                                (section, index) => (
                                    <Link key={'saved' + index} href={pathname + '?' + createQueryString('section', section.title)} className={cn("flex items-center gap-x-[10px]", currentSection != section.title && 'text-muted-foreground')}>{currentSection == section.title && <div className="w-[6px] h-[6px] bg-gradient-to-b from-[#FF7A00] to-[#FF2900] rounded-full "></div>}{section.title}</Link>
                                )
                            )}
                        </AccordionContent>
                    </AccordionItem>
                    <svg width="216" height="1" viewBox="0 0 216 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.25" y="0.25" width="215.5" height="1" stroke="#1D1D1D" strokeWidth="0.5" strokeDasharray="8 8" />
                    </svg>
                    <AccordionItem value="plan" className="border-0">
                        <AccordionTrigger className=" w-[216px] pt-0">
                            <div className={cn("flex gap-x-2 items-center", !itemsAccordeon.includes('plan') && 'text-muted-foreground ')}>
                                <StarIcon className={!itemsAccordeon.includes('plan') ? "stroke-[#7E7F81]" : 'stroke-white'}></StarIcon>PLAN
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="border-l px-6 pb-0 flex flex-col gap-y-6">
                            {plans.map(
                                (plan, index) => (
                                    <Link key={'plan' + index} href={pathname + '?' + createQueryString('plan', plan)} className={cn("flex items-center gap-x-[10px]", currentPlan != plan && 'text-muted-foreground')}>{currentPlan == plan && <div className="w-[6px] h-[6px] bg-gradient-to-b from-[#FF7A00] to-[#FF2900] rounded-full "></div>}{plan}</Link>
                                )
                            )}
                        </AccordionContent>
                    </AccordionItem>
                    <div className="flex items-center justify-center relative w-fill h-fit overflow-hidden">
                        <Button variant='ghost' className="bg-[#1B1B1B] rounded-[6px] flex-1 border border-[#292929]">Upgrade to <span className="bg-gradient-to-b from-[#FF7A00] to-[#FF2900] bg-clip-text text-transparent ml-1 ">Pro</span></Button>
                        <div className="absolute right-[-8px]">
                            <svg width="35" height="15" viewBox="0 0 35 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="0.25" cy="0.5" r="0.25" fill="#FF7A00" />
                                <circle cx="9.875" cy="0.5" r="0.375" fill="#7E7F81" />
                                <circle cx="19.625" cy="0.5" r="0.375" fill="#7E7F81" />
                                <circle cx="29.5" cy="0.5" r="0.5" fill="#FF7A00" />
                                <circle cx="0.25" cy="14.5" r="0.25" fill="#7E7F81" />
                                <circle cx="9.875" cy="14.5" r="0.375" fill="#FF7A00" />
                                <circle cx="19.625" cy="14.5" r="0.375" fill="#7E7F81" />
                                <circle cx="29.5" cy="14.5" r="0.5" fill="#7E7F81" />
                                <circle cx="12.375" cy="7.5" r="0.375" fill="#FF7A00" />
                                <circle cx="22.25" cy="7.5" r="0.5" fill="#FF7A00" />
                                <circle cx="32.25" cy="7.5" r="0.5" fill="#7E7F81" />
                            </svg>

                        </div>
                        <div className="absolute left-[-8px]">
                            <svg width="35" height="15" viewBox="0 0 35 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="34.5" cy="14.5" r="0.25" transform="rotate(-180 34.5 14.5)" fill="#FF7A00" />
                                <circle cx="24.875" cy="14.5" r="0.375" transform="rotate(-180 24.875 14.5)" fill="#7E7F81" />
                                <circle cx="15.125" cy="14.5" r="0.375" transform="rotate(-180 15.125 14.5)" fill="#7E7F81" />
                                <circle cx="5.25" cy="14.5" r="0.5" transform="rotate(-180 5.25 14.5)" fill="#FF7A00" />
                                <circle cx="34.5" cy="0.5" r="0.25" transform="rotate(-180 34.5 0.5)" fill="#7E7F81" />
                                <circle cx="24.875" cy="0.5" r="0.375" transform="rotate(-180 24.875 0.5)" fill="#FF7A00" />
                                <circle cx="15.125" cy="0.5" r="0.375" transform="rotate(-180 15.125 0.5)" fill="#7E7F81" />
                                <circle cx="5.25" cy="0.5" r="0.5" transform="rotate(-180 5.25 0.5)" fill="#7E7F81" />
                                <circle cx="22.375" cy="7.5" r="0.375" transform="rotate(-180 22.375 7.5)" fill="#FF7A00" />
                                <circle cx="12.5" cy="7.5" r="0.5" transform="rotate(-180 12.5 7.5)" fill="#FF7A00" />
                                <circle cx="2.5" cy="7.5" r="0.5" transform="rotate(-180 2.5 7.5)" fill="#7E7F81" />
                            </svg>
                        </div>
                    </div>
                </Accordion>
            </div>

    )
}