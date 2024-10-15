import './App.css'
import {useCallback, useEffect, useState} from "react";
import spotifyLogo from "./assets/Spotify_Full_Logo_RGB_Green.png"
import {Link, Outlet} from "react-router-dom";
import { useLocalStorageState} from "./hooks/useLocalStorage";
import { API } from "./api.ts";

interface User {
  display_name?: string,
  email: string,
  spotify_id?: string
}

function getParameterFromFragment(param: string) {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1))
  return params.get(param);
}

function Nav() {
  const [user, setUser] = useState<User>();

  const getUserInfo = useCallback(async () => {
    const response = await API.GetUser();
    if (response.success) {
      const userData: User = JSON.parse(response.result.data);
      setUser(userData);
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
      <p> Welcome, { user?.display_name }</p>
      <nav className="nav">
        <Link to="/albums/saved">Saved Albums</Link> |{" "}
        <Link to="/albums/saved/similar-artists">Similar Artists</Link> |{" "}
        <Link to="/logout">Logout</Link>
      </nav>
    </>
  );
}

function Login() {
  const base_url = import.meta.env.VITE_API_URL as string;
  const request_auth_url = `${base_url}/api/v1/spotify_oauth/request_authorization`;

  return (
    <>
      <h2>Welcome to your Personal Music Database</h2>
      <a href={request_auth_url}>
        Login with <img alt="Spotify Logo" src={spotifyLogo} height={25}/>
      </a>
    </>
  );
}

function App() {
  const [token, setToken] = useLocalStorageState("access_token")

  useEffect(() => {
    const access_token: string|null = getParameterFromFragment("access_token")
    if (access_token) {
      setToken(access_token);
    }
  })

  return (
    <>
      {token ? <Nav /> : <Login />}
      <Outlet />
    </>
  );
}


export default App
