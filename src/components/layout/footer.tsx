import { Plane, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container py-12 md:py-16">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-2">
                        <Link href="/" className="mb-4 flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                <Plane className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">TravelGo</span>
                        </Link>
                        <p className="max-w-xs text-sm text-balance leading-loose text-muted-foreground">
                            Making travel easy, affordable, and unforgettable. Join us to explore the world's most beautiful destinations.
                        </p>
                        <div className="mt-6 flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Company</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
                            <li><Link href="/press" className="hover:text-primary">Press</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Support</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/help" className="hover:text-primary">Help Center</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Destinations</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/trips/bali" className="hover:text-primary">Bali</Link></li>
                            <li><Link href="/trips/europe" className="hover:text-primary">Europe</Link></li>
                            <li><Link href="/trips/japan" className="hover:text-primary">Japan</Link></li>
                            <li><Link href="/trips/thailand" className="hover:text-primary">Thailand</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} TravelGo Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
