import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Navbar({setAccess_token}){
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setAccess_token(null);
        localStorage.setItem("logoutToast", "true");
        navigate("/login", {replace : true});
    };

    return(
        <>
        <div className="navbar h-12 flex mx-10 mt-2.5 justify-between px-5 font-bold bg-green-200 rounded-2xl">
            <div className="nav1 flex mt-3 space-x-10">
                <div className="home">< Link to="/home">Home</Link></div>
                <div className="contacts">< Link to="/contacts">Contacts</Link></div>
            </div>
            <div className="nav2 flex mb-2.5 mt-2.5">
                <button onClick={handleLogout} className='bg-green-300 rounded-2xl w-20'>Logout</button>
            </div>
        </div>
        </>
    )
}

export default Navbar