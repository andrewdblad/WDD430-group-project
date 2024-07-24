"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { getAllProducts } from '../../lib/data';



// We need to modify this as we are supposed to get the data from the database rather than hard-coding and declaring local objects. 
const products = [
    { id: 1, name: 'Product 1', price: '$100', image: '/pexels-dmitriy-steinke-559643503-16805249.jpg' },
    { id: 2, name: 'Product 2', price: '$150', image: '/pexels-laarkstudio-7434285.jpg' },
    { id: 3, name: 'Product 3', price: '$200', image: '/pexels-paulseling-20483988.jpg' },
    { id: 4, name: 'Product 4', price: '$250', image: '/pexels-the-glorious-studio-3584518-20943476.jpg' },
    { id: 5, name: 'Product 5', price: '$300', image: '/pexels-vlada-karpovich-4452382.jpg' },
    { id: 6, name: 'Product 6', price: '$350', image: '/pexels-jul-chi-2704066-4309152.jpg' },
    { id: 7, name: 'Product 7', price: '$400', image: '/pexels-maxavans-5059464.jpg' },
    { id: 8, name: 'Product 8', price: '$450', image: '/pexels-olgakalinina-11354196.jpg' },
    { id: 9, name: 'Product 9', price: '$500', image: '/pexels-skykristal-13083077.jpg' },
    { id: 10, name: 'Product 10', price: '$550', image: '/pexels-tailor-mia-230900612-12109904.jpg' },
];

const ProductCards = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(1);

    useEffect(() => {
        const updateCardsPerPage = () => {

            if (window.innerWidth >= 1275) {
                setCardsPerPage(5); // Large screens
            }
            else if (window.innerWidth >= 1024) {
                setCardsPerPage(4); // Large screens
            }
            else if (window.innerWidth >= 768) {
                setCardsPerPage(3); // Medium screens
            } else if (window.innerWidth >= 650) {
                setCardsPerPage(2); // Medium screens - 2
            }

            else {
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


    // This is using react swipeable, a libraly that allows you to control swipe gestures
    // for the action of moving through pages in this case for the product cards pages.
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
                        <Image src={product.image} alt={product.name} width={200} height={200} className="object-cover rounded-t-lg w-full" />
                        <h2 className="text-l font-bold mt-2 text-black">{product.name}</h2>
                        <p className="text-gray-600">{product.price}</p>
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
