import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectPathProps {
  children: ReactNode;
}

export default function ProtectPath({ children }: ProtectPathProps): JSX.Element {
  if (localStorage.getItem("userToken")) {
    return <>{children}</>;
  } else {
    return <Navigate to={'/login'} />;
  }
}
