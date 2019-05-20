import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { FormattedMessage, defineMessages } from "react-intl";
import Router from "next/router";

import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import Tree from "@src/components/Tree";
import Pane from "./Pane";
import Search from "@src/components/Search";
import Request from "@src/core/Request";

import strings from "@src/strings";
import s from "./Cladogram.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HEADER_HEIGHT = 62;

const messages = defineMessages({
  resetZoom: "Reset Zoom / Center Cladogram",
  depth: "Depth"
});

const resetViewTooltip = (
  <Tooltip>
    <FormattedMessage {...messages.resetZoom} />
  </Tooltip>
);
const depthTooltip = (
  <Tooltip>
    <FormattedMessage {...messages.depth} />
  </Tooltip>
);

export default class Cladogram extends React.Component {
  static propTypes = {
    root: PropTypes.any.isRequired,
    depth: PropTypes.number.isRequired,
    actualDepth: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  };

  constructor(props, context) {
    super(props);
    this.prepareState(props);
    this.resetView = this.resetView.bind(this);
  }

  componentDidMount() {
    const dims = document.getElementsByClassName(s.container)[0];
    dims &&
      this.setState({
        width: dims.clientWidth,
        height: window.innerHeight - HEADER_HEIGHT
      });
  }

  componentWillReceiveProps(newProps) {
    // const dims = document.getElementsByClassName(s.container)[0];
    this.setState({
      width: this.state.width,
      height: this.state.height,
      root: newProps.root,
      total: newProps.total,
      depth: newProps.depth,
      actualDepth: newProps.actualDepth,
      id: newProps.root._id,
      scale: 1,
      matrix: [1, 0, 0, 1, 0, 0]
    });
  }

  onChangeDepth(e) {
    history.push(`/clades/${this.state.id}/depth/${e.target.value}`);
  }

  async onSearchClade(cladeName, cb) {
    const items = await new Request(
      "/clades/search",
      "POST",
      { name: cladeName },
      Request.endPoints.public
    ).fetch();
    cb(items);
  }

  onSelectClade = (id, value) => {
    Router.push(
      `/clades?cladeId=${id}&depth=${this.state.depth}`,
      `/clades/${id}/depth/${this.state.depth}`
    );
  };

  onSelectNode = node => {
    if (node.id === this.state.id) {
      if (this.state.root.parent != null) {
        Router.push(
          `/clades?cladeId=${this.state.root.parent}&depth=${this.state.depth}`,
          `/clades/${this.state.root.parent}/depth/${this.state.depth}`
        );
      }
    } else {
      Router.push(
        `/clades?cladeId=${node.id}&depth=${this.state.depth}`,
        `/clades/${node.id}/depth/${this.state.depth}`
      );
    }
  };

  prepareState(props) {
    this.state = {
      root: props.root,
      total: props.total,
      depth: props.depth,
      actualDepth: props.actualDepth,
      id: props.root._id,
      width: 0,
      height: 0,
      scale: 1,
      matrix: [1, 0, 0, 1, 0, 0]
    };
  }

  resetView(e) {
    e.preventDefault();
    this.setState({ matrix: [1, 0, 0, 1, 0, 0] });
  }

  render() {
    let options = [];
    for (let i = 1; i <= 9; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return (
      <div className={s.container}>
        <FormattedMessage {...strings.name}>
          {name => (
            <Head>
              <title>
                {name} - {this.state.root.name}
              </title>
            </Head>
          )}
        </FormattedMessage>
        <Form inline className={s.search_form}>
          <FormGroup controlId="search" className={s.search_form_group}>
            <Search
              id="search"
              name="search"
              placeholder="Search for Clade"
              onSelect={this.onSelectClade}
              onSearch={this.onSearchClade}
              inline
            />
          </FormGroup>
          <OverlayTrigger placement="bottom" overlay={depthTooltip}>
            <FormGroup controlId="depth" className={s.depth_form_group}>
              <FormControl
                as="select"
                value={this.state.depth}
                onChange={this.onChangeDepth}
                required
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </FormControl>
            </FormGroup>
          </OverlayTrigger>
        </Form>
        <Tree
          root={this.state.root}
          width={this.state.width}
          height={this.state.height}
          onSelectNode={this.onSelectNode}
          popoverComponent={Pane}
          depth={this.state.actualDepth}
          matrix={this.state.matrix}
        />
        <OverlayTrigger placement="left" overlay={resetViewTooltip}>
          <Button
            variant="default"
            className={s.reset_button}
            onClick={this.resetView}
          >
            <FontAwesomeIcon icon="compress-arrows-alt" />
          </Button>
        </OverlayTrigger>
      </div>
    );
  }
}
