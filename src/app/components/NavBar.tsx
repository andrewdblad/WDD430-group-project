"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const { data: session } = useSession();
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search logic here, such as redirecting to a search results page. This still needs to be developed more
        console.log('Searching for:', searchTerm);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-hookersgreen text-white p-4 fixed w-full z-20">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4 md:space-x-16">
                    <Link href="/" className="text-xl font-bold">
                        <Image src="/logo-w.png" alt="Handcrafted Haven Logo" width={50} height={50} />
                    </Link>
                </div>
                <div className="hidden md:flex items-center space-x-24">
                    <Link href={session ? "/profiles" : "/login"}>
                        <UserIcon className="h-8 w-8 hidden md:block" />
                        <span className="block md:hidden">Seller Profiles</span>
                    </Link>
                    <Link href="/listings">Products</Link>
                    <Link href="/reviews">Reviews</Link>
                </div>
                <div className="flex items-center space-x-4">
                    {session ? (
                        <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="text-white bg-cambridgeblue hover:bg-ashgray px-3 py-2 rounded-md"
                        >
                            Log out
                        </button>
                    ) : (
                        <Link href="/login">
                            <button className="text-white bg-cambridgeblue hover:bg-ashgray px-3 py-2 rounded-md">
                                Log in
                            </button>
                        </Link>
                    )}
                    <form onSubmit={handleSearchSubmit} className="flex">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            className="px-2 py-1 rounded-l-md border-none text-black md:w-48 w-32"
                        />
                        <button type="submit" className="ml-(-1) px-3 py-1 bg-khaki rounded-r-md">
                            <MagnifyingGlassIcon className="h-5 w-5 text-black" />
                        </button>
                    </form>
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="outline-none">
                        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden fixed top-14 left-0 right-0 bg-hookersgreen bg-opacity-75 flex flex-col items-center justify-center space-y-2 mt-3 pb-2 z-20">
                    <Link href={session ? "/profiles" : "/login"} className="block px-2 py-1">Seller Profile</Link>
                    <Link href="/listings" className="block px-2 py-1">Products</Link>
                    <Link href="/reviews" className="block px-2 py-1">Reviews</Link>
                    {session && (
                        <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md"
                        >
                            Log out
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
