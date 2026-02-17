import Link from "next/link"
import { Bell, Search } from "lucide-react"
import { User } from "next-auth"

export function AdminHeader({ user }: { user?: User }) {
    return (
        <header className="sticky top-0 z-40 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-md md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4">
                    <button className="z-50 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden">
                        <span className="relative block h-5.5 w-5.5 cursor-pointer">
                            <span className="du-block absolute right-0 h-full w-full">
                                <span className="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white delay-300"></span>
                                <span className="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white delay-400"></span>
                                <span className="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white delay-500"></span>
                            </span>
                        </span>
                    </button>

                    <div className="relative hidden sm:block">
                        <form action="https://formbold.com/s/unique_form_id" method="POST">
                            <div className="relative">
                                <button className="absolute left-0 top-1/2 -translate-y-1/2">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Type to search..."
                                    className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                                />
                            </div>
                        </form>
                    </div>
                </div>

                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        <li className="relative">
                            <Link
                                href="#"
                                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                            >
                                <Bell className="h-5 w-5 text-gray-600" />
                                <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-red-600">
                                    <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-75"></span>
                                </span>
                            </Link>
                        </li>
                    </ul>

                    <div className="relative">
                        <Link className="flex items-center gap-4" href="#">
                            <span className="hidden text-right lg:block">
                                <span className="block text-sm font-medium text-black dark:text-white">
                                    {user?.name || "Admin"}
                                </span>
                                <span className="block text-xs">System Admin</span>
                            </span>
                            <span className="h-12 w-12 rounded-full bg-gray-300">
                                {/* User Avatar Placeholder */}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
