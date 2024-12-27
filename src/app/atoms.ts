// atoms.js
import { atom } from "recoil";

export const userNameAtom = atom({
  key: 'userName', // Unique key
  default: "",
});

export const userDataAtom = atom({
  key: 'userData', // Updated to a unique key
  default: {
    email: "",
    name: "",
    picture: "",
    username: "",
    id: 0,
    createdAt: "",
    updatedAt: "",
  },
});

export const pendingRequestsAtom = atom({
  key: 'pendingRequests',
  default: 0,
});