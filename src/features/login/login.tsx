import spotifyLogo from "../../assets/Spotify_Full_Logo_RGB_Green.png";

export default function Login() {
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
