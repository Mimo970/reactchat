// import {
//   deleteField,
//   doc,
//   getDoc,
//   onSnapshot,
//   updateDoc,
// } from "firebase/firestore";
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import { db } from "../firebase";
// import { VscChromeClose } from "react-icons/vsc";

// const Chats = () => {
//   const [chats, setChats] = useState([]);
//   const [hoveredChatId, setHoveredChatId] = useState(null);

//   const { currentUser } = useContext(AuthContext);
//   const { dispatch } = useContext(ChatContext);

//   useEffect(() => {
//     const getChats = () => {
//       const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
//         setChats(doc.data());
//       });

//       return () => {
//         unsub();
//       };
//     };

//     currentUser.uid && getChats();
//   }, [currentUser.uid]);

//   const handleSelect = (u) => {
//     dispatch({ type: "CHANGE_USER", payload: u });
//   };

//   const handleDelete = async (chatId, event) => {
//     event.stopPropagation();
//     try {
//       const docRef = doc(db, "userChats", currentUser.uid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         await updateDoc(docRef, {
//           [chatId]: deleteField(),
//         });
//         setChats((prevChats) => {
//           const updatedChats = { ...prevChats };
//           delete updatedChats[chatId];
//           return updatedChats;
//         });
//         dispatch({ type: "NO_USER" }); // Reset the chat context
//       }
//     } catch (error) {
//       console.error("Error deleting document: ", error);
//     }
//   };

//   return (
//     <div className="chats">
//       {Object.entries(chats)
//         ?.sort((a, b) => b[1].date - a[1].date)
//         .map(([chatId, chat]) => (
//           <div
//             className="userChat"
//             key={chatId}
//             onClick={() => handleSelect(chat.userInfo)}
//             onMouseEnter={() => setHoveredChatId(chatId)}
//             onMouseLeave={() => setHoveredChatId(null)}
//           >
//             <img src={chat.userInfo.photoURL} alt="" />
//             <div className="userChatInfo">
//               <span>{chat.userInfo.displayName}</span>
//               <p className="lastMessage">{chat.lastMessage?.text}</p>
//             </div>
//             {hoveredChatId === chatId && (
//               <div className="close-icon">
//                 <VscChromeClose
//                   size={20}
//                   onClick={(event) => handleDelete(chatId, event)}
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//     </div>
//   );
// };

// export default Chats;

import {
  deleteField,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { VscChromeClose } from "react-icons/vsc";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [hoveredChatId, setHoveredChatId] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const handleDelete = async (chatId, event) => {
    event.stopPropagation();
    try {
      const docRef = doc(db, "userChats", currentUser.uid);
      await updateDoc(docRef, {
        [chatId]: deleteField(),
      });
      // Optionally handle the UI update after deletion
    } catch (error) {
      console.error("Error deleting chat: ", error);
    }
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map(([chatId, chat]) => (
          <div
            className="userChat"
            key={chatId}
            onClick={() => handleSelect(chat.userInfo)}
            onMouseEnter={() => setHoveredChatId(chatId)}
            onMouseLeave={() => setHoveredChatId(null)}
          >
            <img src={chat.userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat.userInfo.displayName}</span>
              <p>{chat.lastMessage?.text}</p>
            </div>
            {hoveredChatId === chatId && (
              <div className="close-icon">
                <VscChromeClose
                  size={20}
                  onClick={(event) => handleDelete(chatId, event)}
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Chats;
