import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Bio from "../components/Bio";
const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
        <Bio />
      </div>
    </div>
  );
};

export default Home;
// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import Chat from "../components/Chat";

// const Home = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className={`home ${isSidebarOpen ? "sidebar-open" : ""}`}>
//       <div className="container">
//         {isSidebarOpen && <Sidebar />}
//         <Chat />
//       </div>
//     </div>
//   );
// };

// export default Home;
