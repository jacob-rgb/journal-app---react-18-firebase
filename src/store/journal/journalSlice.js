import { createSlice } from '@reduxjs/toolkit' 

const initialState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addNewEmptyNote: (state, {payload}) => {
      state.notes.push(payload);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
      state.active = payload;
    },
    savingNewNote: (state, {payload}) => {
      state.isSaving = true;
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setSaving: (state) => {

    },
    updateNote: (state, { payload }) => {

    },
    deleteNoteById: (state, { payload }) => {

    },
  },
});

export const { 
  addNewEmptyNote, 
  avingNewNote ,
  deleteNoteById, 
  savingNewNote,
  setActiveNote, 
  setNotes, 
  setSaving, 
  updateNote, 
} = journalSlice.actions;

export const selectJournal = (state) => state.journal;