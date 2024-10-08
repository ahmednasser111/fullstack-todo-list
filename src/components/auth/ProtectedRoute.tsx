import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
	condition: boolean;
	children: ReactNode;
	path: string;
}
function ProtectedRoute({ condition, path, children }: IProps) {
	if (!condition) return <Navigate to={path} replace />;
	return <>{children}</>;
}
export default ProtectedRoute;
