import React from "react";
import "./Body.css";
import { useStateValue } from "./StateProvider";
import SongRow from "./SongRow";
import {
  MoreHorizeIcon,
  FavoriteIcon,
  PlayCircleFilledIcon,
} from "@material-ui/icons";

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useStateValue();

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcJZyENOWUFo7`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTarck().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:$(id)`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTarck().then((r) => {
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  return (
    <div className="body">
      <div className="body_info">
        <img src={discover_weekly?.images[0].url} alt="" />
        <div className="body_infotext">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className="body_songs">
        <div className="body_icons">
          <PlayCircleFilledIcon
            className="body_shuffle"
            onClick={playPlaylist}
          />

          <FavoriteIcon fontSize="large" />
          <MoreHorizeIcon />
        </div>

        {discover_weekly?.tracks.items.map((item) => (
          <SongRow playSong={playSong} track={item.track} />
        ))}
      </div>
    </div>
  );
}

export default Body;
