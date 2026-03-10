/**
 * CONTROLLER — useHomeController.js
 * Handles all interaction logic for the Home / Landing page.
 */

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function useHomeController() {
  const navigate = useNavigate();

  const [hover, setHover]               = useState("");
  const [loginMenu, setLoginMenu]       = useState(false);
  const [registerMenu, setRegisterMenu] = useState(false);

  const loginTimeout    = useRef(null);
  const registerTimeout = useRef(null);

  /* ---- Login dropdown ---- */
  const openLogin = () => {
    clearTimeout(loginTimeout.current);
    setLoginMenu(true);
    setRegisterMenu(false);
  };

  const closeLogin = () => {
    loginTimeout.current = setTimeout(() => setLoginMenu(false), 200);
  };

  /* ---- Register dropdown ---- */
  const openRegister = () => {
    clearTimeout(registerTimeout.current);
    setRegisterMenu(true);
    setLoginMenu(false);
  };

  const closeRegister = () => {
    registerTimeout.current = setTimeout(() => setRegisterMenu(false), 200);
  };

  /* ---- Navigation: pass `tab` state so Login page opens correct tab ---- */
  const goToLogin    = () => navigate("/login", { state: { tab: "login" } });
  const goToRegister = () => navigate("/login", { state: { tab: "register" } });

  return {
    hover, setHover,
    loginMenu, registerMenu,
    openLogin, closeLogin,
    openRegister, closeRegister,
    goToLogin, goToRegister,
  };
}
