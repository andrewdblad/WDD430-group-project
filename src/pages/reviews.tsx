import { useEffect, useState } from 'react';
import Layout from '../app/components/ClientLayout';
import Link from 'next/link';

interface Review {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    review_text: string;
    created_at: string;
    user_name: string;
    product_name: string;
}

const ReviewsAndRatings = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/reviews/getallreviews');
                if (!response.ok) {
                    throw new Error(`Failed to fetch reviews: ${response.statusText}`);
                }

                const data: Review[] = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError('Failed to fetch reviews');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="p-5 pt-32">
                    <h1 className="text-3xl font-bold mb-4">Reviews and Ratings</h1>
                    <p>Loading reviews...</p>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="p-5 pt-32">
                    <h1 className="text-3xl font-bold mb-4">Reviews and Ratings</h1>
                    <p>{error}</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-5 pt-32">
                <h1 className="text-3xl font-bold mb-4">Reviews and Ratings</h1>
                <p>Here is a list of product reviews.</p>
                <div className="mt-8">
                    {reviews.length > 0 ? (
                        <ul>
                            {reviews.map(review => (
                                <li key={review.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                                    <h2 className="text-xl font-semibold">Review by {review.user_name}</h2>
                                    <Link href={`/product/${review.product_id}`} legacyBehavior>
                                        <a className="text-blue-500">Product: {review.product_name}</a>
                                    </Link>
                                    <p className="text-gray-600">Reviewed on: {review.created_at}</p>
                                    <p className="mt-2">
                                        <strong>Rating:</strong> {review.rating}/5
                                        <img src="https://tevispropane.com/wp-content/uploads/2016/11/Review-star.png" alt="star" className="inline-block ml-2 w-5 h-5" />
                                    </p>
                                    <p className="mt-2">{review.review_text}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ReviewsAndRatings;
