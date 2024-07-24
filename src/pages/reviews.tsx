import Layout from '../app/components/ClientLayout';
import Link from 'next/link';

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

const ReviewsAndRatings = () => {
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
                                    <h2 className="text-xl font-semibold">Review by {review.user_id}</h2>
                                    <Link href={`/product/${review.product_id}`} legacyBehavior>
                                        <a className="text-blue-500">Product: {review.product_id}</a>
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



// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import NavBar from '../app/components/NavBar';
// import '../app/globals.css';

// interface Product {
//     id: number;
//     user_id: number;
//     category_id: number;
//     name: string;
//     description: string;
//     price: number;
//     image_url: string;
// }

// const ProfilePage = () => {
//     const { data: session } = useSession();
//     const [products, setProducts] = useState<Product[]>([]);
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState('');
//     const [image, setImage] = useState('');

//     useEffect(() => {
//         if (session) {
//             fetchProducts();
//         }
//     }, [session]);

//     const addProduct = async () => {
//         try {
//             const response = await fetch('/api/products/add', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     user_id: session?.user.id,
//                     category_id: 1, // Assuming category ID is 1 for now
//                     name,
//                     description,
//                     price: parseFloat(price),
//                     image_url: image,
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to add product');
//             }

//             const newProduct: Product = await response.json();
//             setProducts([...products, newProduct]);
//             setName('');
//             setDescription('');
//             setPrice('');
//             setImage('');
//         } catch (error) {
//             console.error('Error adding product:', error);
//         }
//     };

//     const fetchProducts = async () => {
//         try {
//             const response = await fetch('/api/products');
//             if (!response.ok) {
//                 throw new Error('Failed to fetch products');
//             }

//             const products: Product[] = await response.json();
//             setProducts(products);
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };

//     if (!session) {
//         return <div>Please log in to view your profile and products.</div>;
//     }

//     return (
//         <div>
//             <NavBar />
//             <div className="container">
//                 <h1>Profile Page</h1>
//                 <h2>Add a new product</h2>
//                 <form onSubmit={(e) => { e.preventDefault(); addProduct(); }}>
//                     <input
//                         type="text"
//                         placeholder="Product Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                     <textarea
//                         placeholder="Product Description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         required
//                     ></textarea>
//                     <input
//                         type="number"
//                         placeholder="Product Price"
//                         value={price}
//                         onChange={(e) => setPrice(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="text"
//                         placeholder="Image URL"
//                         value={image}
//                         onChange={(e) => setImage(e.target.value)}
//                         required
//                     />
//                     <button type="submit">Add Product</button>
//                 </form>
//                 <h2>Your Products</h2>
//                 <ul>
//                     {products.map((product) => (
//                         <li key={product.id}>
//                             <h3>{product.name}</h3>
//                             <p>{product.description}</p>
//                             <p>${product.price}</p>
//                             {/* Add buttons for edit and delete functionality here */}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;
