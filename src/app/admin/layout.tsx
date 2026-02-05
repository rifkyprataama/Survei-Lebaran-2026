"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, Settings, LogOut, User, Menu, Users, Map 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Cookies from "js-cookie"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet" 

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  // State khusus untuk Mobile Menu (Sheet)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = () => {
    Cookies.remove("admin_session")
    router.push("/login")
  }

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Data Responden", href: "/admin/respondents", icon: Users },
    { name: "Master Wilayah", href: "/admin/master-data", icon: Map },
    { name: "Pengaturan", href: "/admin/settings", icon: Settings },
  ]

  // --- KOMPONEN SIDEBAR (Reusable untuk Mobile & Desktop) ---
  const SidebarContent = () => (
    <div className="flex flex-col h-full text-white bg-slate-900">
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-slate-800 bg-slate-950 shrink-0">
            <div className="text-center">
                <h1 className="font-bold text-xl tracking-wider text-blue-400">SI-MUDIK</h1>
                <p className="text-[10px] text-slate-400">Admin Panel v1.2</p>
            </div>
        </div>

        {/* Menu Links */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)}>
                        <div className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 cursor-pointer group ${isActive ? "bg-blue-700 text-white shadow-md font-medium" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
                            <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-slate-500 group-hover:text-white"}`} />
                            <span className="text-sm">{item.name}</span>
                        </div>
                    </Link>
                )
            })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 shrink-0">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shrink-0 shadow-lg border border-blue-400">AD</div>
                <div className="overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">Administrator</p>
                    <p className="text-[10px] text-slate-400 truncate">admin@kemenhub.go.id</p>
                </div>
            </div>
            <Button variant="destructive" size="sm" onClick={handleLogout} className="w-full mt-4 flex items-center gap-2 bg-red-600 hover:bg-red-700">
                <LogOut className="w-4 h-4" /> Keluar
            </Button>
        </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* 1. SIDEBAR DESKTOP (Hidden on Mobile) */}
      {/* Hanya muncul di layar 'md' (medium/tablet) ke atas */}
      <aside className="hidden md:flex w-64 bg-slate-900 fixed h-full z-20 shadow-xl flex-col">
         <SidebarContent />
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      {/* Margin kiri 64 hanya aktif di desktop agar tidak tertutup sidebar */}
      <div className="flex-1 flex flex-col transition-all duration-300 md:ml-64">
        
        {/* Topbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 shadow-sm">
            
            {/* MOBILE TRIGGER (Hanya muncul di Mobile) */}
            <div className="md:hidden">
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-slate-100">
                            <Menu className="w-5 h-5 text-slate-700" />
                        </Button>
                    </SheetTrigger>
                    {/* SheetContent muncul dari kiri (side="left") */}
                    <SheetContent side="left" className="p-0 bg-slate-900 border-r-slate-800 w-64 text-white">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Spacer kosong untuk Desktop agar User Icon tetap di kanan */}
            <div className="hidden md:block"></div>

            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="hidden sm:inline">System Status: </span><span className="text-green-700 font-semibold">Online</span>
                </div>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full border border-slate-200 hover:bg-slate-50 focus:ring-0">
                            <User className="w-4 h-4 text-slate-600" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push('/admin/settings')} className="cursor-pointer">Pengaturan</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                            <LogOut className="w-4 h-4 mr-2" /> Keluar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 min-h-[calc(100vh-64px)] overflow-x-hidden">
            {children}
        </main>
      </div>
    </div>
  )
}