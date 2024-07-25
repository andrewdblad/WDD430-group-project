"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProductCards from './components/ProductCards';
import ReviewCards from './components/ReviewCards';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    console.log('Rendering Home component');

    return (
        <div className='flex flex-col bg-seasalt pt-20 w-full'>
            <section className="flex justify-center items-center relative w-full h-60">
                <Image
                    src="/banner.png"
                    alt="Banner Image"
                    fill
                    style={{ objectFit: "cover" }}
                    quality={100}
                />
                <div className="absolute text-white text-center z-10"></div>
            </section>
            <h1 className="text-center text-4xl font-bold mt-20">Product Listings</h1>
            <section className="flex justify-center items-center mt-10 mb-10">
                <div className="text-white text-center w-full">
                    <ProductCards />
                </div>
            </section>
            <h1 className="text-center text-4xl font-bold">Best Rated Items</h1>
            <section className="flex justify-center items-center mt-10 mb-10">
                <div className="text-white text-center w-full">
                    <ReviewCards />
                </div>
            </section>
        </div>
    );
}
