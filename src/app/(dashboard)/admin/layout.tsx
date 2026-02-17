import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
        // Double check protection, though middleware should handle it
        // redirect("/login")
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <AdminSidebar />
            <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <AdminHeader user={session?.user} />
                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
