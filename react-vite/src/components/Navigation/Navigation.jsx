import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import MenuButton from "./MenuButton";

function Navigation() {
  const currentUser = useSelector(state=>state.session.user);

  return (
    <ul>

      <li>
        <MenuButton />
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
