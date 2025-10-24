import { useState, useEffect} from 'react'
import api from './api'
import Toast from './toast'
import { useLocation } from 'react-router-dom'

function Home(){
    const [type, setType] = useState("text");
    const [message, setMsg] = useState("");
    const [file, setFile] = useState(null);
    const location = useLocation();
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (location.state?.showToast) {
        setShowToast(true);
        }
    }, [location.state]);

    const token = localStorage.getItem("access_token");

    const sendMessage = async () =>{
        try{
            const formData = new FormData();
            formData.append("type", type);
            formData.append("message", message);
            if(file) formData.append("file", file);
            
            await api.post("msg/send_message", formData, {"headers": { Authorization: `Bearer ${token}`}});
            setType("text");
            setMsg("");
            setFile(null);
        }
        catch(err){
            console.error("Error sending message:", err.response?.data || err.message);
        }
        
    };

    return(
        <>
        <div className="body h-full w-full flex justify-center items-center ">
            <div className="container1 mt-5 w-full flex-row  bg-amber-200 rounded-xl p-10 mx-10">
                <h2 className="text-3xl font-bold ">Send Messages</h2>
                <div className="select mt-2">
                <select value={type} onChange={(e)=>setType(e.target.value)}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                </select>
                </div>
                <div className="textarea mt-2">
                    {type == "text" ? (
                        <textarea className='textarea1 bg-white rounded-lg'
                        placeholder="Type your message here" value={message} onChange={(e)=>setMsg(e.target.value)}></textarea>
                    ): (
                        <>
                            <div className="in flex gap-5">
                                <input className='file bg-white rounded-lg w-50 p-2' type="file" accept={type + "/*"} onChange={(e)=>{setFile(e.target.files[0])}}></input>
                                <input className='caption bg-white rounded-lg w-30' type="text" placeholder="Caption" value={message} onChange={(e)=>setMsg(e.target.value)}></input>
                            </div>     
                        </>
                    )}
                </div>
                <div className="send flex justify-center mt-15">
                    <button className='bg-green-600 w-20 rounded-2xl text-white' onClick={sendMessage}>Send</button>
                </div>
            </div>
            <Toast
                message="Login Successful!"
                show={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
        </>
    )
}

export default Home;