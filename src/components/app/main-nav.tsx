"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileClock,
  LayoutDashboard,
  Users,
  LogOut,
  ChevronRight,
  NotebookIcon,
} from "lucide-react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/attendance",
    icon: FileClock,
    label: "Attendance",
  },
  {
    href: "/employee",
    icon: Users,
    label: "Employee",
  },
  {
    href: "/projects",
    icon: NotebookIcon,
    label: "Projects",
  },
];

export function MainNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <>
      <SidebarHeader className="border-b">
        <div className="flex w-full items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Users className="size-8 text-primary" />
            <h1 className="text-lg font-bold font-headline">AttendaSync</h1>
          </div>
          <SidebarTrigger className="hidden md:flex" />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                  className="justify-start"
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t p-2">
        <div className="flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-sidebar-accent">
          <Avatar className="size-8">
            <AvatarImage
              src="https://picsum.photos/seed/admin/100/100"
              data-ai-hint="person portrait"
            />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-semibold">Admin User</p>
            <p className="truncate text-xs text-muted-foreground">
              admin@example.com
            </p>
          </div>
          {state === "expanded" && (
            <Button variant="ghost" size="icon" className="size-8">
              <LogOut className="size-4" />
            </Button>
          )}
        </div>
      </SidebarFooter>
    </>
  );
}
