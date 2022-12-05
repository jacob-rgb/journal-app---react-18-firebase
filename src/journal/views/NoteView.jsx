import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import moment from "moment";
import 'moment/locale/es' ;
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { selectJournal } from "../../store/journal/journalSlice";
import { ImageGallery } from "../components/ImageGallery";

moment.locale('es');

export const NoteView = () => {

  const { active } = useSelector(selectJournal);
  const { id, title, date, body } = active;

  const { formState, formValidations, isFormValid, onInputChange } = useForm({...active});

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          { moment(date).format('LL')}
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary">
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          name="title"
          value={formState.title}
          onChange={onInputChange}
          variant="filled"
          fullWidth
          placeholder={ title ? title : "Ingresar título"}
          label={"Título"}
          sx={{ border: "none", mb: 1 }}
        />
        <TextField
          type="text"
          name="body"
          value={formState.body}
          variant="filled"
          onChange={onInputChange}
          fullWidth
          multiline
          placeholder={ body ? body : "Ingresar Texto"}
          sx={{ border: "none" }}
          minRows={5}
        />
      </Grid>

      <ImageGallery />
    </Grid>
  );
};
