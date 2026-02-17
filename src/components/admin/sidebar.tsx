"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Map,
    CalendarCheck,
    Users,
    MessageSquare,
    FileText,
    Tag,
    Settings,
} from "lucide-react"

const sidebarLinks = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        route: "/admin",
    },
    {
        icon: Map,
        label: "Trips",
        route: "/admin/trips",
    },
    {
        icon: CalendarCheck,
        label: "Bookings",
        route: "/admin/bookings",
    },
    {
        icon: Users,
        label: "Users",
        route: "/admin/users",
    },
    {
        icon: MessageSquare,
        label: "Reviews",
        route: "/admin/reviews",
    },
    {
        icon: FileText,
        label: "Blogs",
        route: "/admin/blogs",
    },
    {
        icon: Tag,
        label: "Coupons",
        route: "/admin/coupons",
    },
    {
        icon: Settings,
        label: "CMS & Settings",
        route: "/admin/settings",
    },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 -translate-x-full">
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <Link href="/">
                    <span className="text-xl font-bold text-white">Travel Admin</span>
                </Link>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">
                            MENU
                        </h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            {sidebarLinks.map((link) => {
                                const isActive = pathname === link.route

                                return (
                                    <li key={link.label}>
                                        <Link
                                            href={link.route}
                                            className={cn(
                                                "group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-gray-300 duration-300 ease-in-out hover:bg-gray-700 hover:text-white",
                                                isActive && "bg-gray-700 text-white"
                                            )}
                                        >
                                            <link.icon className="h-5 w-5" />
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    )
}
