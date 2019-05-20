import React, { Component } from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";

export default function Link(props) {
  const { to, className, children } = props;
  return (
    <NextLink href={to}>
      <a className={className}>{children}</a>
    </NextLink>
  );
}

Link.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string
};
