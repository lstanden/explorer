import React from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { Table, Column, Cell } from "@src/components/DataTable";

import s from "./Transaction.scss";

const title = "Transactions";

export default class List extends React.Component {
  static propTypes = {
    transactions: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
  }

  onUpdate(e, id) {
    e.preventDefault();
    history.push(`/transactions/update/${id}`);
  }

  onDestroy(e, id) {
    e.preventDefault();
    history.push(`/transactions/destroy/${id}`);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <br />
          <Table
            rowsCount={this.props.transactions.length}
            rowHeight={50}
            headerHeight={50}
            width={1000}
            height={500}
          >
            <Column
              header={<Cell>User</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.props.transactions[props.rowIndex].user.username}
                </Cell>
              )}
              width={100}
            />
            <Column
              header={<Cell>Operation</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.props.transactions[props.rowIndex].mode.toLowerCase()}
                </Cell>
              )}
              width={100}
            />
            <Column
              header={<Cell>Type</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.props.transactions[props.rowIndex].type.toLowerCase()}
                </Cell>
              )}
              width={100}
            />
            <Column
              header={<Cell>Status</Cell>}
              cell={props => (
                <Cell {...props}>
                  {this.props.transactions[props.rowIndex].status.toLowerCase()}
                </Cell>
              )}
              width={100}
            />
            <Column
              header={<Cell>Created</Cell>}
              cell={props => (
                <Cell {...props}>
                  {new Date(
                    this.props.transactions[props.rowIndex].created
                  ).toUTCString()}
                </Cell>
              )}
              width={300}
            />
            <Column
              header={<Cell>Actions</Cell>}
              cell={props => (
                <Cell {...props}>
                  <ButtonToolbar>
                    <Button
                      type="button"
                      onClick={e =>
                        this.onUpdate(
                          e,
                          this.props.transactions[props.rowIndex]._id
                        )
                      }
                      variant="default"
                    >
                      {/* <Glyphicon glyph="info-sign" /> */}
                    </Button>
                    <Button
                      type="button"
                      style={{
                        display:
                          this.props.transactions[props.rowIndex].status ===
                          "DONE"
                            ? "none"
                            : "block"
                      }}
                      onClick={e =>
                        this.onDestroy(
                          e,
                          this.props.transactions[props.rowIndex]._id
                        )
                      }
                      variant="danger"
                    >
                      {/* <Glyphicon glyph="trash" /> */}
                    </Button>
                  </ButtonToolbar>
                </Cell>
              )}
              width={170}
            />
          </Table>
        </div>
      </div>
    );
  }
}

List.contextTypes = { setTitle: PropTypes.func.isRequired };
