import Footer from "../footer"
import Header from "../header"
import SubHeader from "../subHeader"
import List from "./productListing"

const Home = () =>{
    return(
        <div>
            <div>
                <Header/>
            </div>
            <div>
                <SubHeader/>
            </div>
            <div>
                <List/>
            </div>
            <div>
                <Footer/>
            </div>

            
        </div>
    )
}
export default Home