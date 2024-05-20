import OlxLogo from '../assets/OlxLogo'
import Search from'../assets/Search'
import Arrow from '../assets/Arrow'
import SellButton from '../assets/SellButton'
import SellButtonPlus from '../assets/SellButtonPlus'
import '../Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged ,signOut } from "firebase/auth";
import { useEffect, useState } from 'react'



const Header = () =>{
  const [userData,setUserData] = useState(null)
  const navigate = useNavigate()
  const auth = getAuth();
  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        const userData = { uid, email, name: displayName };
        setUserData(userData);
      } else {
        setUserData(null);
        
      }
    });
    return ()=>unSubscribe()
  },[])

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/login')
    }).catch((error) => {
        navigate('/error');
    });
};





    return(
        <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {userData ? userData.name   : <Link to='/login'>Login</Link>}
          <hr />
        </div>
        <div>
          {userData && <button onClick={handleSignOut}>Logout</button>}
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
       
    )
}
export default Header