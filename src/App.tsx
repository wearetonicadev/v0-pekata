import { Routes, Route, Outlet } from "react-router-dom";
import { Providers } from "./components/providers";
import { AuthenticatedLayout } from "./components/layouts/AuthenticatedLayout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import EmployeePage from "./pages/EmployeePage";

import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Providers>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Outlet />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        >
          <Route index element={<Employees />} />
          <Route path="id/:employeeId" element={<EmployeePage />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Providers>
  );
}

export default App;
