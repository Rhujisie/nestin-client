import { Link} from "react-router-dom";
import NestLogo from '../icon/nest.png'

export default function AddAccomodationNav(){
    return(
        <div className="accomodation-nav">
            <div className='nestin-logo'>
                <Link to='/'>
                    <img src={NestLogo} alt="nest logo" className="nest-logo"/>
                </Link>
                <div className='nestin'>NestIn</div>
            </div>
        </div>
    )
}