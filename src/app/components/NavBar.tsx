"use client";

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';



const Navbar = () => {
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
        <nav className="bg-hookersgreen text-white p-4 fixed w-full z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-16">
                    <Link href="/" className="text-xl font-bold">
                        <Image src="/logo-w.png" alt="Handcrafted Haven Logo" width={50} height={25} />
                    </Link>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/profiles">Seller Profiles</Link>
                    <Link href="/listings">Product Listings</Link>
                    <Link href="/reviews">Reviews and Ratings</Link>
                </div>
                <div className="flex items-center">
                    <form onSubmit={handleSearchSubmit} className="flex">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            className="px-2 py-1 rounded-l-md border-none text-black"
                        />
                        <button type="submit" className="px-3 py-1 bg-khaki rounded-r-md">
                            Search
                        </button>
                    </form>
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="outline-none">
                        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* This is the drop-down menu */}
            {isOpen && (
                <div className="md:hidden fixed top-14 left-0 right-0 bg-hookersgreen bg-opacity-75 flex flex-col items-center justify-center space-y-2 mt-3 pb-2 z-20">
                    <Link href="/profiles" className="block px-2 py-1">Seller Profiles</Link>
                    <Link href="/listings" className="block px-2 py-1">Product Listings</Link>
                    <Link href="/reviews" className="block px-2 py-1">Reviews and Ratings</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;