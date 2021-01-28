import { useContext } from "react";

import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
  //  const user = jwtDecode(authToken);
    setUser(authToken);
  //  authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
   // authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
