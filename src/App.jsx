/**
 * App.jsx
 * Root component — just mounts the router.
 * Keep this file thin; routing lives in AppRouter.jsx.
 */

import React from "react";
import AppRouter from "./router/AppRouter";

export default function App() {
  return <AppRouter />;
}
