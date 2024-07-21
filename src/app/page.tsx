"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout from './components/layout';

// Sample card component
const Card = ({ product }) => (
    <div className="bg-white shadow-md rounded-lg p-4 m-2">
        <Image src={product.image} alt={product.name} width={100} height={100} />
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p>{product.description}</p>
        <p className="text-green-500">${product.price}</p>
    </div>
);

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
            <div className='flex flex-col h-screen bg-seasalt p-5 pt-20'>
                <section className=" flex-grow flex justify-center items-center relative w-full h-60">
                    <Image
                        src="/banner.png"
                        alt="Banner Image"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                    />
                    <div className="absolute text-white text-center z-10">Banner: Image of product with button - Siarhei Herman</div>
                </section>
                <section className="bg-blue-500 flex-grow flex justify-center items-center">
                    <div className="text-white text-center">Section: Cards for different items with plus icon - James Green</div>
                    <div className="flex flex-wrap justify-center">
                        {/* Sample card */}
                        <Card product={{ image: '/sample.png', name: 'Sample Product', description: 'This is a sample product.', price: '19.99' }} />
                        {/* Cards from database */}
                        {/* {products.map(product => (
                            <Card key={product.id} product={product} />
                        ))} */}
                    </div>
                </section>
                <section className="bg-green-500 flex-grow flex justify-center items-center">
                    <div className="text-white text-center">Best Rated Items: Highest score reviews - Blad Andrew</div>
                </section>
            </div>
        </Layout>
    );
}