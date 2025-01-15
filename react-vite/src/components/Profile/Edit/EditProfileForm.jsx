import { useDispatch, useSelector } from 'react-redux';
import { thunkEditUser } from '../../../redux/session';
import { useState } from 'react';
import EditProfileModal from './EditProfileModal';
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';
import './EditProfile.css';

export default function EditProfileForm({currentUser}) {
    const [firstName, setFirstName] = useState(currentUser?.first_name);
    const [lastName, setLastName] = useState(currentUser?.last_name);
    const [email, setEmail] = useState(currentUser?.email);
    const [username, setUsername] = useState(currentUser?.username);
    const [city, setCity] = useState(currentUser?.city);
    const [state, setState] = useState(currentUser?.state);
    const [address, setAddress] = useState(currentUser?.address);
    const [country, setCountry] = useState(currentUser?.country);
    const [profilePic, setProfilePic] = useState(currentUser?.profile_pic);
    const [errors, setErrors] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();
    
      };

    const payload = {
      'first_name': firstName,
      'last_name': lastName,
      email,
      username,
      city,
      state,
      address,
      country,
      'profile_pic': profilePic
    }
    
    

    return (
    <>
    <h3>Edit Account</h3>
    {errors.server && <p>{errors.server}</p>}
    <form onSubmit={handleSubmit}>
    <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        {errors.city && <p>{errors.city}</p>}
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        {errors.state && <p>{errors.state}</p>}
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        {errors.address && <p>{errors.address}</p>}
        <label>
          Country
          {/* <select>

          </select> */}
          <input
            type="select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        {errors.country && <p>{errors.country}</p>}
        <label>
          Profile Picture
          <input
            type="text"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
          />
        </label>
        {errors.profilePic && <p>{errors.profilePic}</p>}
        <button onClick={handleSubmit}>
          <OpenModalMenuItem
          itemText='Save Changes'
          modalComponent={<EditProfileModal payload={payload} />}
          />
        </button>
    </form>
    </>
    )
}
