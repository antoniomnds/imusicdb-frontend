import './App.css'
import {useCallback, useEffect, useMemo, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import { API } from "./api.ts";
import Nav from "./features/nav/nav.tsx";
import Login from "./features/login/login.tsx";
import { useLocalStorage } from 'usehooks-ts'

interface User {
  display_name?: string,
  email: string,
  spotify_id?: string
}

function Welcome() {
  const [user, setUser] = useState<User>();

  const getUserInfo = useCallback(async () => {
    const response = await API.GetUser();
    if (response.success && response.result.data) {
      const userData: User = JSON.parse(response.result.data) as User;
      setUser(userData);
    } else {
      alert(response.result.errors);
    }
  }, []);

  useEffect(() => {
    getUserInfo()
      .catch((err: unknown) => {
        console.error(err)
      });
  }, [getUserInfo]);

  return (
    <>
      <p>Welcome, {user?.display_name}</p>
      <Outlet />
      <Nav />
    </>

  );
}

function App() {
  const [token, setToken] = useLocalStorage("access_token", "")

  const location = useLocation();
  const accessToken = useMemo(
    () => location.hash.substring(1).replace("access_token=", ""),
    [location.hash]
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
      navigate(location.pathname, {replace: true}); // clear the URL params
    }
  }, [accessToken, setToken, navigate, location.pathname])

  const hasAccessToken = token.length !== 0;

  return (
    <>
      {hasAccessToken ? <Welcome /> : <Login />}
    </>
  );
}


export default App
