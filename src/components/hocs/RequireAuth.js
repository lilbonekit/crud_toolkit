import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const RequireAuth = ({children}) => {
    const {isLogged} = useAuth()
    console.log(isLogged)

    if(!isLogged) {
        return <Navigate to="/login"/>
    }

    return children
}

export default RequireAuth
