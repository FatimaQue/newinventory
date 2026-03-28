'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const ProductTable = () => {
  // 1. Sample Data
  const allProducts = [
    { id: 1, name: 'Premium Wireless Headphones', category: 'Electronics', price: '$299.00', status: 'In Stock' },
    { id: 2, name: 'Mechanical Keyboard', category: 'Accessories', price: '$159.00', status: 'Low Stock' },
    { id: 3, name: 'Leather Office Chair', category: 'Furniture', price: '$450.00', status: 'In Stock' },
    { id: 4, name: '4K Mirrorless Camera', category: 'Electronics', price: '$1,200.00', status: 'Out of Stock' },
    { id: 5, name: 'USB-C Docking Station', category: 'Accessories', price: '$89.00', status: 'In Stock' },
    { id: 6, name: 'Ergonomic Mouse', category: 'Accessories', price: '$65.00', status: 'In Stock' },
    { id: 7, name: 'Smart Watch Series 5', category: 'Electronics', price: '$399.00', status: 'In Stock' },
    { id: 8, name: 'Standing Desk', category: 'Furniture', price: '$550.00', status: 'Low Stock' },
  ];

  // 2. State Management
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 3. Filter Logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // 4. Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Product Inventory</h2>
          <p className="text-sm text-gray-500">Manage and track your store products</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-100 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Product Name</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Category</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${product.status === 'In Stock' ? 'bg-green-50 text-green-700' : 
                        product.status === 'Low Stock' ? 'bg-yellow-50 text-yellow-700' : 
                        'bg-red-50 text-red-700'}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-400">
                    <button className="hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500 italic">
                  No products found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-6 px-2">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(startIndex + itemsPerPage, filteredProducts.length)}</span> of <span className="font-semibold text-gray-900">{filteredProducts.length}</span> results
        </p>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="hidden sm:flex items-center space-x-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors
                  ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;