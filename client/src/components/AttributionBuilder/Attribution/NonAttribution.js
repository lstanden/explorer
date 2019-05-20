import React from "react";
import s from "./Attribution.css";
import Attribution from "./Attribution";
import { FormControl, FormGroup, ControlLabel } from "react-bootstrap";

export default class NonAttribution extends React.Component {
  updateSensuClade(sensuClade) {
    this.props.onChange(
      Object.assign({}, this.props.attribution, {
        sensuClade
      })
    );
  }

  render() {
    return (
      <Attribution
        attribution={this.props.attribution}
        onChange={this.props.onChange}
        onDelete={this.props.onDelete}
        extraField={
          <FormGroup controlId="name">
            <ControlLabel>Clade</ControlLabel>
            <FormControl
              placeholder="Clade"
              type="text"
              value={this.props.attribution.sensuClade || ""}
              onChange={e => this.updateSensuClade(e.target.value)}
            />
          </FormGroup>
        }
      />
    );
  }
}
