import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import NavBar from '../app/components/NavBar';
import Modal from '../app/components/Modal';
import '../app/globals.css';

interface Product {
    id: number;
    user_id: number;
    category_id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

const ProfilePage = () => {
    const { data: session } = useSession();
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [productId, setProductId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState<number | null>(null);

    useEffect(() => {
        if (session) {
            fetchProducts();
        }
    }, [session]);

    const addOrUpdateProduct = async () => {
        const url = editMode ? `/api/products/update` : '/api/products/add';
        const method = editMode ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: productId,
                    user_id: session?.user.id,
                    category_id: 1, // Assuming category ID is 1 for now
                    name,
                    description,
                    price: parseFloat(price),
                    image_url: image,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add/update product');
            }

            const updatedProduct: Product = await response.json();

            if (editMode) {
                setProducts(products.map((product) => (product.id === productId ? updatedProduct : product)));
                setEditMode(false);
                setProductId(null);
            } else {
                setProducts([...products, updatedProduct]);
            }

            resetForm();
        } catch (error) {
            console.error('Error adding/updating product:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(`/api/products?userId=${session?.user.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const products: Product[] = await response.json();
            setProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleEdit = (product: Product) => {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price.toString());
        setImage(product.image_url);
        setEditMode(true);
        setProductId(product.id);
    };

    const handleCancel = () => {
        resetForm();
        setEditMode(false);
        setProductId(null);
    };

    const handleDelete = (id: number) => {
        setDeleteProductId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (!deleteProductId) return;

        try {
            const response = await fetch(`/api/products/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: deleteProductId }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            setProducts(products.filter((product) => product.id !== deleteProductId));
            setShowModal(false);
            setDeleteProductId(null);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setPrice('');
        setImage('');
    };

    if (!session) {
        return <div>Please log in to view your profile and products.</div>;
    }

    return (
        <div>
            <NavBar />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Profile Page</h1>
                <div className="add-product-form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Product' : 'Add a New Product'}</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addOrUpdateProduct();
                        }}
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Product Description</label>
                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Product Price</label>
                            <input
                                type="number"
                                placeholder="Product Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                {editMode ? 'Update Product' : 'Add Product'}
                            </button>
                            {editMode && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                <h2 className="text-xl font-bold mt-10 mb-4">Your Products</h2>
                {products.length === 0 ? (
                    <p>No Products Uploaded Yet</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div className="product-card bg-white shadow-md rounded p-4" key={product.id}>
                                <img className="w-full h-48 object-cover mb-4 rounded-t-lg" src={product.image_url} alt={product.name} />
                                <div className="product-details p-4">
                                    <h3 className="text-lg font-bold">{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p className="text-blue-500 font-bold">${Number(product.price).toFixed(2)}</p>
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="bg-dimgray hover:bg-khaki text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-900 hover:bg-red-950 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2 ml-2"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete this product? This action cannot be undone."
            />
        </div>
    );
};

export default ProfilePage;
