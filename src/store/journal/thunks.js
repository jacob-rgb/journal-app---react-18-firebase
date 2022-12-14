import { async } from "@firebase/util";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./journalSlice";

export const startNewNote = () => {
    return async(dispatch, getState) => {

        dispatch(savingNewNote());
        // uid
        const { auth: { uid }} = getState();

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const newDoc = doc( collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { auth: { uid }} = getState();

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));

    }
}