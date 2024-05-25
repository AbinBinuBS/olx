import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore"; 
import { storage, db } from '../../utilities/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUserContext } from '../userContext';

const SellingForm = () => {
  const { userData } = useUserContext();
  const nameRef = useRef(null);
  const categoryRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const productLocationRef = useRef(null);
  const imageRef = useRef(null);

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [productLocation, setProductLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const date = new Date();

  useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData, navigate]);

  const handleSubmission = async (e) => {
    e.preventDefault();

    if (!productName || !categoryRef.current || !priceRef.current || !description || !productLocation || !imageRef.current || !phone) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    try {
      const storageRef = ref(storage, `images/${imageRef.current.name}`);
      await uploadBytes(storageRef, imageRef.current);
      const imageUrl = await getDownloadURL(storageRef);
      await addDoc(collection(db, "products"), {
        productName,
        category: categoryRef.current.value,
        price: Number(priceRef.current.value),
        description: descriptionRef.current.value,
        productLocation: productLocationRef.current.value,
        imageUrl,
        userId: userData.uid,
        createdAt: date.toDateString(),
        userName: userData.name,
        userEmail: userData.email,
        phone 
      });

      navigate('/');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-80 mx-auto pt-20">
        <div className="border w-96 bold rounded border-black p-4">
          <h5 className="mb-2 mt-10 text-black font-bold">Name</h5>
          <input ref={nameRef} type="text" className="border-b border-solid border-black outline-none" onChange={(e) => setProductName(e.target.value)} />
          <h5 className="mb-2 font-bold">Category</h5>
          <input ref={categoryRef} type="text" className="border-b border-solid border-black outline-none" onChange={(e) => categoryRef.current.value = e.target.value} />
          <h5 className="mb-2 font-bold">Price</h5>
          <input ref={priceRef} type="number" className="border-b border-solid border-black outline-none" onChange={(e) => priceRef.current.value = e.target.value} />
          <h5 className="mb-2 font-bold">Description</h5>
          <textarea ref={descriptionRef} type="text" className="border-b border-solid border-black outline-none" onChange={(e) => setDescription(e.target.value)} />
          <h5 className="mb-2 font-bold">Location</h5>
          <input ref={productLocationRef} type="text" className="border-b border-solid border-black outline-none" onChange={(e) => setProductLocation(e.target.value)} />
          <h5 className="mb-2 font-bold">Phone</h5> 
          <input type="number" className="border-b border-solid border-black outline-none" onChange={(e) => setPhone(e.target.value)} />
          <img className="my-4 w-20" src={imageRef.current ? URL.createObjectURL(imageRef.current) : ''} alt="" />
          <input onChange={(e) => imageRef.current = e.target.files[0]} type="file" className="mb-4" />
          <button onClick={handleSubmission} className="w-full mb-10 bg-black text-white py-2">Upload and submit</button>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default SellingForm;
