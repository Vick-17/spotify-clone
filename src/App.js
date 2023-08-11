import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./StateProvider";
import Player from "./Player";
import { getTokenFromResponce } from "./spotify";
import "./App.css";
import Login from "./login";

const s = new SpotifyWebApi();

function App() {
const [{token}, dispatch] = useStateValue();

  useEffect(() => {
    const hash = getTokenFromResponce();
    window.location.hash = "";

    let _token = hash.access_token;

    if (_token) {
      s.setAccessToken(_token);

      dispatchEvent({
        type: "SET_TOKEN",
        token: _token,
      });
    }
  }, []);

  return <div></div>;
}

export default App;
