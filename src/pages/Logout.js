// [CODED BY: HUI ANGELES]
import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function Logout() {
    const { clearUserData, setUser } = useContext(UserContext);

    useEffect(() => {
        clearUserData();
        setUser({
            id: null,
            email: null,
            isAdmin: null
        });
    }, [clearUserData, setUser]);

    return <Navigate to="/login" replace />;
}