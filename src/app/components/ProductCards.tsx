"use client";

import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

interface Product {
    id: number;
    user_id: number;
    category_id: number;
    name: string;
    description: string;
    price: number | string;
    image_url: string;
}

const ProductCards = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products/getall');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const products: Product[] = await response.json();
                setProducts(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const updateCardsPerPage = () => {
            if (window.innerWidth >= 1275) {
                setCardsPerPage(5); // Large screens
            } else if (window.innerWidth >= 1024) {
                setCardsPerPage(4); // Large screens
            } else if (window.innerWidth >= 768) {
                setCardsPerPage(3); // Medium screens
            } else if (window.innerWidth >= 650) {
                setCardsPerPage(2); // Medium screens - 2
            } else {
                setCardsPerPage(1); // Small screens
            }
        };

        updateCardsPerPage();
        window.addEventListener('resize', updateCardsPerPage);
        return () => window.removeEventListener('resize', updateCardsPerPage);
    }, []);

    const totalPages = Math.ceil(products.length / cardsPerPage);
    const start = currentPage * cardsPerPage;
    const end = start + cardsPerPage;
    const currentProducts = products.slice(start, end);

    const handleSwipeLeft = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    };

    const handleSwipeRight = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    };

    const handlers = useSwipeable({
        onSwipedLeft: handleSwipeLeft,
        onSwipedRight: handleSwipeRight,
        trackMouse: true,
    });

    return (
        <div className="relative w-full mt-20 mb-20" {...handlers}>
            <div className="flex justify-center overflow-x-auto space-x-4 p-4">
                {currentProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-lg p-4 min-w-[80%] sm:min-w-[200px] max-w-[200px] flex-shrink-0">
                        <img src={product.image_url} alt={product.name} className="object-cover rounded-t-lg w-full h-48" />
                        <h2 className="text-l font-bold mt-2 text-black">{product.name}</h2>
                        <p className="text-gray-600">${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2)}</p>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`w-4 h-4 rounded-full ${currentPage === index ? 'bg-gray-800' : 'bg-gray-400'} bg-opacity-50 hover:bg-opacity-100 transition`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default ProductCards;
