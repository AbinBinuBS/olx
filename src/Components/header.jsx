import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import OlxLogo from '../assets/OlxLogo';
import Search from '../assets/Search';
import Arrow from '../assets/Arrow';
import SellButton from '../assets/SellButton';
import SellButtonPlus from '../assets/SellButtonPlus';
import { useUserContext } from './userContext';
import '../Header.css';

const Header = () => {
  const { userData, setUserData } = useUserContext();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        setUserData({ uid, email, name: displayName });
      } else {
        setUserData(null);
      }
    });

    return () => unSubscribe();
  }, [auth, setUserData]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      navigate('/error');
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input type="text" placeholder="Find car, mobile phone and more..." />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span>ENGLISH</span>
          <Arrow />
        </div>
        <div className="loginPage">
          {userData ? userData.name : <Link to='/login'>Login</Link>}
          <hr />
        </div>
        <div className="loginPage">
          {userData &&  <Link onClick={handleSignOut}>Logout</Link>}
          <hr />
        </div>
        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <Link to='/selling'>Sell</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
