import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import theme from "./theme";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import EventSelection from "./pages/EventSelection";
import EventValidation from "./pages/EventValidation";
import TicketValidator from "./pages/TicketValidator";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/events"
                element={
                  <ProtectedRoute>
                    <EventSelection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/event/:eventId"
                element={
                  <ProtectedRoute>
                    <EventValidation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/event/:eventId/validator"
                element={
                  <ProtectedRoute>
                    <TicketValidator />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </Router>
      </ChakraProvider>
    </AuthProvider>
  );
}
