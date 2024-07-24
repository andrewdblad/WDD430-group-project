"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout from './components/layout';
import ProductCards from './components/ProductCards';
import ReviewCards from './components/ReviewCards';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the database
        fetch('/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <Layout>
            <div className='flex flex-col h-screen bg-seasalt pt-20 w-full'>
                <section className=" flex-grow flex justify-center items-center relative w-full h-60">
                    <Image
                        src="/banner.png"
                        alt="Banner Image"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                    />
                    <div className="absolute text-white text-center z-10"></div>
                </section>
                <section className="flex-grow flex justify-center items-center">
                    <div className="text-white text-center w-full">
                        <ProductCards />
                    </div>
                </section>
                <h1 className="text-center text-4xl font-bold my-8">Best Rated Items</h1>
                <section className="flex-grow flex justify-center items-center">
                    <div className="text-white text-center w-full">
                        <ReviewCards />
                    </div>
                </section>
            </div>
        </Layout>
    );
}