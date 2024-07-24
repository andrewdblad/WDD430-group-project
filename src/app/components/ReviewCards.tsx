"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';

// We need to modify this as we are supposed to get the data from the database rather than hard-coding and declaring local objects. 
const reviews = [
    { id: 1, user_id: 'Andrew', product_id: 1, rating: 4.5, review_text: 'This is an amazing product. I use it every day!', created_at: '7/23/2024' },
    { id: 2, user_id: 'Emily', product_id: 2, rating: 5, review_text: 'Absolutely fantastic! Highly recommended.', created_at: '7/24/2024' },
    { id: 3, user_id: 'Michael', product_id: 3, rating: 3.5, review_text: 'Good product, but has some minor issues.', created_at: '7/25/2024' },
    { id: 4, user_id: 'Sarah', product_id: 4, rating: 4, review_text: 'Very useful and works as expected.', created_at: '7/26/2024' },
    { id: 5, user_id: 'David', product_id: 1, rating: 2.5, review_text: 'Not satisfied. The product didn\'t meet my expectations.', created_at: '7/27/2024' },
    { id: 6, user_id: 'Jessica', product_id: 2, rating: 4.5, review_text: 'Great value for the price.', created_at: '7/28/2024' },
    { id: 7, user_id: 'Daniel', product_id: 3, rating: 5, review_text: 'Excellent product! Exceeds all my expectations.', created_at: '7/29/2024' },
    { id: 8, user_id: 'Sophia', product_id: 4, rating: 4, review_text: 'Good quality, would buy again.', created_at: '7/30/2024' },
    { id: 9, user_id: 'James', product_id: 1, rating: 3, review_text: 'Average product. Nothing special.', created_at: '7/31/2024' },
    { id: 10, user_id: 'Olivia', product_id: 2, rating: 4.5, review_text: 'Works perfectly. Very happy with this purchase.', created_at: '8/1/2024' }
];

const ReviewCards = () => {
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

    const totalPages = Math.ceil(reviews.length / cardsPerPage);
    const start = currentPage * cardsPerPage;
    const end = start + cardsPerPage;
    const currentReviews = reviews.slice(start, end);


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
                {currentReviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-lg shadow-lg p-4 min-w-[80%] sm:min-w-[200px] max-w-[200px] flex-shrink-0">
                        <h2 className="text-l font-bold mt-2 text-black">Product {review.product_id}</h2>
                        <p className="text-gray-600">{review.rating}
                        <img src="https://tevispropane.com/wp-content/uploads/2016/11/Review-star.png" alt="star" className="inline-block ml-2 w-5 h-5" />
                        </p>
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


export default ReviewCards;