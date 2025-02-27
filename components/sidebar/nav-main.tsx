"use client"

import { ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem
} from "@/components/ui/sidebar"
import Link from "../link"
import { IMenu } from "../main"

export function NavMain({
  data
}: {
  data : {
    menuUsuario?: IMenu[],
    menuAdmin?: IMenu[]
  }
}) {
  return (
    <SidebarContent>
      <SidebarGroup>
        {data.menuUsuario && <><SidebarGroupLabel>Geral</SidebarGroupLabel>
        <SidebarMenu>
          {data.menuUsuario.map((item: IMenu) => (
            item.subItens ?
              <Collapsible
                key={item.titulo}
                asChild
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.titulo}>
                      {item.icone && <item.icone />}
                      <span>{item.titulo}</span>
                      {item.subItens && <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.subItens && <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.subItens?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.titulo}>
                          <Link href={item.url || "#"}>
                            {item.icone && <item.icone />}
                            <span>{item.titulo}</span>
                          </Link>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>}
                </SidebarMenuItem>
              </Collapsible>
            : <SidebarMenuItem key={item.titulo} className="z-50">
                <Link href={item.url || "#"}>
                  {item.icone && <item.icone />}
                  <span>{item.titulo}</span>
                </Link>
              </SidebarMenuItem>
          ))}
        </SidebarMenu></>}
        {data.menuAdmin && <><SidebarGroupLabel>Administração</SidebarGroupLabel>
        <SidebarMenu>
          {data.menuAdmin.map((item) => (
            item.subItens ?
            <Collapsible
              key={item.titulo}
              asChild
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.titulo}>
                    {item.icone && <item.icone />}
                    <span>{item.titulo}</span>
                    {item.subItens && <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {item.subItens && <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.subItens?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.titulo}>
                        <Link href={item.url || "#"}>
                          {item.icone && <item.icone />}
                          <span>{item.titulo}</span>
                        </Link>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>}
              </SidebarMenuItem>
            </Collapsible>
          : <SidebarMenuItem key={item.titulo} className="z-50">
              <Link href={item.url || "#"}>
                {item.icone && <item.icone />}
                <span>{item.titulo}</span>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu></>}
      </SidebarGroup>
    </SidebarContent>    
  )
}
