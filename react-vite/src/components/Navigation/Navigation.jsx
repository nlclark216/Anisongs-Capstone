import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import MenuButton from "./MenuButton";

function Navigation() {

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
