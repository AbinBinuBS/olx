import Arrow from "../assets/Arrow"

const SubHeader = () =>{
    return(
        <div>
            <div className='flex pt-20 '>
                <div className="font-bold px-5">
                    <h1 >ALL CATEGORIES</h1>
                </div>
                <Arrow></Arrow>
                <h5 className="px-5">Cars</h5>
                <h5 className="px-5">Motorcy...</h5>
                <h5 className="px-5">Mobile Ph...</h5>
                <h5 className="px-5">For Sale:Houses & Apart...</h5>
                <h5 className="px-5">Scoot...</h5>
                <h5 className="px-5">Commertial & Other Ve...</h5>
                <h5 className="px-5">For Rent:House & Apart...</h5>
            </div>
            
        </div>
    )
}

export default SubHeader