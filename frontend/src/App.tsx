import { Layout } from "@/components/layout";
import { IdeasPage } from "@/pages/ideas";
import { Login } from "@/pages/login";
import { MembersPage } from "@/pages/members";
import { SignUp } from "@/pages/sign-up";
import { useAuthStore } from "@/stores/auth";
import { Navigate, Route, Routes } from "react-router-dom";

interface Routing {
  children: React.ReactNode
}

function ProtectedRoute({ children }: Routing) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to={"/login"} replace />
}

function PublicRoute({ children }: Routing) {
  const { isAuthenticated } = useAuthStore()
  return !isAuthenticated ? <>{children}</> : <Navigate to={"/"} replace />
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <IdeasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <MembersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
      </Routes>
    </Layout>
  )
}