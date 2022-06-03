import { app } from "../Firebase/firebase";
import { getDocs, getFirestore, collection } from "firebase/firestore";

const checkPremium = async (uuid) => {
  const firestore = getFirestore(app);
  const snapshot = await getDocs(
    collection(firestore, "StripeCustomers/" + uuid + "/subscriptions")
  );
  return snapshot.docs[0]?.data().status ? true : false;
};

export default checkPremium;
