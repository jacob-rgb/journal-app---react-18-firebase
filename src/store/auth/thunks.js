import { async } from "@firebase/util";
import { FirebaseAuth } from "../../firebase/config";
import { loginWithEmailAndPassword, signInWithEmail_Password, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch( checkingCredentials() );
    }
}

export const  startGoogleSignIn =  () => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        if(!result.ok) return dispatch( logout(result.errorMessage) );

        dispatch(login(result))
    }
}

export const startEmailAndPasswordSignIn = (email, password, displayName )=> {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const result = await signInWithEmail_Password(email, password, displayName);
        if(!result.ok) return dispatch( logout(result.errorMessage) );

        dispatch(login(result))
    }
}

export const startLoginWithUserAndPassword = (email, password )=> {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const result = await loginWithEmailAndPassword(email, password);
        if(!result.ok) return dispatch( logout(result.errorMessage) );

        dispatch(login(result))
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await FirebaseAuth.signOut();
        dispatch(logout())
    }
}