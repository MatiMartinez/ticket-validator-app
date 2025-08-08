import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function useLogin() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (error) setError("");
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    const success = await login(username, password);

    if (success) {
      navigate("/events");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  const clearForm = () => {
    setUsername("");
    setPassword("");
    setError("");
  };

  return { username, password, error, isAuthenticated, isLoading, handleUsernameChange, handlePasswordChange, handleSubmit, clearForm };
}
