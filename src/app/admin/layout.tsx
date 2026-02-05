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
  Map 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Cookies from "js-cookie"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // --- LOGIKA LOGOUT ---
  const handleLogout = () => {
    // 1. Hapus cookie sesi
    Cookies.remove("admin_session")
    // 2. Arahkan kembali ke halaman login
    router.push("/login")
  }

  // --- MENU ITEMS ---
  const menuItems = [
    { 
      name: "Dashboard", 
      href: "/admin", 
      icon: LayoutDashboard 
    },
    { 
      name: "Data Responden", 
      href: "/admin/respondents", 
      icon: Users 
    },
    { 
      name: "Master Wilayah", 
      href: "/admin/master-data", 
      icon: Map 
    },
    { 
      name: "Pengaturan", 
      href: "/admin/settings", 
      icon: Settings 
    },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* --- SIDEBAR --- */}
      <aside className={`${isSidebarOpen ? "w-64" : "w-20"} bg-slate-900 text-white transition-all duration-300 flex flex-col fixed h-full z-20 shadow-xl`}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-slate-800 bg-slate-950">
            {isSidebarOpen ? (
                <div className="text-center animate-in fade-in duration-300">
                    <h1 className="font-bold text-xl tracking-wider text-blue-400">SI-MUDIK</h1>
                    <p className="text-[10px] text-slate-400">Admin Panel v1.2</p>
                </div>
            ) : (
                <span className="font-bold text-xl text-blue-400">SM</span>
            )}
        </div>

        {/* Menu Links */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                    <Link key={item.href} href={item.href}>
                        <div className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 cursor-pointer group ${isActive ? "bg-blue-700 text-white shadow-md font-medium" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
                            <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-slate-500 group-hover:text-white"}`} />
                            {isSidebarOpen && <span className="text-sm">{item.name}</span>}
                        </div>
                    </Link>
                )
            })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950">
            <div className={`flex items-center gap-3 ${!isSidebarOpen && "justify-center"}`}>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shrink-0 shadow-lg border border-blue-400">
                    AD
                </div>
                {isSidebarOpen && (
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">Administrator</p>
                        <p className="text-[10px] text-slate-400 truncate">admin@kemenhub.go.id</p>
                    </div>
                )}
            </div>
            
            {/* TOMBOL LOGOUT (SIDEBAR) */}
            <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleLogout} // Fungsi logout dipanggil di sini
                className={`w-full mt-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 ${!isSidebarOpen && "px-0 justify-center"}`}
            >
                <LogOut className="w-4 h-4" />
                {isSidebarOpen && "Keluar"}
            </Button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Topbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-6 shadow-sm">
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hover:bg-slate-100">
                <Menu className="w-5 h-5 text-slate-700" />
            </Button>
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    System Status: <span className="text-green-700 font-semibold">Operational</span>
                </div>
                
                {/* USER ICON DENGAN DROPDOWN */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full border border-slate-200 hover:bg-slate-50 focus:ring-0">
                            <User className="w-4 h-4 text-slate-600" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push('/admin/settings')} className="cursor-pointer">
                            Pengaturan
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
                            <LogOut className="w-4 h-4 mr-2" />
                            Keluar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </header>

        {/* Content Rendered Here */}
        <main className="p-6 min-h-[calc(100vh-64px)]">
            {children}
        </main>
      </div>
    </div>
  )
}