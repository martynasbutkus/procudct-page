import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const Reviews = () => {
  const BASE_URL = "http://localhost:4000";
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [productName, setProductName] = useState('');

  const fetchReviews = async () => {
    const response = await fetch(`${BASE_URL}/reviews?productId=${productId}`);
    if (response.ok) {
      const data = await response.json();
      setReviews(data);
    }
  };

  const fetchName = async () => {
    const response = await fetch(`${BASE_URL}/products?id=${productId}`);
    if (response.ok) {
      const data = await response.json();
      setProductName(data[0]?.title);
    }
  };

  useEffect(() => {
    fetchName();
    fetchReviews();
  }, [BASE_URL, productId]);

  const Stars = (y) => {
    const stars = [];
    const Rating = Math.floor(y);
    for (let i = 0; i < Rating; i++) {
      stars.push(<FaStar key={i} style={{ color: '#0FA5AF' }} />);
    }
    const remainingStars = 5 - Math.ceil(y);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`gray-${i}`} style={{ color: 'lightgray' }} />);
    }

    return stars;
  };

  return (
    <>
      <div className='product-title'>{productName}</div>
      <section id='app' className='reviews'>
        {reviews.map((review) => (
          <div key={review.id} className='review'>
            <p>{review.name}</p>
            <div className='star'>Rating: {Stars(review.rating)}</div>
            <p className='title'>{review.title}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </section>
      <div className='go-back'>
        <Link to="/">
          <button>Go back</button>
        </Link>
      </div>
    </>
  );
};

export default Reviews;
