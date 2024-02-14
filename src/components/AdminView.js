// [CODED BY - HUI ANGELES]
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import CreateProduct from './CreateProduct';
import RetrieveAllOrders from './AllOrders';
import AllUsersComponent from './SetAsAdmin';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';
import AdminDetails from './AdminDetails';

export default function AdminView({ products, fetchData }) {
    const [filters, setFilters] = useState({
        name: '',
        description: '',
        category: '',
        availability: 'all', 
    });
    const [sortOrder, setSortOrder] = useState({
        price: 'asc',
        stock: 'asc',
    });
    const [activeTab, setActiveTab] = useState('dashboard');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleSortChange = (column) => {
        setSortOrder({
            ...sortOrder,
            [column]: sortOrder[column] === 'asc' ? 'desc' : 'asc',
        });
    };

    const handleAvailabilityChange = (e) => {
        const { value } = e.target;
        setFilters({
            ...filters,
            availability: value,
        });
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder.price === 'asc') {
            return parseFloat(a.price.replace(/[^\d.-]/g, '')) - parseFloat(b.price.replace(/[^\d.-]/g, ''));
        } else {
            return parseFloat(b.price.replace(/[^\d.-]/g, '')) - parseFloat(a.price.replace(/[^\d.-]/g, ''));
        }
    }).sort((a, b) => {
        if (sortOrder.stock === 'asc') {
            return a.stock - b.stock;
        } else {
            return b.stock - a.stock;
        }
    });

    const filteredProducts = sortedProducts.filter(product => {
        return (
            (product.name.toLowerCase().includes(filters.name.toLowerCase()) || filters.name === '') &&
            (product.description.toLowerCase().includes(filters.description.toLowerCase()) || filters.description === '') &&
            (product.category.toLowerCase().includes(filters.category.toLowerCase()) || filters.category === '') &&
            (filters.availability === 'all' ||
                (filters.availability === 'available' && product.isActive && product.stock > 0) ||
                (filters.availability === 'unavailable' && (!product.isActive || product.stock === 0)))
        );
    });

    const renderProducts = (products) => {
        if (!products || products.length === 0) {
            return (
                <tr>
                    <td colSpan="8">No products available</td>
                </tr>
            );
        }

        return products.map(product => {
            const showActionButtons = product.stock !== 0;

            return (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td className={!product.isActive || product.stock === 0 ? "text-danger" : "text-success"}>
                        {!product.isActive || product.stock === 0 ? "Unavailable" : "Available"}
                    </td>
                    <td>
                        <div>
                            <EditProduct product={product._id} fetchData={fetchData} />
                            {showActionButtons && (
                                <ArchiveProduct product={{ _id: product._id }} isActive={product.isActive} fetchData={fetchData} />
                            )}
                        </div>
                    </td>
                </tr>
            );
        });
    };

    return (
        <>
            <h1>Admin Dashboard</h1>
            <div className="d-flex">
                <div className="nav flex-column nav-pills me-3" role="tablist" aria-orientation="vertical">
                    <button className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => handleTabChange('dashboard')} role="tab">Inventory</button>
                    <button className={`nav-link ${activeTab === 'create-product' ? 'active' : ''}`} onClick={() => handleTabChange('create-product')} role="tab">Create Product</button>
                    <button className={`nav-link ${activeTab === 'all-orders' ? 'active' : ''}`} onClick={() => handleTabChange('all-orders')} role="tab">View All Orders</button>
                    <button className={`nav-link ${activeTab === 'set-admin' ? 'active' : ''}`} onClick={() => handleTabChange('set-admin')} role="tab">Set as Admin</button>
                    <button className={`nav-link ${activeTab === 'admin-details' ? 'active' : ''}`} onClick={() => handleTabChange('admin-details')} role="tab">Admin Profile</button>
                </div>
                <div className="tab-content">
                    {activeTab === 'dashboard' && (
                        <>
                            <h1>Products Inventory</h1>
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Filter by Name"
                                    value={filters.name}
                                    onChange={handleFilterChange}
                                />
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Filter by Description"
                                    value={filters.description}
                                    onChange={handleFilterChange}
                                />
                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Filter by Category"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                                />
                                <select
                                    name="availability"
                                    value={filters.availability}
                                    onChange={handleAvailabilityChange}
                                >
                                    <option value="">Filter by Availability</option>
                                    <option value="all">All</option>
                                    <option value="available">Available</option>
                                    <option value="unavailable">Unavailable</option>
                                </select>
                            </div>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>
                                            Name
                                        </th>
                                        <th>
                                            Description
                                        </th>
                                        <th>
                                            Category
                                        </th>
                                        <th onClick={() => handleSortChange('price')}>
                                            Price {sortOrder.price === 'asc' ? '↑' : '↓'}
                                        </th>
                                        <th onClick={() => handleSortChange('stock')}>
                                            Stock {sortOrder.stock === 'asc' ? '↑' : '↓'}
                                        </th>
                                        <th>
                                            Availability
                                        </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderProducts(filteredProducts)}
                                </tbody>
                            </Table>
                        </>
                    )}
                    {activeTab === 'create-product' && (
                        <div>
                            <CreateProduct />
                        </div>
                    )}
                    {activeTab === 'all-orders' && (
                        <div>
                            <RetrieveAllOrders />
                        </div>
                    )}
                    {activeTab === 'set-admin' && (
                        <div>
                            <AllUsersComponent />
                        </div>
                    )}
                    {activeTab === 'admin-details' && (
                        <div>
                            <AdminDetails />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
