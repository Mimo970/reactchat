// import React, { useContext } from "react";
// import Messages from "./Messages";
// import Input from "./Input";
// import { ChatContext } from "../context/ChatContext";
// import { BsFillCameraVideoFill } from "react-icons/bs";
// import { MdPersonAddAlt1 } from "react-icons/md";
// import { IoIosMore } from "react-icons/io";

// const Chat = () => {
//   const { data } = useContext(ChatContext);
//   console.log(data);
//   return (
//     <div className="chat">
//       <div className="chatInfo">
//         <div className="chatInfoWrapper">
//           {data.chatId === null ? (
//             <></>
//           ) : (
//             <img className="chatImg" src={data.user?.photoURL} alt="" />
//           )}
//           &nbsp;
//           <strong className="chatInfoName">{data.user?.displayName}</strong>
//         </div>

//         <div className="chatIcons">
//           <BsFillCameraVideoFill size={20} />
//           <MdPersonAddAlt1 size={20} />
//           <IoIosMore size={20} />
//         </div>
//       </div>
//       {data.chatId === null ? (
//         <div className="noChatId"> </div>
//       ) : (
//         <>
//           <Messages />
//           <Input />
//         </>
//       )}
//     </div>
//   );
// };

// export default Chat;

import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { MdPersonAddAlt1 } from "react-icons/md";
import { IoIosMore } from "react-icons/io";

const Chat = () => {
  const { data } = useContext(ChatContext);
  console.log(data);

  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="chatInfoWrapper">
          {data.chatId === null ? (
            <></>
          ) : (
            <>
              <img className="chatImg" src={data.user?.photoURL} alt="" />
              &nbsp;
              <strong className="chatInfoName">{data.user?.displayName}</strong>
            </>
          )}
        </div>

        <div className="chatIcons">
          <BsFillCameraVideoFill size={20} />
          <MdPersonAddAlt1 size={20} />
          <IoIosMore size={20} />
        </div>
      </div>
      {data.chatId === null ? (
        <div className="noChatId">Select a chat to start messaging</div>
      ) : (
        <>
          <Messages />
          <Input />
        </>
      )}
    </div>
  );
};

export default Chat;
