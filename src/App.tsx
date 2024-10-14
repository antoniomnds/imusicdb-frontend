import './App.css'
import {useState, useEffect} from "react";
import spotifyLogo from "./assets/Spotify_Full_Logo_RGB_Green.png"

function useLocalStorageState(key: string, defaultValue = '') {
  const [state, setState] = useState<string>(
    () => window.localStorage.getItem(key) ?? defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state]);

  return [state, setState] as const;
}

function getParameterFromFragment(param: string) {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1))
  return params.get(param);
}

function App() {
  const [token, setToken] = useLocalStorageState("access_token")

  useEffect(() => {
    const access_token = getParameterFromFragment("access_token")
    if (access_token) {
      setToken(access_token);
    }
  })

  const request_auth_url = "http://localhost:3000/api/v1/spotify_oauth/request_authorization"
  return (
    <>
      <h2>Welcome to your Personal Music Database</h2>
      { token ?
        null
        : <a href={request_auth_url}>
            Login with <img alt="Spotify Logo" src={spotifyLogo} height={25}/>
          </a>
      }
    </>
  );
}


export default App
