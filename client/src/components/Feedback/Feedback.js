import React from "react";
import s from "./Feedback.css";

export default function Feedback() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <a className={s.link} href="#">
          Ask a question
        </a>
        <span className={s.spacer}>|</span>
        <a className={s.link} href="#">
          Report an issue
        </a>
      </div>
    </div>
  );
}
