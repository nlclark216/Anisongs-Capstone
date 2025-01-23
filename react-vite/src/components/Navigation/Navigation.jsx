import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import MenuButton from "./MenuButton";

function Navigation() {

  return (
    <ul className="nav" id="page">
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
