import { app } from "../Firebase/firebase";
import { getAuth } from "firebase/auth";

const isPremium = () => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  return user;
};

export default isPremium;
