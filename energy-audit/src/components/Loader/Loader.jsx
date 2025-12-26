import "./Loader.scss";
import loaderVideo from "./Loader.webm";

export default function Loader({ fullscreen = true }) {
  return (
    <div className={`loader ${fullscreen ? "fullscreen" : ""}`}>
      <video
        className="loader-video"
        src={loaderVideo}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}
