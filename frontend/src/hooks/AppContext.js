import { createContext, useContext, useState } from "react";
import useFetchUser from "./useFetchUser";
import { SnackbarProvider } from "notistack";

const UserContext = createContext(null);
const TokenContext = createContext(null);
const SetTokenContext = createContext(null);
const AppBarHeiContext = createContext(null);

export function useUser() {
  return useContext(UserContext);
}
export function useToken() {
  return useContext(TokenContext);
}
export function useSetToken() {
  return useContext(SetTokenContext);
}
export function useAppBarHei() {
  return useContext(AppBarHeiContext);
}

export function Provider({ children }) {
  const [token, setToken] = useState(null);
  const userData = useFetchUser(token);
  const [height, setHeight] = useState(0);

  return (
    <UserContext.Provider value={userData}>
      <TokenContext.Provider value={token}>
        <SetTokenContext.Provider value={setToken}>
          <AppBarHeiContext.Provider value={{ height, setHeight }}>
            <SnackbarProvider
              maxSnack={3}
              autoHideDuration={3000}
              preventDuplicate
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {children}
            </SnackbarProvider>
          </AppBarHeiContext.Provider>
        </SetTokenContext.Provider>
      </TokenContext.Provider>
    </UserContext.Provider>
  );
}
