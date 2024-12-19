import { Navigate } from "react-router-dom";

interface ProtectPathProps {
  children: React.ReactNode;
}

export default function ProtectPath({ children }: ProtectPathProps) {
  if (localStorage.getItem("userToken")) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
}
