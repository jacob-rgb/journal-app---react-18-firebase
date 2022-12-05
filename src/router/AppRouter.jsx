import React from "react";
import {  useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthRouter } from "../auth/routes/AuthRouter";
import { useCheckout } from "../hooks";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { getUser } from "../store/auth";
import { CheckingAuthComponent } from "../ui/components/CheckingAuthComponent";

export const AppRouter = () => {

  const { status } =  useCheckout();

  if(status === 'checking') {
    return (<CheckingAuthComponent />)
  }
  
  return (
    <BrowserRouter>
      <Routes>
        {
          status === 'authenticated'
          ?  <Route path="/*" element={<JournalRoutes />} />
          :  <Route path="/auth/*" element={<AuthRouter />} />
        }
        <Route path="/*" element={<Navigate to={'auth/login'} />} />
      </Routes>
    </BrowserRouter>
  );
};
