/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import sanitize from "sanitize-html";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

import { Citation as AttributionsCitation } from "@src/components/Citation";
import Auth from "@src/components/Auth";
import Link from "@src/components/Link";

import s from "./Cladogram.scss";

export default class Pane extends React.Component {
  static propTypes = {
    id: PropTypes.any.isRequired,
    name: PropTypes.any,
    otherNames: PropTypes.any,
    description: PropTypes.any,
    attributions: PropTypes.array,
    hasChildren: PropTypes.any
  };

  render() {
    const coords = {
      x: 5,
      y: -12
    };

    let description = sanitize(this.props.description, {
      allowedTags: [],
      allowedAttributes: []
    });

    if (description.length > 200) {
      description = `${description.substring(0, 200)}...`;
    }

    const title = (
      <span>
        {this.props.name || "[UNNAMED]"}
        {this.props.otherNames && (
          <small style={{ display: "block", marginTop: "3px" }}>
            {this.props.otherNames}
          </small>
        )}
      </span>
    );

    const actualWindow = (
      <Popover id="information-panel" title={title} className={s.info_window}>
        {this.props.attributions && this.props.attributions.length > 0 && (
          <small className={s.attribution}>
            <AttributionsCitation attributions={this.props.attributions} />
          </small>
        )}
        <div className={s.description}>
          {description || <i>No description available</i>}
        </div>
        <hr />
        {Auth.isUserAuthenticated() ? (
          <ButtonToolbar>
            <Button
              size="sm"
              variant="success"
              as={Link}
              to={`/clades/info/${this.props.id}`}
            >
              <FontAwesomeIcon icon="search" /> View
            </Button>
            <Button
              size="sm"
              variant="info"
              as={Link}
              to={`/clades/update/${this.props.id}`}
            >
              <FontAwesomeIcon icon="edit" /> Update
            </Button>
            <Button
              variant="primary"
              size="sm"
              as={Link}
              to={`/clades/evolve/${this.props.id}`}
            >
              <FontAwesomeIcon icon="random" /> Evolve
            </Button>
            <Button
              variant="danger"
              size="sm"
              as={Link}
              to={`/clades/destroy/${this.props.id}`}
            >
              <FontAwesomeIcon icon="trash" /> Destroy
            </Button>
          </ButtonToolbar>
        ) : (
          <ButtonToolbar>
            <Button
              size="sm"
              variant="success"
              as={Link}
              to={`/clades/info/${this.props.id}`}
            >
              <FontAwesomeIcon icon="search" /> View
            </Button>
          </ButtonToolbar>
        )}
      </Popover>
    );

    return (
      <foreignObject width="24px" height="22px" x={coords.x} y={coords.y}>
        <OverlayTrigger
          trigger="click"
          rootClose
          placement="top"
          overlay={actualWindow}
        >
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className={s.trigger_button}
          >
            <FontAwesomeIcon icon="ellipsis-h" />
          </Button>
        </OverlayTrigger>
      </foreignObject>
    );
  }
}
