import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Products = () => {
  const BASE_URL = "http://localhost:4000/products";
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleShowReviews = (productId) => {
    navigate(`/reviews/${productId}`);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortProducts = (productsToSort) => {
    return productsToSort.sort((a, b) => {
      const A = a.price;
      const B = b.price;
      return sortOrder === 'asc' ? A - B : B - A;
    });
  };

  const filterAndSortProducts = () => {
    let filteredProducts = [...products];

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
    }

    return sortProducts(filteredProducts);
  };

  return (
    <>
      <div className="filter">
        <label>Filter by Category:</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
          {[...new Set(products.map((product) => product.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        
        <label>Sort by Price:</label>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>


      <section id="app" className="products">
        {filterAndSortProducts().map((product) => (
          <div key={product.id} className="product">
            <h1 className='pro'>{product.title}</h1>
            <p style={{ fontWeight: 'bold' }}>{product.category}</p>
            <p style={{ paddingBottom: '10px' }}>{product.price}€</p>
            <p style={{ paddingBottom: '10px' }}>{product.description}</p>
            <button className="button" onClick={() => handleShowReviews(product.id)}>
              Show Reviews
            </button>
          </div>
        ))}
      </section>
    </>
  );
};

export default Products;
