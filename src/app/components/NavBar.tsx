"use client";

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };


    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search logic here, such as redirecting to a search results page. This still needs to be developed more
        console.log('Searching for:', searchTerm);
    };

    return (

        <nav className="bg-hookersgreen text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-16">
                    <Link href="/" className="text-xl font-bold">
                        <Image src="/logo-w.png" alt="Handcrafted Haven Logo" width={50} height={25} />
                    </Link>
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
            </div>
        </nav>
    );
};

export default Navbar;