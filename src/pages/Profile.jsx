// import React, { useContext, useEffect, useState } from "react";
// import { ChromePicker } from "react-color";
// import { MdOutlineCancel } from "react-icons/md";
// import { getDoc, doc, updateDoc } from "firebase/firestore";
// import {
//   getDownloadURL,
//   ref,
//   uploadBytes,
//   deleteObject,
// } from "firebase/storage";
// import { updateProfile } from "firebase/auth";
// import toast, { Toaster } from "react-hot-toast";
// import { AuthContext } from "../context/AuthContext";
// import { db, storage, auth } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";

// const Profile = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [color, setColor] = useState("#000000");
//   const [aboutMe, setAboutMe] = useState("");
//   const [img, setImg] = useState(null);
//   const navigate = useNavigate();

//   const notify = () =>
//     toast.success("Profile Updated!", {
//       duration: 4000,
//       position: "top-right",
//       ariaProps: {
//         role: "status",
//         "aria-live": "polite",
//       },
//     });

//   const handleColorChange = (newColor) => {
//     setColor(newColor.hex);
//   };

//   const handleChange = (e) => {
//     setAboutMe(e.target.value);
//   };

//   const handleSave = async () => {
//     let url = currentUser.photoURL;
//     if (img) {
//       const imgRef = ref(
//         storage,
//         `avatars/${new Date().getTime()} - ${img.name}`
//       );
//       const snap = await uploadBytes(imgRef, img);
//       url = await getDownloadURL(ref(storage, snap.ref.fullPath));
//     }

//     await updateProfile(auth.currentUser, { photoURL: url })
//       .then(() => console.log("Profile updated!"))
//       .catch((error) => console.log("Error updating profile:", error));

//     await updateDoc(doc(db, "users", currentUser.uid), {
//       photoURL: url,
//       aboutMeColor: color,
//       aboutMe: aboutMe,
//     })
//       .then(() => {
//         console.log("User updated!");
//         notify();
//       })
//       .catch((error) => console.log("Error updating Firestore:", error));
//   };

//   const handleRemoveAvatar = async () => {
//     try {
//       // Get the reference to the current avatar image
//       const avatarRef = ref(storage, currentUser.photoURL);

//       // Delete the image from Firebase Storage
//       await deleteObject(avatarRef);
//       console.log("Avatar removed from storage!");

//       // Update the profile and Firestore document
//       await updateProfile(auth.currentUser, { photoURL: null });
//       console.log("Avatar removed!");

//       await updateDoc(doc(db, "users", currentUser.uid), {
//         photoURL: null,
//       });
//       console.log("User updated!");

//       notify();
//     } catch (error) {
//       console.log("Error removing avatar:", error);
//     }
//   };

//   useEffect(() => {
//     const getUserData = async () => {
//       const docRef = doc(db, "users", currentUser.uid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setUserData(docSnap.data());
//         setColor(docSnap.data().aboutMeColor || "#000000");
//         setAboutMe(docSnap.data().aboutMe || "");
//       } else {
//         console.log("No such document!");
//       }
//     };

//     if (currentUser.uid) {
//       getUserData();
//     }
//   }, [currentUser.uid]);

//   const backtoHome = (e) => {
//     e.preventDefault();
//     navigate("/");
//   };
//   console.log(userData);

//   return (
//     <>
//       <Toaster />
//       <div className="profile-container">
//         <div className="profile-content">
//           <div className="profile-header">
//             <h1>My Account</h1>
//             <span className="cancel-button" onClick={backtoHome}>
//               <MdOutlineCancel size={40} />
//               <span>ESC</span>
//             </span>
//           </div>

//           <div className="profile-body">
//             <div className="profile-preview">
//               <h1>Preview</h1>
//               <div className="preview-content">
//                 {userData?.photoURL && (
//                   <>
//                     <img
//                       className="profile-avatar"
//                       src={currentUser.photoURL}
//                       alt="Avatar"
//                     />
//                   </>
//                 )}
//                 {userData?.photoURL === null && <FaUserCircle size={100} />}

//                 <div className="profile-info">
//                   <h2>Username</h2>
//                   <p>@{currentUser.displayName}</p>
//                   <h2>Email</h2>
//                   <p>{currentUser.email}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="profile-settings">
//               <h2 className="settings-title">Account Settings</h2>
//               <div className="settings-content">
//                 <div className="avatar-change">
//                   <input
//                     type="file"
//                     style={{ display: "none" }}
//                     onChange={(e) => setImg(e.target.files[0])}
//                     id="file"
//                   />
//                   <label htmlFor="file" className="change-avatar">
//                     Change Avatar
//                   </label>
//                   <button
//                     className="remove-avatar"
//                     onClick={handleRemoveAvatar}
//                   >
//                     Remove Avatar
//                   </button>
//                 </div>
//                 <div className="color-picker">
//                   <ChromePicker
//                     color={color}
//                     onChange={handleColorChange}
//                     disableAlpha
//                   />
//                 </div>
//                 <div className="about-me">
//                   <h1>About Me</h1>
//                   <textarea
//                     className="about-me-text"
//                     name="aboutMe"
//                     id="aboutMe"
//                     value={aboutMe}
//                     onChange={handleChange}
//                     cols="40"
//                     rows="8"
//                   ></textarea>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <button onClick={handleSave} className="save-button">
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;

import React, { useContext, useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { MdOutlineCancel } from "react-icons/md";
import { getDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { db, storage, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [color, setColor] = useState("#000000");
  const [aboutMe, setAboutMe] = useState("");
  const [img, setImg] = useState(null);
  const navigate = useNavigate();

  const notify = () =>
    toast.success("Profile Updated!", {
      duration: 4000,
      position: "top-right",
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleChange = (e) => {
    setAboutMe(e.target.value);
  };

  const handleSave = async () => {
    let url = currentUser.photoURL;
    if (img) {
      const imgRef = ref(
        storage,
        `avatars/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      url = await getDownloadURL(ref(storage, snap.ref.fullPath));
    }

    await updateProfile(auth.currentUser, { photoURL: url })
      .then(() => console.log("Profile updated!"))
      .catch((error) => console.log("Error updating profile:", error));

    await updateDoc(doc(db, "users", currentUser.uid), {
      photoURL: url,
      aboutMeColor: color,
      aboutMe: aboutMe,
    })
      .then(() => {
        console.log("User updated!");
        notify();
      })
      .catch((error) => console.log("Error updating Firestore:", error));
  };

  const handleRemoveAvatar = async () => {
    try {
      // Get the reference to the current avatar image
      const avatarRef = ref(storage, currentUser.photoURL);

      // Delete the image from Firebase Storage
      await deleteObject(avatarRef);
      console.log("Avatar removed from storage!");

      // Update the profile and Firestore document
      await updateProfile(auth.currentUser, { photoURL: null });
      console.log("Avatar removed!");

      await updateDoc(doc(db, "users", currentUser.uid), {
        photoURL: null,
      });
      console.log("User updated!");

      notify();
    } catch (error) {
      console.log("Error removing avatar:", error);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          setUserData(doc.data());
          setColor(doc.data().aboutMeColor || "#000000");
          setAboutMe(doc.data().aboutMe || "");
        } else {
          console.log("No such document!");
        }
      });

      return unsubscribe;
    };

    if (currentUser.uid) {
      getUserData();
    }
  }, [currentUser.uid]);

  const backtoHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <>
      <Toaster />
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-header">
            <h1>My Account</h1>
            <span className="cancel-button" onClick={backtoHome}>
              <MdOutlineCancel size={40} />
              <span>ESC</span>
            </span>
          </div>

          <div className="profile-body">
            <div className="profile-preview">
              <h1>Preview</h1>
              <div className="preview-content">
                {userData?.photoURL ? (
                  <img
                    className="profile-avatar"
                    src={currentUser.photoURL}
                    alt="Avatar"
                  />
                ) : (
                  <FaUserCircle size={100} />
                )}

                <div className="profile-info">
                  <h2>Username</h2>
                  <p>@{currentUser.displayName}</p>
                  <h2>Email</h2>
                  <p>{currentUser.email}</p>
                </div>
              </div>
            </div>
            <div className="profile-settings">
              <h2 className="settings-title">Account Settings</h2>
              <div className="settings-content">
                <div className="avatar-change">
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => setImg(e.target.files[0])}
                    id="file"
                  />
                  <label htmlFor="file" className="change-avatar">
                    Change Avatar
                  </label>
                  <button
                    className="remove-avatar"
                    onClick={handleRemoveAvatar}
                  >
                    Remove Avatar
                  </button>
                </div>
                <div className="color-picker">
                  <ChromePicker
                    color={color}
                    onChange={handleColorChange}
                    disableAlpha
                  />
                </div>
                <div className="about-me">
                  <h1>About Me</h1>
                  <textarea
                    className="about-me-text"
                    name="aboutMe"
                    id="aboutMe"
                    value={aboutMe}
                    onChange={handleChange}
                    cols="40"
                    rows="8"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleSave} className="save-button">
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
