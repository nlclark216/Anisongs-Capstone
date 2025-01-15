import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import './DeleteProfile.css';
import { thunkDeleteProfile } from "../../../redux/session";

export default function DeleteProfileModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkDeleteProfile()
        );

        if (serverResponse) {
        return serverResponse;
        } else {
        closeModal();
        }
    }

    return (
        <>
        <div >
            <h1>Delete Account</h1>
        </div>
        <p>Are you sure you want to delete your account?</p>
          <p className='warning'>This action cannot be undone.</p>
        <button type="Submit" onClick={handleSubmit}>Delete Account</button>
        <button 
        onClick={closeModal} 
        >
        No (Go Back)
        </button>
        </>
    )
}