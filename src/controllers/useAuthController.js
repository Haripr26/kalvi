/**
 * CONTROLLER — useAuthController.js
 * Custom hook that connects the Model logic to the View.
 * Owns all state and event handlers; View only calls these.
 */

import { useState, useEffect } from "react";
import { defaultUserFields, validateUser, submitAuth } from "../models/UserModel";

export function useAuthController(initialMode = "login") {
  const [mode, setMode]       = useState(initialMode);   // "login" | "register"
  const [fields, setFields]   = useState(defaultUserFields);
  const [errors, setErrors]   = useState({});
  const [showP, setShowP]     = useState(false);
  const [showC, setShowC]     = useState(false);
  const [agreed, setAgreed]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Reset form whenever the mode tab switches
  useEffect(() => {
    setErrors({});
    setSuccess(false);
    setAgreed(false);
    setFields(defaultUserFields);
  }, [mode]);

  /** Update a single field and clear its error */
  const handleFieldChange = (key) => (e) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  /** Toggle terms checkbox */
  const handleAgreeChange = (e) => {
    setAgreed(e.target.checked);
    setErrors((prev) => ({ ...prev, terms: "" }));
  };

  /** Form submit — validate → call model → set success */
  const handleSubmit = async () => {
    const validationErrors = validateUser(mode, fields, agreed);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    await submitAuth(mode, fields);
    setLoading(false);
    setSuccess(true);
  };

  return {
    // state
    mode, fields, errors, showP, showC, agreed, loading, success,
    // handlers
    setMode,
    setShowP,
    setShowC,
    handleFieldChange,
    handleAgreeChange,
    handleSubmit,
  };
}
