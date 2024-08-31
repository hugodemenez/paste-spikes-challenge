import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SearchIcon } from "./Icons"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useSections } from "./context/section-content"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"


export default function Searchbar() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { sections, toggleBookmark } = useSections();
  const searchParams = useSearchParams()
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

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex gap-x-[10px] px-4 py-[10px] w-full items-center justify-normal rounded-[6px] bg-[#121212] border border-[#1D1D1D]"><SearchIcon className="fill-none stroke-[#7E7F81]"></SearchIcon><p className="text-[#7E7F81]">Search for specific compponents, sections, wireframes, and more...</p></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Command>
            <CommandInput placeholder="Search a specific section..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Sections">
                {sections.map((section, index) => (
                  <Link key={index} href={pathname + '?' + createQueryString('section', section.title)} onClick={()=>setOpen(false)}>
                    <CommandItem className="cursor-pointer" >{section.title}</CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex gap-x-[10px] px-4 py-[10px] w-full items-center justify-normal rounded-[6px] bg-[#121212] border border-[#1D1D1D]"><SearchIcon className="fill-none stroke-[#7E7F81]"></SearchIcon><p className="text-[#7E7F81]">Search...</p></Button>
      </DrawerTrigger>
      <DrawerContent>
        <Command>
          <CommandInput placeholder="Search a specific section..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Sections">
              {sections.map((section, index) => (
                <Link key={index} href={pathname + '?' + createQueryString('section', section.title)}>
                  <DrawerClose>
                  <CommandItem className="cursor-pointer" >{section.title}</CommandItem>
                  </DrawerClose>
                </Link>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DrawerContent>
    </Drawer>
  )
}