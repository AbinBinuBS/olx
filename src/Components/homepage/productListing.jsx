import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from '../../utilities/firebase'; 
import { useNavigate } from 'react-router-dom';

const List = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      const productsQuery = query(collection(db, "products"));
      const querySnapshot = await getDocs(productsQuery);

      const fetchedProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/view/${productId}`);
  };

  return (
    <div>
        <div>
            <img className="px-24 py-12" src='../../../images/banner copy.png' alt=""/>
        </div>
      <div className="bg-slate-400 p-6">
        <h1 className="text-white my-5 font-bold text-xl">Quick Menu</h1>
        <div className='flex flex-wrap gap-6  px-6'>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="w-60 h-80 bg-white p-4 shadow-lg rounded-lg cursor-pointer" onClick={() => handleProductClick(product.id)}>
                <img src={product.imageUrl} alt="" className="h-40 w-full object-cover mb-2 rounded"/>
                <h2 className="text-black font-bold">{product.productName}</h2>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-gray-600">₹ {product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-white">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
