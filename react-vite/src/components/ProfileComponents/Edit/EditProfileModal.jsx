// import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import './EditProfile.css';
import { thunkEditUser } from "../../../redux/session";

export default function EditProfileModal({ payload }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const serverResponse = await dispatch(
          thunkEditUser(payload)
        );
    
        if (serverResponse) {
          return serverResponse;
        } else {
          closeModal();
        }
      };

    return(
        <>
        <div >
            <h1>Edit User Info</h1>
        </div>
        <p>Save all changes?</p>
        <button type="Submit" onClick={handleSubmit}>Save Edit</button>
        <button 
        onClick={closeModal} 
        >
        No (Go Back)
        </button>
        </>
    )
}