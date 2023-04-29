import { useState, useEffect, createContext } from "react";

const AuthContext = createContext(null);

export default AuthContext;

export const useSession = () => {
    let session = sessionStorage.getItem("logged-user");
    const [loggedUser, setLoggedUser] = useState(session ? session : null);

    useEffect(() => {
        if (loggedUser != null) {
            sessionStorage.setItem("logged-user", loggedUser);
        } else {
            sessionStorage.removeItem("logged-user");
        }
    }, [loggedUser]);

    return { loggedUser, setLoggedUser };
};
