import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import EditProfileModal from "../Profile/Edit/EditProfileModal";
import DeleteProfileModal from "../Profile/Delete/DeleteProfileModal";
import { Link, useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    alert('Logged Out!')
    closeMenu();
    navigate('/')
  };

  return (
    <>
      <button id="right" onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} id="right" ref={ulRef}>
          {user ? (
            <>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
              <li>
                <button>
                  <OpenModalMenuItem
                  itemText="Edit Account"
                  modalComponent={<EditProfileModal />}
                  />
                </button>
              </li>
              <li>
                <button>
                  <OpenModalMenuItem
                  itemText='Delete Account'
                  modalComponent={<DeleteProfileModal />}
                  />
              </button>
              </li>
              
            </>
          ) : (
            <>
            <Link>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </Link>
            <Link>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </Link> 
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
