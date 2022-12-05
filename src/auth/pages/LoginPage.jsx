import { useMemo } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { checkingAuthentication, getUser, startGoogleSignIn, startLoginWithUserAndPassword } from "../../store/auth";

const initialForm = {
  email: 'jaco@test.com',
  password: '123456'
}

export const LoginPage = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { status, errorMsg } = useSelector(getUser);
  
  const { email, password, onInputChange } = useForm(initialForm);

  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const onSubmit = ( event ) => {
    event.preventDefault();
    dispatch(startLoginWithUserAndPassword(email, password));
  }

  const onGoogleSignIn = () => {
    console.log('ongoolge sign-in');
    dispatch( startGoogleSignIn() );
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Correo"
              type="email"
              name="email"
              onChange={onInputChange}
              value={email}
              placeholder="correo@google.com"
              fullWidth
              sx={{ mt: 1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              name="password"
              onChange={onInputChange}
              value={password}
              placeholder="Password..."
              fullWidth
              sx={{ mt: 1 }}
            />
          </Grid>

          {
            !!errorMsg && (
              <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                <Grid item xs={12} md={12}>
                  <Alert severity="error">{errorMsg}</Alert>
                </Grid>
              </Grid>
            )
          }

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Button 
                disabled={isAuthenticating}
                variant="contained" 
                fullWidth 
                type="submit"
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button 
                disabled={isAuthenticating}
                variant="contained" 
                fullWidth 
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
