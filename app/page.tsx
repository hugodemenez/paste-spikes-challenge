'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { BookmarkIcon, EyeIcon } from "@/components/Icons";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useSections } from "@/components/context/section-content";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Home() {

  const searchParams = useSearchParams();
  const sectionParam = searchParams.get('section')??'Hero';
  const { sections, toggleBookmark } = useSections();

  const pathname = usePathname()

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
  return (
    <main className="h-full w-full flex flex-col  bg-[#121212] p-8 gap-y-[40px] overflow-auto">
      <div className="flex flex-col sm:flex-row h-fit w-full gap-8">
        <div className="flex flex-col justify-between sm:h-full w-full">
          {
            sections.filter((section) => section.title === sectionParam).map(({ title, pro, date, bookmarked, description }, index) => (
              <div key={'section-'+index} className="flex flex-col gap-y-8">
                <h1 className="text-2xl font-medium flex items-center gap-x-4">{title} Section {pro && <span className="bg-gradient-to-b bg-clip-text text-transparent from-[#FF7A00] to-[#FF2900] text-lg">Pro</span>}</h1>
                <p className="text-[#7E7F81]">{description}</p>
              </div>
            ))
          }
          <div className="flex flex-col gap-y-4">
            <div className="flex w-full gap-x-4">
              <Button variant={'outline'} className="flex w-full items-center justify-center gap-x-2 bg-[#1B1B1B] border border-[#292929] rounded-[6px]"><Image src={"/webflow-button.png"} alt={""} width={20} height={20}></Image>Copy to webflow</Button>
              <Button variant={'outline'} className="flex w-full items-center justify-center gap-x-2 bg-[#1B1B1B] border border-[#292929] rounded-[6px]"><Image src={"/figma-button.png"} alt={""} height={20} width={13}></Image>Copy to figma</Button>
            </div>
            <Button variant={'outline'} className="flex w-full items-center justify-center gap-x-2 bg-[#1B1B1B] border border-[#292929] rounded-[6px]"> <EyeIcon className="fill-none"></EyeIcon>Live preview</Button>
          </div>
        </div>
        <Card className="w-full h-[388px] flex flex-col items-center justify-center gap-x-2 bg-[#1B1B1B] border border-[#292929] rounded-[12px]">

        </Card>
      </div>
      <Separator ></Separator>
      <div className="flex flex-col gap-y-[40px]">
        <div className="flex w-full justify-between">
          <h2 className="text-2xl font-medium">Other sections you might like</h2>
          <Button variant={'outline'} className="hidden sm:flex items-center justify-center gap-x-2 bg-[#1B1B1B] border border-[#292929] rounded-[6px] text-[#7E7F81]">Browse All</Button>
        </div>
        <div className="grid sm:grid-cols-3 w-full gap-x-6 gap-y-[40px]">
          {sections.map(({ title, pro, date, bookmarked }, index) => (
            title !== sectionParam &&
              <div className="w-full flex flex-col gap-y-4" key={index}>
              <Link href={pathname + '?' + createQueryString('section', title)}>
              <Card className="h-[217px] flex items-center justify-between gap-x-4 bg-[#1B1B1B] border border-[#292929] rounded-[12px] hover:bg-[#343434]">
              </Card>
              </Link>
              <div className="flex flex-col gap-y-2">
                <div className="flex justify-between">
                  <div className="flex gap-x-2">
                    <h3>{title}</h3>{pro && <span className="bg-gradient-to-b bg-clip-text text-transparent from-[#FF7A00] to-[#FF2900]">Pro</span>}
                  </div>
                  <svg
                    onClick={() => toggleBookmark(index)}
                    width="11"
                    height="14"
                    viewBox="0 0 11 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={cn(bookmarked ? 'fill-[url(#paint0_linear_2013_3)]' : 'stroke-white hover:fill-[url(#paint0_linear_2013_3)] hover:stroke-none', 'cursor-pointer')}
                  >
                    <path d="M0.333344 3.2C0.333344 2.0799 0.333344 1.51984 0.55133 1.09202C0.743077 0.715695 1.04904 0.409734 1.42536 0.217987C1.85319 0 2.41324 0 3.53334 0H7.13334C8.25345 0 8.8135 0 9.24132 0.217987C9.61765 0.409734 9.92361 0.715695 10.1154 1.09202C10.3333 1.51984 10.3333 2.0799 10.3333 3.2V14L5.33334 12L0.333344 14V3.2Z" />

                    <defs>
                      <linearGradient id="paint0_linear_2013_3" x1="5.33334" y1="0" x2="5.33334" y2="14" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF7A00" />
                        <stop offset="1" stopColor="#FF2900" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h4 className="text-[#7E7F81] font-normal">- Added {date}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}
