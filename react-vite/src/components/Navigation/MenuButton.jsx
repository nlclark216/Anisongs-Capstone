import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosMenu } from "react-icons/io";
import { NavLink } from "react-router-dom";

export default function MenuButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={toggleMenu}>
        <IoIosMenu />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink onClick={closeMenu}>Playlists</NavLink>
            </li>
            <li>
                <NavLink onClick={closeMenu}>Songs</NavLink>
            </li>
            <li>
                <NavLink to='/dashboard'>Dashboard</NavLink>
            </li>
            <li>
                <NavLink>Community</NavLink>
            </li>
        </ul>
      )}
    </>
  );
}

