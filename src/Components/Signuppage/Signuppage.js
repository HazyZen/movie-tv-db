import { Link } from "react-router-dom";
import "./Signuppage.css";
const Signuppage = () => {
  return (
    <div className="pageall_container">
      <div className="benefit_container">
        <h2 className="benefit_heading">Benefits of being a member</h2>
        <ul className="benefit_list">
          <li className="list_item">
            Find something to watch on your subscribed streaming services
          </li>
          <li className="list_item">
            Log the movies and TV shows you have watched
          </li>
          <li className="list_item">
            Keep track of your favourite movies and TV shows and get
            recommendations from them
          </li>
          <li className="list_item">Build and maintain a personal watchlist</li>
          <li className="list_item">
            Build custom mixed lists (movies and TV)
          </li>
          <li className="list_item">Take part in movie and TV discussions</li>
          <li className="list_item">
            Contribute to, and improve the information in our database
          </li>
        </ul>
      </div>
      <div className="form_container">
        <form className="signup_form">
          <h1 className="sign_heading">Sign up for an account</h1>
          <p className="sign_para">
            Signing up for an account is free and easy. Fill out the form below
            to get started. JavaScript is required to to continue.
          </p>
          <p>Username</p>
          <input></input>
          <p>Password (4 characters minimum)</p>
          <input></input>
          <p>Password Confirm</p>
          <input></input>
          <p>Email</p>
          <input></input>
          <p>
            By clicking the "Sign up" button below, I certify that I have read
            and agree to the TMDB terms of use and privacy policy.
          </p>
          <button className="pagesign_btn">Sign Up</button>
          <Link to="/">
            <button className="cancel_btn">Cancel</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signuppage;
