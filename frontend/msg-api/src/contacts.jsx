import {useState, useEffect} from 'react'
import api from './api'

function Contacts(){
    const [contact, setContact] = useState([]);
    const [name, setName] = useState("");
    const [Mobile_No, setMobile_No] = useState("");
    const [flash, setFlash] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editContact, setEditContact] = useState(null);

    useEffect(() => {
        show_contacts();
    }, []);

    const token = localStorage.getItem("access_token");

    const show_contacts = async ()=>{
        try{
            const res = await api.get("crud/show_contacts", {"headers": { Authorization: `Bearer ${token}`}});
            setContact(res.data);
        }
        catch(err){
            setFlash(res.data.error);
        }
    };

    const add_contact = async (e) =>{
        try{
            e.preventDefault();
            const res = await api.post("crud/add_contact", {"name" : name, "Mobile_No" : Mobile_No,}, {"headers": { Authorization: `Bearer ${token}`}});
            setContact(res.data);
            setName("");
            setMobile_No("");
        }
        catch(err){
            if (err.response && err.response.status === 409) {
                setFlash(err.response.data.error);
            }
            else {
                setFlash("Something went wrong!");
            }
        }
    };

    const start_edit = (c) => {
        setEditContact(c);
        setIsEditing(true);
    };

    const update_contact = async (id) =>{
        try{
            const res = await api.put(`crud/update/${id}`, {"name" : editContact.name, "Mobile_No" : editContact.Mobile_No,}, {"headers": { Authorization: `Bearer ${token}`}});
            setContact(res.data);
            setIsEditing(false);
            setEditContact(null);
            setFlash("Contact updated successfully!");
        }
        catch(err){
            if(err.response && err.response.status == 404){
                setFlash(err.response.data.error);
            }
            else{
                setFlash("Something went wrong!");
            }
        }
    };

    const delete_contact = async (id) =>{
        await api.delete(`crud/delete/${id}`, {"headers": { Authorization: `Bearer ${token}`}});
        show_contacts();
    };

    return(
        <>
        <div className="contacts flex-col gap-5 justify-center w-full h-full">
            <div className="form1">
                {flash && <p style={{color: "red"}}>{flash}</p>}
                <form onSubmit={add_contact} className='contact_form flex gap-4 justify-center mt-10'>
                    <input value={name} placeholder='Enter Name' type='text' onChange={(e) => setName(e.target.value)} required></input>
                    <input value={Mobile_No} placeholder='Enter Mobile No' type='text' onChange={(e) => setMobile_No(e.target.value)} required></input>
                    <button type='submit' className='add bg-blue-400 hover:bg-blue-500 w-12 h-8 rounded-lg'>Add</button>
                </form>
            </div>
            <div className="table1 flex justify-center mt-10 h-full">
                <table className='bg-neutral-200 rounded-lg w-200 border-separate border-spacing-y-3'>
                    <tr>
                        <th>Name</th>
                        <th>Mobile_No</th>
                        <th>Actions</th>
                    </tr>
                    {contact.map((c)=>{
                        return(
                            <>
                            <tr key={c.id} className='contact rounded-2xl mt-5'>
                                <td className='text-center'>{c.name}</td>
                                <td className='text-center'>{c.Mobile_No}</td>
                                <td className='text-center'>
                                    <div className="action flex-row space-x-4 items-center justify-center">
                                        <button className='bg-green-500  hover:bg-green-600 rounded-lg w-18 text-white' onClick={() => start_edit(c)}>Update</button>
                                        <button className='bg-red-500  hover:bg-red-600 rounded-lg w-18 text-white' onClick={() => delete_contact(c.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                            </>
                        )
                    })}
                </table>
            </div>
        </div>
        {isEditing && (
        <div className='modal inset-0 flex items-center justify-center mt-10 z-50'>
            <div className='update_form bg-neutral-200 p-6 rounded-xl shadow-lg w-[400px]'>
                <h3 className='text-lg font-semibold mb-4'>Update Contact</h3>
                <form onSubmit={()=>update_contact(editContact.id)}>
                    <input className='bg-white rounded-lg'
                        type="text"
                        value={editContact.name}
                        onChange={(e) => setEditContact({ ...editContact, name: e.target.value })}
                    />
                    <input className='bg-white rounded-lg mt-2'
                        type="text"
                        value={editContact.Mobile_No}
                        onChange={(e) => setEditContact({ ...editContact, Mobile_No: e.target.value })}
                    />
                    <div className="buttons flex-row space-x-4 items-center justify-center mt-2">
                        <button className='bg-green-500 hover:bg-green-600 rounded-lg w-18 text-white' type="button" onClick={()=>update_contact(editContact.id)}>Update</button>
                        <button className='bg-red-500 hover:bg-red-600 rounded-lg w-18 text-white' type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        )}
        </>
    )
}
export default Contacts;