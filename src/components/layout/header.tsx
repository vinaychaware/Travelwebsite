import Link from "next/link"
import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Plane, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

async function handleSignOut() {
    "use server"
    await signOut()
}

export async function Header() {
    const session = await auth()
    const user = session?.user

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <Plane className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">TravelGo</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-primary">Home</Link>
                    <Link href="/trips" className="transition-colors hover:text-primary">Destinations</Link>
                    <Link href="/tours" className="transition-colors hover:text-primary">Tours</Link>
                    <Link href="/about" className="transition-colors hover:text-primary">About Us</Link>
                    <Link href="/contact" className="transition-colors hover:text-primary">Contact</Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-2">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                            <User className="h-5 w-5 text-primary" />
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                                            <p className="text-xs leading-none text-muted-foreground font-normal">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="cursor-pointer">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/bookings" className="cursor-pointer">My Bookings</Link>
                                    </DropdownMenuItem>
                                    {user.role === "ADMIN" && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/admin" className="cursor-pointer">Admin Dashboard</Link>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <form action={handleSignOut} className="w-full">
                                            <button className="flex w-full items-center text-red-500 cursor-pointer">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Log out</span>
                                            </button>
                                        </form>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button variant="ghost" asChild>
                                    <Link href="/login">Log in</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/register">Sign up</Link>
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col space-y-4 mt-8">
                                <Link href="/" className="text-lg font-medium hover:text-primary">Home</Link>
                                <Link href="/trips" className="text-lg font-medium hover:text-primary">Destinations</Link>
                                <Link href="/tours" className="text-lg font-medium hover:text-primary">Tours</Link>
                                <Link href="/about" className="text-lg font-medium hover:text-primary">About Us</Link>
                                <Link href="/contact" className="text-lg font-medium hover:text-primary">Contact</Link>
                                <div className="h-px w-full bg-border my-4" />
                                {user ? (
                                    <>
                                        <Link href="/profile" className="text-lg font-medium hover:text-primary">Profile</Link>
                                        <Link href="/bookings" className="text-lg font-medium hover:text-primary">My Bookings</Link>
                                        <form action={handleSignOut}>
                                            <button className="flex items-center text-lg font-medium text-red-500">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Log out
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <div className="flex flex-col space-y-2">
                                        <Button variant="outline" asChild className="w-full">
                                            <Link href="/login">Log in</Link>
                                        </Button>
                                        <Button asChild className="w-full">
                                            <Link href="/register">Sign up</Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
