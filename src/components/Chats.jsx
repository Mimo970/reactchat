// import { doc, onSnapshot } from "firebase/firestore";
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import { db } from "../firebase";
// import { VscChromeClose } from "react-icons/vsc";

// const Chats = () => {
//   const [chats, setChats] = useState([]);

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

//   return (
//     <div className="chats">
//       {Object.entries(chats)
//         ?.sort((a, b) => b[1].date - a[1].date)
//         .map((chat) => (
//           <div
//             className="userChat"
//             key={chat[0]}
//             onClick={() => handleSelect(chat[1].userInfo)}
//           >
//             <img src={chat[1].userInfo.photoURL} alt="" />
//             <div className="userChatInfo">
//               <span>{chat[1].userInfo.displayName}</span>
//               <p>{chat[1].lastMessage?.text}</p>
//             </div>
//             <div>
//               <VscChromeClose size={20} />
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default Chats;

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
//   const [isHovered, setIsHovered] = useState(false);

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

//   const handleNoUser = (u) => {
//     dispatch({ type: "NO_USER", payload: u });
//   };
//   const handleDelete = async (uid, event) => {
//     // if (event && event.stopPropagation) {
//     event.stopPropagation();
//     // }
//     console.log(event);
//     // let clickedOnData =  data;
//     try {
//       const docRef = doc(db, "userChats", currentUser.uid);
//       console.log(docRef.id);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         const combinedIdToDelete = Object.keys(data).find(
//           (key) => key === isHovered
//         );
//         if (combinedIdToDelete) {
//           await updateDoc(docRef, {
//             [combinedIdToDelete]: deleteField(),
//           });
//         }
//         handleNoUser();
//         // console.log(clickedOnData);
//       }
//     } catch (error) {
//       console.error("Error deleting document: ", error);
//     }
//   };

//   return (
//     <div className="chats">
//       {Object.entries(chats)
//         ?.sort((a, b) => b[1].date - a[1].date)
//         .map((chat) => (
//           <div
//             className="userChat"
//             key={chat[0]}
//             onClick={() => handleSelect(chat[1].userInfo)}
//           >
//             <img src={chat[1].userInfo.photoURL} alt="" />
//             <div className="userChatInfo">
//               <span>{chat[1].userInfo.displayName}</span>
//               <p>{chat[1].lastMessage?.text}</p>
//             </div>
//             <div className="close-icon">
//               <VscChromeClose
//                 size={20}
//                 onClick={(event) => handleDelete(chat?.uid, event)}
//               />
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default Chats;

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
//               <p>{chat.lastMessage?.text}</p>
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
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          [chatId]: deleteField(),
        });
        setChats((prevChats) => {
          const updatedChats = { ...prevChats };
          delete updatedChats[chatId];
          return updatedChats;
        });
        dispatch({ type: "NO_USER" }); // Reset the chat context
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
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
