/**
 * CONTROLLER — useRegisterController.js
 * Handles state and logic only for the Register page.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser, submitAuth } from "../models/UserModel";

export function useRegisterController() {
  const navigate = useNavigate();

  const [fields, setFields]   = useState({ firstName: "", email: "", password: "", confirm: "" });
  const [errors, setErrors]   = useState({});
  const [showP, setShowP]     = useState(false);
  const [showC, setShowC]     = useState(false);
  const [agreed, setAgreed]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFieldChange = (key) => (e) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleAgreeChange = (e) => {
    setAgreed(e.target.checked);
    setErrors((prev) => ({ ...prev, terms: "" }));
  };

  const handleSubmit = async () => {
    const errs = validateUser("register", fields, agreed);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await submitAuth("register", fields);
    setLoading(false);
    setSuccess(true);
  };

  const goToLogin = () => navigate("/login");
  const goHome    = () => navigate("/");

  return {
    fields, errors, showP, showC, agreed, loading, success,
    setShowP, setShowC,
    handleFieldChange,
    handleAgreeChange,
    handleSubmit,
    goToLogin,
    goHome,
  };
}
