import { useState } from "react";
import styles from "./Styles/ScrollButton.module.css";
import { BiChevronsUp } from "react-icons/bi";

export default function ScrollButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 400) {
      setVisible(true);
    } else if (scrolled <= 400) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <>
      <BiChevronsUp
        onClick={scrollToTop}
        className={styles.button}
        style={{ display: visible ? "inline" : "none" }}
      />
    </>
  );
}
