import { useEffect, useState } from 'react';
import Layout from '../app/components/ClientLayout';

interface Product {
    id: number;
    user_id: number;
    category_id: number;
    name: string;
    description: string;
    price: number | string;
    image_url: string;
}

const ProductListing = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(1);
    const [priceFilter, setPriceFilter] = useState<number | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<string>('');
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

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setPriceFilter(isNaN(value) ? null : value);
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setCategoryFilter(value);
    }

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

    return (
        <Layout>
            <div className="p-5 pt-32">
                <h1 className="text-3xl font-bold mb-4">Product Listings</h1>
                <div className="mb-4"> 
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm price-bar"
                        placeholder="$0.00"
                        onChange={handlePriceChange}
                    />
                </div>
                <div className="mb-4">
                <label htmlFor="categories" className="block text-sm font-medium text-gray-700">Categories</label>
                <select
                    id="categories"
                    name="categories"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm filter-bar"
                    onChange={handleCategoryChange}
                >
                    <option value="">All Categories</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="toys">Toys</option>
                    <option value="decoration">Decoration</option>
                </select>
                </div>
                {products.length === 0 ? (
                    <p>No Products Available</p>
                ) : (
                    <div className="relative w-full mt-20 mb-20">
                        <div className="flex justify-center overflow-x-auto space-x-4 p-4">
                            {currentProducts
                                .filter(product => {
                                    const productPrice = typeof product.price === 'number' ? product.price : parseFloat(product.price);
                                    const matchesPrice = priceFilter === null || productPrice <= priceFilter;
                                    const matchesCategory = categoryFilter === '' || product.category_id === parseInt(categoryFilter);
                                    return matchesPrice && matchesCategory;
                                })
                                .map((product) => (
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
                )}
            </div>
        </Layout>
    );
};

export default ProductListing;