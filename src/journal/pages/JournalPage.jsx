import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectJournal } from "../../store/journal/journalSlice";
import { startNewNote } from "../../store/journal/thunks";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";

export const JournalPage = () => {

  const dispatch = useDispatch();

  const { isSaving, active } = useSelector(selectJournal);

  const handleAddNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <>
      <JournalLayout>
        {
          active  
            ? <NoteView /> 
            : <NothingSelectedView />
        }
        <IconButton
          disabled={isSaving}
          size="large"
          sx={{
            color: "white",
            backgroundColor: "error.main",
            position: 'fixed',
            right: 50,
            bottom: 50,
            "&:hover": { backgroundColor: "error.main", opacity: 0.9 },
          }}
          onClick={handleAddNewNote}
        >
          <AddOutlined sx={{fontSize: 30}} />
        </IconButton>
      </JournalLayout>
    </>
  );
};
