import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import './DeleteProfile.css';
import { thunkDeleteProfile } from "../../../redux/session";
import { useNavigate } from "react-router-dom";

export default function DeleteProfileModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkDeleteProfile()
        );

        if (serverResponse) {
        return serverResponse;
        } else {
        alert('Account Deleted! Sorry to see you go!');
        navigate('/');
        closeModal();
        }
    }

    return (
        <>
        <div className="modal" id="delete-account">
        <h1>Delete Account</h1>
       
        <p>Are you sure you want to delete your account?</p>
        <p className='warning'>This action cannot be undone.</p>
        <button type="Submit" onClick={handleSubmit}>Delete Account</button>
        <button
        id="reverse" 
        onClick={ closeModal } 
        >
        No (Go Back)
        </button> 
        </div>
        </>
    )
}