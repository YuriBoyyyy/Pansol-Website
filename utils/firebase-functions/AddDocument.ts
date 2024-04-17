import { addDoc, collection } from "firebase/firestore";
import { db } from "../../app-service/firebase-config";

async function AddDocument(collectionName: string, data: unknown) {
  const collectionRef = collection(db, collectionName);
  await addDoc(collectionRef, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export default AddDocument;
