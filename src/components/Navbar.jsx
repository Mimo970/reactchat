// import React, { useContext, useState } from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import { AuthContext } from "../context/AuthContext";
// import { IoIosSettings } from "react-icons/io";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const handleHamburgerClick = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="navbar">
//       <div className="user">
//         <img src={currentUser.photoURL} alt="" />
//         <span>{currentUser.displayName}</span>
//         <button onClick={() => signOut(auth)}>logout</button>
//         <Link to="/profile">
//           <IoIosSettings size={20} color="gray" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleHamburgerClick = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Reset chat context on logout
    dispatch({ type: "RESET_CHAT" });
    signOut(auth);
  };

  return (
    <div className="navbar">
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={handleLogout}>Logout</button>
        <Link to="/profile">
          <IoIosSettings size={20} color="gray" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
