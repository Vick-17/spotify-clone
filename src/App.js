// Importation des modules nécessaires depuis React et d'autres fichiers
import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./StateProvider"; // Import du StateProvider qui gère l'état global de l'application
import Player from "./Player"; // Import du composant Player qui sera affiché lorsque l'utilisateur est connecté
import { getTokenFromResponse } from "./spotify"; // Import d'une fonction pour extraire le token d'accès depuis la réponse Spotify
import "./App.css"; // Import des styles CSS
import Login from "./Login"; // Import du composant Login pour l'écran de connexion

// Création d'une instance de SpotifyWebApi
const s = new SpotifyWebApi();

function App() {
  // Utilisation du StateProvider pour accéder à l'état global de l'application
  const [{ token }, dispatch] = useStateValue();

  useEffect(() => {
    // Extraction du token d'accès depuis la réponse Spotify
    const hash = getTokenFromResponse();
    window.location.hash = "";

    let _token = hash.access_token;

    if (_token) {
      // Configuration de l'instance SpotifyWebApi avec le token d'accès
      s.setAccessToken(_token);

      // Récupération des playlists de l'utilisateur et mise à jour de l'état global
      s.getUserPlaylists({ limit: 50 }).then((response) =>
        dispatch({
          type: "SET_USER_PLAYLIST",
          userPlaylist: response,
        })
      );

      // Mise à jour de l'état global avec le token d'accès
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      // Récupération de la playlist "Discover Weekly" et mise à jour de l'état global
      s.getPlaylist("0QThHRzwSSluaSW9Dd09bG").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );

      // Récupération des artistes préférés de l'utilisateur et mise à jour de l'état global
      s.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      // Mise à jour de l'état global avec l'instance SpotifyWebApi configurée
      dispatch({
        type: "SET_SPOTIFY",
        spotify: s,
      });

      // Récupération des informations de l'utilisateur connecté et mise à jour de l'état global
      s.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      // Récupération des playlists de l'utilisateur et mise à jour de l'état global
      s.getUserPlaylists().then((playlist) => {
        dispatch({
          type: "SET_PLAYLIST",
          playlist,
        });
      });
    }
  }, [token, dispatch]);

  return (
    <div className="app">
      {/* Affichage du composant Login si l'utilisateur n'est pas connecté */}
      {!token && <Login />}
      {/* Affichage du composant Player si l'utilisateur est connecté */}
      {token && <Player spotify={s} />}
    </div>
  );
}

export default App;
