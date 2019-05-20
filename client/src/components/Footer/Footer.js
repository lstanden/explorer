import React from "react";
import s from "./Footer.scss";

export default function Footer() {
  const date = new Date();
  return (
    <div className={s.root}>
      <span className={s.text}>
        &copy; {date.getFullYear()}{" "}
        <a href="//phylogenyexplorerproject.com/">Phylogeny Explorer Project</a>
      </span>
    </div>
  );
}
