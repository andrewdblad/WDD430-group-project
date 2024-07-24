
import Layout from '../app/components/ClientLayout';

const ProductListing = () => {
    return (
        <Layout>
            <div className="p-5 pt-32">
                <h1 className="text-3xl font-bold mb-4">Product Listings</h1>
                <p>This is the Product Listings page. Here you can view and manage product listings.</p>
            </div>
        </Layout>
    );
};

export default ProductListing;


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
