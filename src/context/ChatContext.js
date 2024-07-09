// // import { createContext, useContext, useReducer } from "react";
// // import { AuthContext } from "./AuthContext";

// // export const ChatContext = createContext();

// // export const ChatContextProvider = ({ children }) => {
// //   const { currentUser } = useContext(AuthContext);
// //   const INITIAL_STATE = {
// //     chatId: null,
// //     user: {},
// //   };

// //   const chatReducer = (state, action) => {
// //     switch (action.type) {
// //       case "CHANGE_USER":
// //         return {
// //           user: action.payload,
// //           chatId:
// //             currentUser.uid > action.payload.uid
// //               ? currentUser.uid + action.payload.uid
// //               : action.payload.uid + currentUser.uid,
// //         };
// //       case "NO_USER":
// //         return {
// //           ...state,
// //           chatId: null,
// //           user: {},
// //         };

// //       default:
// //         return state;
// //     }
// //   };

// //   const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

// //   return (
// //     <ChatContext.Provider value={{ data: state, dispatch }}>
// //       {children}
// //     </ChatContext.Provider>
// //   );
// // };
// import { createContext, useContext, useReducer } from "react";
// import { AuthContext } from "./AuthContext";

// export const ChatContext = createContext();

// export const ChatContextProvider = ({ children }) => {
//   const { currentUser } = useContext(AuthContext);
//   const INITIAL_STATE = {
//     chatId: null,
//     user: {},
//   };

//   const chatReducer = (state, action) => {
//     switch (action.type) {
//       case "CHANGE_USER":
//         return {
//           user: action.payload,
//           chatId:
//             currentUser.uid > action.payload.uid
//               ? currentUser.uid + action.payload.uid
//               : action.payload.uid + currentUser.uid,
//         };
//       case "RESET_CHAT":
//         return INITIAL_STATE; // Reset to initial state on logout

//       default:
//         return state;
//     }
//   };

//   const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

//   return (
//     <ChatContext.Provider value={{ data: state, dispatch }}>
//       {children}
//     </ChatContext.Provider>
//   );
// };

import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const INITIAL_STATE = {
    chatId: null,
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      case "RESET_CHAT":
        return INITIAL_STATE; // Reset to initial state on logout
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
