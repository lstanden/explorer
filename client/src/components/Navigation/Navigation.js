import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import s from "./Navigation.css";
import Link from "../Link";

export default function Navigation({ className }) {
  return (
    <div className={cx(s.root, className)} role="navigation">
      <Link className={s.link} to="/about">
        About
      </Link>
      <Link className={s.link} to="/contact">
        Contact
      </Link>
      <span className={s.spacer}> | </span>
      <Link className={s.link} to="/login">
        Log in
      </Link>
      <span className={s.spacer}>or</span>
      <Link className={cx(s.link, s.highlight)} to="/register">
        Sign up
      </Link>
    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string
};
