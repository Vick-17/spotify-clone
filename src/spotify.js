// Lien de documentation Spotify pour le SDK Web Playback
// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
export const authEndpoint = "https://accounts.spotify.com/authorize";

// Remplacez par l'ID client de votre application, l'URL de redirection et les autorisations souhaitées
const clientId = "176e346b7c884adea3e0ae40a0df79e3"; // Remplacez ceci par votre propre ID client
const redirectUri = "http://localhost:3000/"; // Remplacez ceci par votre propre URL de redirection
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
]; // Autorisations requises pour l'application

// Fonction pour extraire le token d'accès depuis la réponse Spotify
export const getTokenFromResponse = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

// Construire le lien d'accès à Spotify
export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
