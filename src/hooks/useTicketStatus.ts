import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export function useTicketStatus() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "green";
      case "invalid":
        return "red";
      case "already_used":
        return "orange";
      default:
        return "gray";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return CheckCircle;
      case "invalid":
        return XCircle;
      case "already_used":
        return AlertCircle;
      default:
        return AlertCircle;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "valid":
        return "Válido";
      case "invalid":
        return "Inválido";
      case "already_used":
        return "Ya usado";
      default:
        return status;
    }
  };

  const getStatusTitle = (status: string) => {
    switch (status) {
      case "valid":
        return "Ticket Válido";
      case "invalid":
        return "Ticket Inválido";
      case "already_used":
        return "Ticket Ya Usado";
      default:
        return "Error";
    }
  };

  const getStatusConfig = (status: string) => {
    return {
      color: getStatusColor(status),
      icon: getStatusIcon(status),
      text: getStatusText(status),
      title: getStatusTitle(status),
    };
  };

  return { 
    getStatusColor, 
    getStatusIcon, 
    getStatusText, 
    getStatusTitle,
    getStatusConfig 
  };
}
