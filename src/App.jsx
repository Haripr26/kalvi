import "./styles/global.css";
import { AuthProvider } from "./context/AuthContext";
import { ExamProvider } from "./context/ExamContext";
import AppRoutes        from "./routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <ExamProvider>
        <AppRoutes />
      </ExamProvider>
    </AuthProvider>
  );
}
