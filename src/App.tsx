import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import TutorialPage from "./pages/tutorial";
import KindergartenHome from "./pages/kindergarten/HomePage";
import LoginPage from "./pages/kindergarten/LoginPage";
import DashboardPage from "./pages/kindergarten/DashboardPage";
import ProtectedRoute from "./components/kindergarten/ProtectedRoute";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/kindergarten" element={<KindergartenHome />} />
          <Route path="/kindergarten/login" element={<LoginPage />} />
          <Route 
            path="/kindergarten/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/kindergarten/*" element={<KindergartenHome />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
