import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../utilities/firebase';

const Listing = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, 'products', productId));
        if (productDoc.exists()) {
          const productData = productDoc.data();
          setProduct(productData);
          console.log('Product data fetched:', productData); 
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error fetching product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="flex justify-center pt-60">
      <div className="flex w-full max-w-4xl">
        <div className="flex-1">
          <img src={product.imageUrl} alt={product.productName} className="w-full h-full object-cover rounded" />
        </div>
        <div className="flex flex-col justify-between ml-4 space-y-4">
          <div className="w-64 h-auto bg-gray-300 rounded p-4">
            <h1 className="text-black font-bold">₹ {product.price}</h1>
            <h3 className="text-lg font-semibold">{product.productName}</h3>
            <p>{product.description}</p>
            <p>Posted on {product.createdAt}</p>
          </div>
          <div className="w-64 h-auto bg-gray-300 rounded p-4">
            <h1 className="text-lg font-semibold">Seller Details</h1>
            <>
              <p>Name: {product.userName}</p>
              <p>Email: {product.userEmail}</p>
              <p>Phone: {product.phone}</p>
            </>
          </div>
          <div className="w-64 h-32 bg-gray-300 rounded flex flex-col items-center justify-center space-y-1">
                <h1 className="font-bold">Posted in</h1>
                <p>OLX</p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Listing;
