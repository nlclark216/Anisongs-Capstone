import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosMenu } from "react-icons/io";
import { NavLink } from "react-router-dom";

export default function MenuButton() {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
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
                <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            </li>
            <li>
                <NavLink to='/playlists' onClick={closeMenu}>Playlists</NavLink>
            </li>
            <li>
                <NavLink to='/songs' onClick={closeMenu}>Songs</NavLink>
            </li>
            <li>
                <NavLink onClick={closeMenu}>Community</NavLink>
            </li>
        </ul>
      )}
    </>
  );
}

