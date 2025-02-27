"use client"

import { ChevronRight, ChevronsUp, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "./link"
import { IMenu } from "./main"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { ScrollArea } from "./ui/scroll-area"

export function DrawerMenu({ data }: { data: { menuUsuario: IMenu[], menuAdmin: IMenu[] } }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="flex sm:hidden absolute bottom-0 w-full"><ChevronsUp className="scale-150" /></Button>
      </DrawerTrigger>
      <DrawerContent className="h-5/6 bg-sidebar">
        <DrawerHeader>
            <DrawerTitle className="flex w-full justify-end items-center">
                <DrawerClose asChild>
                    <Button size="icon" variant="ghost"><X /></Button>
                </DrawerClose>
            </DrawerTitle>
            <DrawerDescription className="hidden">Menu Inferior</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-full pb-32">
            <div className="mx-auto w-full px-4">
                <div className="p-4 pb-0">
                    <ul className="flex w-full min-w-0 flex-col gap-1">
                    {data.menuUsuario.map((item) => (
                            item.subItens && item.subItens.length > 0 ? <Collapsible asChild className="group/collapsible" key={item.titulo}>
                                <li className="group/menu-item relative w-full">
                                    <CollapsibleTrigger className="w-full" asChild>
                                        <Button variant="ghost" className="w-full border-0">
                                            <item.icone />
                                            <span>{item.titulo}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </Button>
                                    </CollapsibleTrigger>
                                    {item.subItens && item.subItens.length > 0 && <CollapsibleContent>
                                        <ul className="border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 pr-6 py-0.5 group-data-[collapsible=icon]:hidden w-full">
                                            {item.subItens.map((subitem) => (
                                                <li className="group/menu-sub-item w-full" key={subitem.titulo}>
                                                    <Link href={subitem.url}>
                                                        <span className="mr-auto">{subitem.titulo}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </CollapsibleContent>}
                                </li>
                            </Collapsible> : 
                            <li className="group/menu-item relative w-full" key={item.titulo}>
                                <Link href={item.url || "/"} className="w-full">
                                    <item.icone />
                                    <span className="mr-auto">{item.titulo}</span>
                                </Link>
                            </li>
                        ))}
                        {data.menuAdmin.map((item) => (
                            item.subItens && item.subItens.length > 0 ? <Collapsible asChild className="group/collapsible" key={item.titulo}>
                                <li className="group/menu-item relative w-full">
                                    <CollapsibleTrigger className="w-full" asChild>
                                        <Button variant="ghost" className="w-full border-0">
                                            <item.icone />
                                            <span>{item.titulo}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </Button>
                                    </CollapsibleTrigger>
                                    {item.subItens && item.subItens.length > 0 && <CollapsibleContent>
                                        <ul className="border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 pr-6 py-0.5 group-data-[collapsible=icon]:hidden w-full">
                                            {item.subItens.map((subitem) => (
                                                <li className="group/menu-sub-item w-full" key={subitem.titulo}>
                                                    <Link href={subitem.url}>
                                                        <span className="mr-auto">{subitem.titulo}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </CollapsibleContent>}
                                </li>
                            </Collapsible> : 
                            <li className="group/menu-item relative w-full" key={item.titulo}>
                                <Link href={item.url || "/"} className="w-full">
                                    <item.icone />
                                    <span className="mr-auto">{item.titulo}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </ScrollArea>        
      </DrawerContent>
    </Drawer>
  )
}
