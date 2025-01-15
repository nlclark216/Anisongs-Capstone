import { useDispatch, useSelector } from 'react-redux';
import './DashboardPage.css';
import { useNavigate } from 'react-router-dom';
import { LuDot } from "react-icons/lu";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import EditProfileModal from '../ProfileComponents/Edit/EditProfileModal';
import DeleteProfileModal from '../ProfileComponents/Delete/DeleteProfileModal';
import EditProfileForm from '../ProfileComponents/Edit/EditProfileForm';

export default function DashboardPage() {
    // const [activeComponent, setActiveComponent] = useState('edit')
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const currentUser = useSelector(state=>state.session.user);

    if(!currentUser) navigate('/');


    const handleEdit = (e) => {
        e.preventDefault();
    }

    const handleDelete = (e) => {
        e.preventDefault();
    }

    return (
        <>
        <h1>{currentUser.username}&apos;s Page</h1>
        <EditProfileForm currentUser={currentUser} />
        <div>
             <button onClick={handleEdit}>
                <OpenModalMenuItem
                itemText='Delete Account'
                modalComponent={<DeleteProfileModal />}
                />
             </button>
        </div>
        </>
    
    )

}