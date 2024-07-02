// import React, { useContext, useState } from "react";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   updateDoc,
//   orderBy,
//   startAt,
//   endAt,
//   setDoc,
//   getDoc,
//   serverTimestamp,
//   doc,
//   writeBatch,
// } from "firebase/firestore";
// import { db } from "../firebase";
// import { AuthContext } from "../context/AuthContext";
// const Search = () => {
//   const [username, setUsername] = useState("");
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(false);
//   const [hovered, setHovered] = useState(false);

//   const { currentUser } = useContext(AuthContext);

//   // const handleSearch = async () => {
//   //   const q = query(
//   //     collection(db, "users"),
//   //     where("displayName", "==", username)
//   //   );

//   //   try {
//   //     const querySnapshot = await getDocs(q);
//   //     querySnapshot.forEach((doc) => {
//   //       setUser(doc.data());
//   //     });
//   //   } catch (err) {
//   //     setErr(true);
//   //   }
//   // };

//   const handleSearch = async () => {
//     const q = query(
//       collection(db, "users"),
//       orderBy("displayName"),
//       startAt(username.toLowerCase()),
//       endAt(username.toLowerCase() + "\uf8ff")
//     );

//     try {
//       const querySnapshot = await getDocs(q);
//       // console.log(`Number of documents returned: ${querySnapshot.size}`);

//       const users = [];
//       querySnapshot.forEach((doc) => {
//         users.push(doc.data());
//         // console.log(doc.id, " => ", doc.data());
//       });
//       setUser(users);
//     } catch (errror) {
//       console.log(error);
//       setError(true);
//     }

//     // setUser(null);
//     setUsername("");
//   };

//   const handleKey = (e) => {
//     e.code === "Enter" && handleSearch();
//   };

//   // const handleSelect = async () => {
//   //   //check whether the group(chats in firestore) exists, if not create
//   //   const combinedId =
//   //     currentUser.uid > user.uid
//   //       ? currentUser.uid + user.uid
//   //       : user.uid + currentUser.uid;
//   //   try {
//   //     const res = await getDoc(doc(db, "chats", combinedId));

//   //     if (!res.exists()) {
//   //       //create a chat in chats collection
//   //       await setDoc(doc(db, "chats", combinedId), { messages: [] });

//   //       //create user chats
//   //       await updateDoc(doc(db, "userChats", currentUser.uid), {
//   //         [combinedId + ".userInfo"]: {
//   //           uid: user.uid,
//   //           displayName: user.displayName,
//   //           photoURL: user.photoURL,
//   //         },
//   //         [combinedId + ".date"]: serverTimestamp(),
//   //       });

//   //       await updateDoc(doc(db, "userChats", user.uid), {
//   //         [combinedId + ".userInfo"]: {
//   //           uid: currentUser.uid,
//   //           displayName: currentUser.displayName,
//   //           photoURL: currentUser.photoURL,
//   //         },
//   //         [combinedId + ".date"]: serverTimestamp(),
//   //       });
//   //     }
//   //   } catch (err) {}

//   //   setUser(null);
//   //   setUsername("");
//   // };
//   const handleSelect = async () => {
//     // Check whether the group (chats in Firestore) exists, if not create
//     const combinedId =
//       currentUser.uid > hovered.uid
//         ? currentUser.uid + hovered.uid
//         : hovered.uid + currentUser.uid;

//     // console.log(user.uid);

//     try {
//       const res = await getDoc(doc(db, "chats", combinedId));
//       const selectedUserChatsRef = doc(db, "userChats", currentUser.uid);
//       const selectedUserChatsDoc = await getDoc(selectedUserChatsRef);

//       const chatInfo = selectedUserChatsDoc.data()[hovered.uid];
//       // console.log(chatInfo);

//       const currentUserChatsRef = doc(db, "userChats", currentUser.uid);

//       // if (chatInfo) {
//       //   // Access the chat information for the selected user
//       //   const selectedUserChatDate = chatInfo.date;
//       //   const selectedUserChatUserInfo = chatInfo.userInfo;
//       // } else {
//       //   // Chat information for selected user not found
//       //   console.log("Chat information for selected user not found");
//       // }

//       if (!chatInfo) {
//         await setDoc(
//           currentUserChatsRef,
//           {
//             [combinedId]: {
//               userInfo: {
//                 uid: hovered.uid,
//                 displayName: hovered.displayName,
//                 photoURL: hovered.photoURL,
//                 aboutMe: hovered.aboutMe || "",
//                 aboutMeColor: hovered.aboutMeColor || "",
//                 note: hovered.note || "",
//               },
//               date: serverTimestamp(),
//             },
//           },
//           { merge: true }
//         );
//       }

//       if (!res.exists()) {
//         // Create a chat in chats collection
//         await setDoc(doc(db, "chats", combinedId), { messages: [] });

//         // Add user info to userChats collection for current user

//         const currentUserChatsDoc = await getDoc(currentUserChatsRef);

//         if (currentUserChatsDoc.exists()) {
//           // If userChats document for current user already exists, update it
//           const batch = writeBatch(db);
//           batch.update(currentUserChatsRef, {
//             [combinedId + ".userInfo"]: {
//               uid: hovered.uid,
//               displayName: hovered.displayName,
//               photoURL: hovered.photoURL,
//               aboutMe: hovered.aboutMe || "",
//               aboutMeColor: hovered.aboutMeColor || "",
//               note: hovered.note || "",
//             },
//             [combinedId + ".date"]: serverTimestamp(),
//           });
//           await batch.commit();
//         } else {
//           // If userChats document for current user does not exist, create it
//           await setDoc(
//             currentUserChatsRef,
//             {
//               [combinedId]: {
//                 userInfo: {
//                   uid: hovered.uid,
//                   displayName: hovered.displayName,
//                   photoURL: hovered.photoURL,
//                   aboutMe: hovered.aboutMe || "",
//                   aboutMeColor: hovered.aboutMeColor || "",
//                   note: hovered.note || "",
//                 },
//                 date: serverTimestamp(),
//               },
//             },
//             { merge: true }
//           );
//         }

//         // Add user info to userChats collection for selected user
//         const userChatsRef = doc(db, "userChats", hovered.uid);
//         const userChatsDoc = await getDoc(userChatsRef);

//         if (userChatsDoc.exists()) {
//           // If userChats document for selected user already exists, update it
//           const batch = writeBatch(db);
//           batch.update(userChatsRef, {
//             [combinedId + ".userInfo"]: {
//               uid: currentUser.uid,
//               displayName: currentUser.displayName,
//               photoURL: currentUser.photoURL,
//               aboutMe: currentUser.aboutMe || "",
//               aboutMeColor: currentUser.aboutMeColor || "",
//               note: currentUser.note || "",
//             },
//             [combinedId + ".date"]: serverTimestamp(),
//           });
//           await batch.commit();
//         } else {
//           // If userChats document for selected user does not exist, create it
//           await setDoc(
//             userChatsRef,
//             {
//               [combinedId]: {
//                 userInfo: {
//                   uid: currentUser.uid,
//                   displayName: currentUser.displayName,
//                   photoURL: currentUser.photoURL,
//                   aboutMe: currentUser.aboutMe || "",
//                   aboutMeColor: currentUser.aboutMeColor || "",
//                   note: currentUser.note || "",
//                 },
//                 date: serverTimestamp(),
//               },
//             },
//             { merge: true }
//           );
//         }
//       }
//     } catch (err) {
//       console.log(err);
//     }

//     // setUser(null);
//     setUsername("");
//   };

//   return (
//     <div className="search">
//       <div className="searchForm">
//         <input
//           type="text"
//           placeholder="Find a user"
//           onKeyDown={handleKey}
//           onChange={(e) => setUsername(e.target.value)}
//           value={username}
//         />
//       </div>
//       {error && <span>User not found!</span>}
//       {user && (
//         <div className="userChat" onClick={handleSelect}>
//           <img src={user.photoURL} alt="" />
//           <div className="userChatInfo">
//             <span>{user.displayName}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;

import React, { useContext, useState } from "react";
import {
  collection,
  query,
  orderBy,
  startAt,
  endAt,
  getDocs,
  setDoc,
  getDoc,
  serverTimestamp,
  doc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [hovered, setHovered] = useState(null);

  const { currentUser } = useContext(AuthContext);

  // const handleSearch = async () => {
  //   const q = query(
  //     collection(db, "users"),
  //     orderBy("displayName"),
  //     startAt(username.toLowerCase()),
  //     endAt(username.toLowerCase() + "\uf8ff")
  //   );

  //   try {
  //     const querySnapshot = await getDocs(q);
  //     const users = [];
  //     querySnapshot.forEach((doc) => {
  //       users.push(doc.data());
  //     });
  //     setUsers(users);
  //     setError(false);
  //   } catch (err) {
  //     console.log(err);
  //     setError(true);
  //   }
  //   setUsername("");
  // };

  // const handleSelect = async (user) => {
  //   const combinedId =
  //     currentUser.uid > user.uid
  //       ? currentUser.uid + user.uid
  //       : user.uid + currentUser.uid;

  //   try {
  //     const res = await getDoc(doc(db, "chats", combinedId));
  //     const currentUserChatsRef = doc(db, "userChats", currentUser.uid);

  //     if (!res.exists()) {
  //       await setDoc(doc(db, "chats", combinedId), { messages: [] });
  //     }

  //     const batch = writeBatch(db);

  //     const currentUserChatData = {
  //       [combinedId]: {
  //         userInfo: {
  //           uid: user.uid,
  //           displayName: user.displayName,
  //           photoURL: user.photoURL,
  //           aboutMe: user.aboutMe || "",
  //           aboutMeColor: user.aboutMeColor || "",
  //           note: user.note || "",
  //         },
  //         date: serverTimestamp(),
  //       },
  //     };
  //     batch.set(currentUserChatsRef, currentUserChatData, { merge: true });

  //     const userChatsRef = doc(db, "userChats", user.uid);
  //     const userChatData = {
  //       [combinedId]: {
  //         userInfo: {
  //           uid: currentUser.uid,
  //           displayName: currentUser.displayName,
  //           photoURL: currentUser.photoURL,
  //           aboutMe: currentUser.aboutMe || "",
  //           aboutMeColor: currentUser.aboutMeColor || "",
  //           note: currentUser.note || "",
  //         },
  //         date: serverTimestamp(),
  //       },
  //     };
  //     batch.set(userChatsRef, userChatData, { merge: true });

  //     await batch.commit();
  //     setUsers([]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      orderBy("displayName"),
      startAt(username.toLowerCase()),
      endAt(username.toLowerCase() + "\uf8ff")
    );

    try {
      const querySnapshot = await getDocs(q);
      const users = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.uid !== currentUser.uid) {
          users.push(userData);
        }
      });
      setUsers(users);
      setError(false);
    } catch (err) {
      console.log(err);
      setError(true);
    }
    setUsername("");
  };

  const handleSelect = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      const currentUserChatsRef = doc(db, "userChats", currentUser.uid);

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }

      const batch = writeBatch(db);

      const currentUserChatData = {
        [combinedId]: {
          userInfo: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            aboutMe: user.aboutMe || "",
            aboutMeColor: user.aboutMeColor || "",
            note: user.note || "",
          },
          date: serverTimestamp(),
        },
      };
      batch.set(currentUserChatsRef, currentUserChatData, { merge: true });

      const userChatsRef = doc(db, "userChats", user.uid);
      const userChatData = {
        [combinedId]: {
          userInfo: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            aboutMe: currentUser.aboutMe || "",
            aboutMeColor: currentUser.aboutMeColor || "",
            note: currentUser.note || "",
          },
          date: serverTimestamp(),
        },
      };
      batch.set(userChatsRef, userChatData, { merge: true });

      await batch.commit();
      setUsers([]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        {/* <button onClick={handleSearch}>Search</button> */}
      </div>
      {error && <span>User not found!</span>}
      {users.map((user) => (
        <div
          key={user.uid}
          className="userChat"
          onMouseEnter={() => setHovered(user)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleSelect(user)}
        >
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
