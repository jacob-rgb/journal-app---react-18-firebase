import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid = '') => {
    if(!uid) return new Error('El uid del usuario no existe');

    const collectionRef = collection( FirebaseDB, `${uid}/journal/notes` );
    const { _docs } = await getDocs( collectionRef );
    return _docs.map(doc => ({...doc.data(), id: doc.id})) ;
}