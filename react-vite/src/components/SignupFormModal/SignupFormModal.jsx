import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        'first_name': firstName,
        'last_name': lastName,
        email,
        username,
        city,
        state,
        address,
        country,
        password
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      alert('Account created!');
      closeModal();
    }
  };

  return (
    <div className="modal" id="sign-up">
      <h1>Sign Up</h1>
      {errors.server && <p className="error">{errors.server}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className="error">{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className="error">{errors.lastName}</p>}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="error">{errors.username}</p>}
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        {errors.city && <p className="error">{errors.city}</p>}
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        {errors.state && <p className="error">{errors.state}</p>}
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        {errors.address && <p className="error">{errors.address}</p>}
        <label>
          Country
          <input
            type="select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        {errors.country && <p className="error">{errors.country}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        <button 
        type="submit"
        disabled={firstName.length < 2 || lastName < 1 || !email.split('').includes('@')}
        >Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
