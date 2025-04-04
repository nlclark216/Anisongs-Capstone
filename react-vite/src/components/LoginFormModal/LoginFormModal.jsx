import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  
  const loginDemo = async () => {
    return await dispatch(thunkLogin({email:"demo@aa.io", password:"password" }))
    .then(alert('Demo User successfully logged in')).then(closeModal)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      alert('Welcome Back!');
      closeModal();
    }
  };

  

  return (
    <div className="modal" id="login">
      <h1>Log In</h1>
      <form className="modal-form" id="login" onSubmit={handleSubmit}>
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
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <button type="submit">Log In</button>
      </form>
      <button id="reverse" onClick={loginDemo}>Demo User</button>
    </div>
  );
}

export default LoginFormModal;
