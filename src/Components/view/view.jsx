import Footer from "../footer"
import Header from "../header"
import SubHeader from "../subHeader"
import Listing from "./Listing"

const View = () =>{
    return(
        <div>
            <div>
                <Header/>
            </div>
            <div>
                <SubHeader/>
            </div>
            <div >
                <Listing/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}
export default View