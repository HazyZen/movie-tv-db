import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer_container">
      <div className="footer_logo_join_container">
        <img src="/footer_logo.png" alt="logo" className="logo" />
        <Link to="/signup">
          <button className="join_button">JOIN COMMUNITY</button>
        </Link>
      </div>
      {/* <div className="join_container">
        
      </div> */}
      <div className="footer_links">
        <div className="footer_column">
          <h4 className="footer_heading">THE BASICS</h4>
          <a href="https://www.themoviedb.org/about" target="_blank">
            About TMDB
          </a>
          <a
            href="https://www.themoviedb.org/about/staying-in-touch"
            target="_blank"
          >
            Contact Us
          </a>
          <a href="https://www.themoviedb.org/talk" target="_blank">
            Support Forums
          </a>
          <a
            href="https://www.themoviedb.org/login?to=read_me&redirect_uri=/docs"
            target="_blank"
          >
            API
          </a>
          <a href="https://status.themoviedb.org/" target="_blank">
            System Status
          </a>
        </div>
        <div className="footer_column">
          <h4 className="footer_heading">GET INVOLVED</h4>
          <a href="https://www.themoviedb.org/bible" target="_blank">
            Contribution Bible
          </a>
          <a href="https://www.themoviedb.org/movie/new" target="_blank">
            Add New Movie
          </a>
          <a href="https://www.themoviedb.org/tv/new" target="_blank">
            Add New TV Show
          </a>
        </div>
        <div className="footer_column">
          <h4 className="footer_heading">COMMUNITY</h4>
          <a
            href="https://www.themoviedb.org/documentation/community/guidelines"
            target="_blank"
          >
            Guidelines
          </a>
          <a href="https://www.themoviedb.org/discuss" target="_blank">
            Discussions
          </a>
          <a href="https://www.themoviedb.org/leaderboard" target="_blank">
            Leaderboard
          </a>
          <a href="https://twitter.com/themoviedb" target="_blank">
            Twitter
          </a>
        </div>
        <div className="footer_column">
          <h4 className="footer_heading">LEGAL</h4>
          <a
            href="https://www.themoviedb.org/documentation/website/terms-of-use"
            target="_blank"
          >
            Terms of Use
          </a>
          <a
            href="https://www.themoviedb.org/documentation/api/terms-of-use"
            target="_blank"
          >
            API Terms of Use
          </a>
          <a href="https://www.themoviedb.org/privacy-policy" target="_blank">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
