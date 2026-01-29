import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { SubmitDecision } from './pages/SubmitDecision';
import { Results } from './pages/Results';
import { Analytics } from './pages/Analytics';
import { CostCurves } from './pages/CostCurves';
import { Leaderboard } from './pages/Leaderboard';
import { Guide } from './pages/Guide';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit-decision" element={<SubmitDecision />} />
        <Route path="/results" element={<Results />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/cost-curves" element={<CostCurves />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
