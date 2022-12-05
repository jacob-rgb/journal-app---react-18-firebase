import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";
import { getUser } from "../../store/auth";
import { startEmailAndPasswordSignIn } from "../../store/auth/thunks";
import { AuthLayout } from "../layout/AuthLayout";

const initialForm = {
  email: "jaco@test.com",
  password: "123456",
  displayName: "Jaco_test",
}

const customFormValidations =  {
  email: [ (value) => value.includes('@'), 'El correo debe de incluir una @'],
  password: [ (value) => value.length >= 6, 'El password debe de tener más de 6 letras' ],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio' ]
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const { status, errorMsg } = useSelector(getUser);
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);

  const {formState, formValidations, onInputChange, isFormValid } = useForm(initialForm, customFormValidations);
  const { email, password, displayName } = formState;
  const { emailValid, passwordValid, displayNameValid } = formValidations;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch( startEmailAndPasswordSignIn(email, password, displayName) );
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Nombre copleto"
              type="text"
              placeholder="Nombre completo..."
              name="displayName"
              value={displayName}
              fullWidth
              sx={{ mt: 1 }}
              onChange={onInputChange}
              error={!!displayNameValid}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              placeholder="Email..."
              name="email"
              value={email}
              fullWidth
              sx={{ mt: 1 }}
              onChange={onInputChange}
              error={!!emailValid}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Password..."
              name="password"
              value={password}
              fullWidth
              sx={{ mt: 1 }}
              onChange={onInputChange}
              error={!!passwordValid}
              helperText={passwordValid}
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
            <Grid item xs={12} md={12}>
              <Button disabled={isFormValid || isCheckingAuthentication} type="submit" variant="contained" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
