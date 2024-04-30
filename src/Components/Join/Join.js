import { Link } from "react-router-dom";
import ".//Join.css";

const Join = () => {
  return (
    <div className="joinall_container">
      <div className="heading">
        <h2>Join Today</h2>
      </div>
      <div className="join_content">
        <p className="join_para">
          Get access to maintain your own
          <em>custom personal lists, track what you've seen </em>
          and search and filter for <em>what to watch next</em>—regardless if
          it's in theatres, on TV or available on popular streaming services
          like Netflix, Amazon Prime Video, Disney Plus, Apple TV Plus, and
          Hulu.
        </p>
        <div className="join_list">
          <li>Enjoy TMDB ad free</li>
          <li>Maintain a personal watchlist</li>
          <li>
            Filter by your subscribed streaming services and find something to
            watch
          </li>
          <li>Log the movies and TV shows you've seen</li>
          <li>Build custom lists</li>
          <li>Contribute to and improve our database</li>
        </div>
      </div>

      <Link to="/signup">
        <button className="sign_btn">Sign Up</button>
      </Link>
    </div>
  );
};

export default Join;
