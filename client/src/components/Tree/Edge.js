import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from '../../components/Cladogram/Cladogram.css';

class Edge extends React.Component {

  static propTypes = {
    datum: PropTypes.any.isRequired,
  };

  onSelect() {
    console.error(this.href);
  }

  drawPath(node) {
    return "M" + node.parent.y + "," + node.parent.x
      + "C" + (node.parent.y + node.y) / 2 + "," + node.parent.x
      + " " + (node.parent.y + node.y) / 2 + "," + node.x
      + " " + node.y + "," + node.x;
  }

  getDasharray() {
    return this.props.datum.certainty > 0 ? '5, 5' : '0';
  }

  render() {
    return (
      <path
        className={s.edge}
        d={this.drawPath(this.props.datum)}
        strokeDasharray={this.getDasharray()}
      />
    );
  }

}

export default withStyles(s)(Edge);
