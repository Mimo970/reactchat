// import { ChatContext } from "../context/ChatContext";
// import React, { useContext, useEffect, useState } from "react";
// import { app, db } from "../firebase"; // import the 'app' instance from your firebase.js file
// import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
// import { async } from "@firebase/util";
// import { AuthContext } from "../context/AuthContext";

// const Bio = () => {
//   const { data } = useContext(ChatContext);
//   const [aboutMeColor, setAboutMeColor] = useState("");
//   const [aboutMe, setAboutMe] = useState("");
//   const [note, setNote] = useState(data.user?.note || "");

//   const { currentUser } = useContext(AuthContext);

//   const findBio = async (data) => {
//     if (data.user?.uid) {
//       const docRef = doc(db, "users", data.user.uid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setAboutMe(docSnap.data());
//         setAboutMeColor(docSnap.data().aboutMeColor);
//         // setNote(docSnap.data().note);
//         // console.log(note);
//       } else {
//         console.log("No such document!");
//       }
//     }
//   };

//   const handleNoteChange = async (event) => {
//     setNote(event.target.value);
//     const combinedId =
//       currentUser.uid > data.user.uid
//         ? currentUser.uid + data.user.uid
//         : data.user.uid + currentUser.uid;

//     const currentUserChatsRef = doc(db, "userChats", currentUser.uid);

//     await updateDoc(currentUserChatsRef, {
//       [combinedId + ".userInfo.note"]: note,
//       // [combinedId + ".userInfo"]: { note: note },
//     });
//     console.log(note);
//   };

//   useEffect(() => {
//     findBio(data);
//   }, [data]);
//   // data.INITIAL_STATE && console.log(data.INITIAL_STATE.chatId);
//   // console.log(data.user.note);
//   return (
//     <>
//       <div
//         className={`    md:col-span-8  lg:col-span-3 flex flex-col h-screen primary-darker  `}
//       >
//         {data.chatId === "null" ||
//         (data.INITIAL_STATE && data.INITIAL_STATE.chatId === "null") ? (
//           <div className="p-5">
//             <h1 className="font-bold text-2xl">No Bio Currently Active</h1>
//             <div className="flex flex-col items-center m-2">
//               <h1 className="text-lg font-semibold	">It's quiet for now...</h1>
//               <div>
//                 when you are texting a friend we'll show their bio here!
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div>
//             <div
//               className="py-10"
//               style={{ backgroundColor: ` ${aboutMeColor}` }}
//             />
//             {/* <div className={` bg-[${aboutMeColor}] py-10 `}> </div> */}
//             <div className=" ">
//               <img
//                 className="rounded-full w-24 h-24 object-center mx-4 bioimg"
//                 src={aboutMe.photoURL}
//                 alt=""
//               />
//             </div>
//             <div className="flex flex-col items-start m-5 p-4 mt-14 bg-zinc-900 rounded-lg">
//               {data.user ? (
//                 <div className="border-b border-b-neutral-500 pb-3 w-full">
//                   {data.user.displayName}
//                 </div>
//               ) : (
//                 <div></div>
//               )}

//               <div className=" rounded-lg shadow-md">
//                 <h2 className="text-lg  font-medium mb-4">About Me</h2>
//                 <p className={`text-${aboutMeColor} mb-4`}>{aboutMe.aboutMe}</p>

//                 <div className="border-b border-b-neutral-500  ">
//                   <div>Member Since</div>
//                   <div className="text-zinc-400 pb-1.5">Sep 14, 2022</div>
//                 </div>
//                 <div>
//                   <div>
//                     <h1 className="py-1">Note</h1>
//                     <div>
//                       <textarea
//                         className="outline-none border-transparent bg-transparent p-0 resize-none w-full"
//                         placeholder="Click to add a note"
//                         name=""
//                         id=""
//                         cols="60"
//                         rows="5"
//                         value={note}
//                         onChange={(event) => handleNoteChange(event)}
//                       ></textarea>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Bio;

import { ChatContext } from "../context/ChatContext";
import React, { useContext, useEffect, useState } from "react";
import { app, db } from "../firebase"; // import the 'app' instance from your firebase.js file
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const Bio = () => {
  const { data } = useContext(ChatContext);
  const [aboutMeColor, setAboutMeColor] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [note, setNote] = useState(data.user?.note || "");

  const { currentUser } = useContext(AuthContext);

  const findBio = async (data) => {
    if (data.user?.uid) {
      const docRef = doc(db, "users", data.user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAboutMe(docSnap.data());
        setAboutMeColor(docSnap.data().aboutMeColor);
      } else {
        console.log("No such document!");
      }
    }
  };

  const handleNoteChange = async (event) => {
    setNote(event.target.value);
    const combinedId =
      currentUser.uid > data.user.uid
        ? currentUser.uid + data.user.uid
        : data.user.uid + currentUser.uid;

    const currentUserChatsRef = doc(db, "userChats", currentUser.uid);

    await updateDoc(currentUserChatsRef, {
      [combinedId + ".userInfo.note"]: note,
    });
    console.log(note);
  };

  // console.log(data);

  useEffect(() => {
    findBio(data);
  }, [data]);

  return (
    <div className="bio-container">
      {data.chatId === null ? (
        <div className="no-bio">
          <h1 className="no-bio-title">No Bio Currently Active</h1>
          <div className="no-bio-content">
            <h1 className="quiet-title">It's quiet for now...</h1>
            <div>when you are texting a friend we'll show their bio here!</div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="bio-header"
            style={{ backgroundColor: aboutMeColor }}
          />
          <div className="bio-image-container">
            <img className="bio-image" src={aboutMe.photoURL} alt="" />
          </div>
          <div className="bio-details">
            {data.user ? (
              <div className="bio-username">{data.user.displayName}</div>
            ) : (
              <div></div>
            )}

            <div className="bio-about">
              <h2 className="about-title">About Me</h2>
              <p className="about-content">{aboutMe.aboutMe}</p>

              <div className="bio-member-since">
                <div>Member Since</div>
                <div className="member-date">Sep 14, 2022</div>
              </div>
              <div>
                <div>
                  <h1 className="note-title">Note</h1>
                  <div>
                    <textarea
                      className="note-textarea"
                      placeholder="Click to add a note"
                      name=""
                      id=""
                      cols="60"
                      rows="5"
                      value={note}
                      onChange={handleNoteChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bio;
