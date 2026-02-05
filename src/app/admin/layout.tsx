"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  User, 
  Menu,
  Users, 
  Map,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Mencegah error hidrasi pada icon/tema
  useEffect(() => {
    setMounted(true)
  }, [])

  // --- LOGIKA LOGOUT ---
  const handleLogout = () => {
    Cookies.remove("admin_session")
    router.push("/login")
  }

  // --- MENU CONFIGURATION ---
  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Data Responden", href: "/admin/respondents", icon: Users },
    { name: "Master Wilayah", href: "/admin/master-data", icon: Map },
    { name: "Pengaturan", href: "/admin/settings", icon: Settings },
  ]

  // --- KOMPONEN SIDEBAR (Reusable untuk Mobile & Desktop) ---
  const SidebarContent = () => (
    <div className="flex flex-col h-full text-white bg-slate-900">
        
        {/* HEADER SIDEBAR (DIKEMBALIKAN KE TENGAH SEPERTI SEMULA) */}
        <div className="h-16 flex items-center justify-center border-b border-slate-800 bg-slate-950 shrink-0">
            <div className="text-center animate-in fade-in duration-300">
                <h1 className="font-bold text-xl tracking-wider text-blue-400">SI-MUDIK</h1>
                <p className="text-[10px] text-slate-400">Admin Panel v1.2</p>
            </div>
        </div>

        {/* MENU LINKS */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Main Menu</p>
            {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)}>
                        <div className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer group ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
                            <div className="flex items-center gap-3">
                                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-slate-500 group-hover:text-white"}`} />
                                <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            {isActive && <ChevronRight className="w-4 h-4 opacity-50 animate-in fade-in slide-in-from-left-1" />}
                        </div>
                    </Link>
                )
            })}
        </nav>

        {/* FOOTER SIDEBAR (USER PROFILE) */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 shrink-0">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shrink-0 shadow-lg border-2 border-slate-800">
                    AD
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">Administrator</p>
                    <p className="text-[10px] text-slate-400 truncate">admin@kemenhub.go.id</p>
                </div>
            </div>
            <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleLogout} 
                className="w-full flex items-center gap-2 bg-red-600 hover:bg-red-700 shadow-sm border border-red-500/30"
            >
                <LogOut className="w-4 h-4" /> Keluar Aplikasi
            </Button>
        </div>
    </div>
  )

  if (!mounted) return null

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* 1. SIDEBAR DESKTOP (Hidden on Mobile) */}
      <aside className="hidden md:flex w-64 bg-slate-900 fixed h-full z-30 shadow-2xl flex-col border-r border-slate-800">
         <SidebarContent />
      </aside>

      {/* 2. AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col transition-all duration-300 md:ml-64">
        
        {/* TOPBAR (Header) */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 flex items-center justify-between px-4 md:px-8 shadow-sm">
            
            {/* TRIGGER MENU MOBILE */}
            <div className="md:hidden">
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="-ml-2 hover:bg-slate-100">
                            <Menu className="w-6 h-6 text-slate-700" />
                        </Button>
                    </SheetTrigger>
                    {/* SheetContent muncul dari kiri */}
                    <SheetContent side="left" className="p-0 bg-slate-900 border-r-slate-800 w-72 text-white">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            {/* JUDUL HALAMAN (Desktop Only) */}
            <div className="hidden md:block">
                <h2 className="text-sm font-semibold text-slate-700">Sistem Informasi Angkutan Lebaran</h2>
            </div>

            {/* STATUS & USER DROPDOWN */}
            <div className="flex items-center gap-3">
                {/* Status Indicator */}
                <div className="hidden sm:flex items-center gap-2 text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="font-semibold tracking-wide">System Online</span>
                </div>
                
                {/* User Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full border border-slate-200 hover:bg-slate-100 focus:ring-2 focus:ring-blue-100 active:scale-95 transition-all">
                            <User className="w-5 h-5 text-slate-600" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2">
                        <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push('/admin/settings')} className="cursor-pointer">
                            <Settings className="w-4 h-4 mr-2" /> Pengaturan
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer focus:bg-red-50">
                            <LogOut className="w-4 h-4 mr-2" /> Keluar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>

        {/* ISI HALAMAN (RENDER CHILDREN) */}
        <main className="p-4 md:p-8 min-h-[calc(100vh-64px)] overflow-x-hidden">
            {/* Animasi halus saat konten dimuat */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {children}
            </div>
        </main>
      </div>
    </div>
  )
}