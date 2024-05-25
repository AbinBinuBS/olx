import { BrowserRouter ,Route,Routes} from "react-router-dom"
import Login from './login'
import Signup from './signup'
import Home from "./homepage/home"
import react,{createContext} from 'react'
import Sell from "./addSellingPage/selling"
import View from "./view/view"

const DataContent = createContext()


const Body = ({userData}) =>{


    return(
        <DataContent.Provider value={userData}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/selling' element={<Sell/>}/>
                <Route path="/view/:productId" element={<View />} />
            </Routes>
        </BrowserRouter>
        </DataContent.Provider>
    )
}
export default Body