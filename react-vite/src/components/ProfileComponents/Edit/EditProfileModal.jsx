import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkEditUser } from "../../../redux/session";

function EditProfileModal() {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.session.user);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [city, setCity] = useState(user.city);
  const [state, setState] = useState(user.state);
  const [address, setAddress] = useState(user.address);
  const [country, setCountry] = useState(user.country);
  const [profilePic, setProfilePic] = useState(user.profile_pic);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkEditUser({
        'first_name': firstName,
        'last_name': lastName,
        email,
        username,
        city,
        state,
        address,
        country,
        'profile_pic': profilePic,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
        alert('Edits saved!').then(closeModal)
    }
  };

  return (
    <>
      <h1>Edit Account</h1>
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
          {/* <select>
            
          </select> */}
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
        <button 
        type="submit"
        >Save Account Edits</button>
      </form>
    </>
  );
}

export default EditProfileModal;
