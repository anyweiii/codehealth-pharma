// [CODED BY: HUI ANGELES]
import { useEffect, useState, useContext } from 'react';
import UserView from "../components/UserView";
import AdminView from "../components/AdminView";
import UserContext from "../UserContext";
import { FaSearch } from 'react-icons/fa'
import '../styles/Products/products-userview.css';

export default function Products() {
    const { user } = useContext(UserContext);
    const [allProducts, setAllProducts] = useState([]);
    const [activeProducts, setActiveProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const isAdmin = user.isAdmin === true;

    useEffect(() => {
        setLoading(true);
        fetchAllProducts()
            .then(allProductsData => {
                setAllProducts(allProductsData);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching all products:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchActiveProducts()
            .then(activeProductsData => {
                setActiveProducts(activeProductsData);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching active products:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const filterProducts = () => {
            const filteredProducts = activeProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (filteredProducts.length === 0 && searchTerm !== '') {
                setErrorMessage('Product does not exist.');
                setSuccessMessage('');
            } else if (searchTerm === '') {
                setErrorMessage('');
                setSuccessMessage('');
            } else {
                setSearchResults(filteredProducts);
                setErrorMessage('');
                setSuccessMessage(`Found ${filteredProducts.length} product(s) matching '${searchTerm}'.`);
            }
        };

        filterProducts();
    }, [searchTerm, activeProducts]);

    const searchProductByPrice = async (minPrice, maxPrice) => {
        if (!minPrice || !maxPrice) {
            setErrorMessage('Please enter both minimum and maximum prices.');
            setSuccessMessage('');
            return;
        }
    
        if (parseFloat(minPrice) > parseFloat(maxPrice)) {
            setErrorMessage('Minimum price must be less than or equal to maximum price.');
            setSuccessMessage('');
            return;
        }
    
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/products/searchByPrice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ minPrice, maxPrice })
            });
            if (!res.ok) {
                throw new Error('Failed to search products by price');
            }
            const data = await res.json();
            const filteredProducts = data.list.filter(product => {
                const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));
                return numericPrice >= parseFloat(minPrice) && numericPrice <= parseFloat(maxPrice);
    
            });
            if (filteredProducts.length === 0) {
                setSearchResults([]);
                setErrorMessage('No products found within the specified price range.');
                setSuccessMessage('');
            } else {
                setSearchResults(filteredProducts);
                setErrorMessage('');
                setSuccessMessage(`Found ${filteredProducts.length} product(s) within the specified price range.`);
            }
        } catch (error) {
            console.error('Error searching products by price:', error);
            setErrorMessage('Error searching products by price. Please try again later.');
            setSuccessMessage('');
        }
    };
    
    const fetchAllProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/all`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            console.log("All Products Data:", data);
            return data.products;
        } catch (error) {
            console.error("Error fetching all products:", error);
            throw error;
        }
    };

    const fetchActiveProducts = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products`);
            const data = await res.json();
            console.log("Active Products Data:", data);
            return data.products;
        } catch (error) {
            console.error("Error fetching active products:", error);
            throw error;
        }
    };

    return (
        <>
            {!isAdmin && (
                <div className='products d-flex align-items-center col-md-12 col-6 justify-content-center pt-3 pb-5'> 
                    <div className="product-search">
                        <h1 className="product-header">Products</h1>
                        <div className="search-container">
                            <FaSearch className="search-icon" />
                            <input 
                                type="text" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                placeholder="Search Product Name"
                                className="search-input"
                            />
                        </div>
                    </div>
                    <div className="search-form d-flex flex-row align-items-center"> 
                        <label className="input-label ms-2 me-2">Minimum Price:</label>
                        <input 
                            type="number" 
                            value={minPrice} 
                            placeholder="Input Minimum Price"
                            onChange={(e) => setMinPrice(e.target.value)} 
                            className="input-field"
                        />
                        <label className="input-label ms-2 me-2">Maximum Price:</label>
                        <input 
                            type="number" 
                            value={maxPrice} 
                            placeholder="Input Maximum Price"
                            onChange={(e) => setMaxPrice(e.target.value)} 
                            className="input-field"
                        />
                        <button 
                            onClick={() => searchProductByPrice(minPrice, maxPrice)} 
                            className="search-button"
                        >
                            Search By Price
                        </button>
                    </div>
                </div>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {isAdmin ?
                        <AdminView products={allProducts} fetchData={fetchAllProducts} />
                        : <UserView productsData={searchResults.length > 0 ? searchResults : activeProducts} />}
                </>
            )}
        </>
    );    
}
