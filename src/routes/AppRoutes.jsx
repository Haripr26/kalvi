import { useState } from "react";
import { useAuth }    from "../context/AuthContext";
import { useExam }    from "../context/ExamContext";
import Navbar         from "../components/common/Navbar";
import Footer         from "../components/common/Footer";

// Pages
import HomePage              from "../pages/student/HomePage";
import LoginPage             from "../pages/auth/LoginPage";
import RegisterPage          from "../pages/auth/RegisterPage";
import ExamsPage             from "../pages/student/ExamsPage";
import ExamDetailPage        from "../pages/student/ExamDetailPage";
import ExamRoomPage          from "../pages/student/ExamRoomPage";
import ResultPage            from "../pages/student/ResultPage";
import DashboardPage         from "../pages/student/DashboardPage";
import AboutPage             from "../pages/student/AboutPage";
import PublisherDashboardPage from "../pages/publisher/PublisherDashboardPage";
import AdminDashboardPage    from "../pages/admin/AdminDashboardPage";

const NO_NAV_PAGES  = ["exam-room"];
const NO_FOOT_PAGES = ["exam-room", "admin-dashboard", "publisher-dashboard"];

export default function AppRoutes() {
  const [page, setPage]       = useState("home");
  const { setCurrentExam }    = useExam();

  const handleSetPage = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "home":                return <HomePage      setPage={handleSetPage} />;
      case "login":               return <LoginPage     setPage={handleSetPage} />;
      case "publisher-login":     return <LoginPage     setPage={handleSetPage} />;
      case "register":            return <RegisterPage  setPage={handleSetPage} />;
      case "exams":               return <ExamsPage     setPage={handleSetPage} setCurrentExam={setCurrentExam} />;
      case "exam-detail":         return <ExamDetailPage setPage={handleSetPage} />;
      case "exam-room":           return <ExamRoomPage  setPage={handleSetPage} />;
      case "result":              return <ResultPage    setPage={handleSetPage} />;
      case "dashboard":           return <DashboardPage setPage={handleSetPage} />;
      case "about":               return <AboutPage     setPage={handleSetPage} />;
      case "publisher-dashboard": return <PublisherDashboardPage setPage={handleSetPage} />;
      case "admin-dashboard":     return <AdminDashboardPage     setPage={handleSetPage} />;
      default:                    return <HomePage      setPage={handleSetPage} />;
    }
  };

  const showNav  = !NO_NAV_PAGES.includes(page);
  const showFoot = !NO_FOOT_PAGES.includes(page);

  return (
    <>
      {showNav  && <Navbar page={page} setPage={handleSetPage} />}
      {renderPage()}
      {showFoot && <Footer setPage={handleSetPage} />}
    </>
  );
}
