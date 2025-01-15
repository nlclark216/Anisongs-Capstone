import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  const currentUser = useSelector(state=>state.session.user);

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      {currentUser && <li>
        <NavLink>Playlists</NavLink>
      </li>}

      {currentUser && <li>
        <NavLink>Songs</NavLink>
      </li>}

      {currentUser && <li>
        <NavLink to='/dashboard'>Dashboard</NavLink>
      </li>}

      {currentUser && <li>
        <NavLink>Community</NavLink>
      </li>}

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
