import {useState, useEffect} from 'react'
import api from './api'
import {useNavigate} from 'react-router-dom'
import bg from "./assets/green.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Toast from './toast'



function Login({setAccess_token}){
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[flash, setFlash] = useState("");
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("logoutToast") === "true") {
            setShowToast(true);
            localStorage.removeItem("logoutToast");
        }
    }, []);

    const handle_login = async (e) =>{
        e.preventDefault();
        try{
            const res = await api.post("auth/login" , {username, password});
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("refresh_token", res.data.refresh_token);
            setAccess_token(res.data.access_token);
            navigate('/home', {state : {showToast : true}})
        }
        catch(err){
            if(err.response && err.response.status == 400){
                setFlash(res.data.message);
            }
            else{
                setFlash("Something went wrong!");
            }
        }
    };

    let show = false;
    const handleShow = ()=>{
        let s = document.querySelector("#show");
        let i2 = document.querySelector("#i2");

        if(show === false){
            i2.setAttribute("type", "text");
            show = true;
        }
        else{
            i2.setAttribute("type", "password");
            show = false;
        }
    };

    return(
        <>
        <div className='bg' 
        style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        }}>
            <div className="container">
                <form onSubmit={handle_login} className='login_form'>
                    <lable className='l1'>Username</lable>
                    <input className='i' type='text' value={username} onChange={(e)=>setUsername(e.target.value)}></input>
                    <lable className='l2'>Password</lable>
                    <div className="pass"><input type='password' id="i2" className='I' value={password} onChange={(e)=>setPassword(e.target.value)}></input><FontAwesomeIcon icon={faEye} id="show" className='mx-1' onClick={handleShow}/></div>
                    <button type='submit' className='login'>Login</button>
                </form>
                {flash && <p style={{color:red}}>{flash}</p>}
            </div>
            <Toast
                message="LogOut Successful!"
                show={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
        </>
    )
}

export default Login;