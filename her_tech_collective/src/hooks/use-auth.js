import { useContext } from "react";

import{ AuthContext }from"../components/AuthProvider";

export const useAuth = () => {
    // We pass in the context and create a custom hook that returns the contextauth and setAuth

    return useContext(AuthContext);
};