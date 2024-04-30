import Trending from "./Trending";
import Footer from "./Footer/Footer.js";
import FreeWatch from "./FreeWatch/FreeWatch.js";
import Join from "./Join/Join.js";
import Trailer from "./Trailer/Trailer.js";
import Popular from "./Popular.jsx";

export default function Home() {
  return (
    <>
      <Trending />
      <Popular />
      <Trailer />
      <FreeWatch />
      <Join />
      <Footer />
    </>
  );
}
