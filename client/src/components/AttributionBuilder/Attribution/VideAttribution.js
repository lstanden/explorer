import React from "react";
import s from "./Attribution.css";
import Attribution from "./Attribution";

export default class VideAttribution extends React.Component {
  render() {
    return (
      <Attribution
        attribution={this.props.attribution}
        onChange={this.props.onChange}
        onDelete={this.props.onDelete}
      />
    );
  }
}
