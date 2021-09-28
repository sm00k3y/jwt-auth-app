import React from "react";

const AuthContext = React.createContext();

export const useAccessTokenContext = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = React.useState("");

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
