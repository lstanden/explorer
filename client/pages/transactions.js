import React from "react";
import Head from "next/head";
import { FormattedMessage, defineMessages } from "react-intl";

import TransactionList from "@src/components/Transaction/List";

import Request from "@src/core/Request";

const messages = defineMessages({
  transactions: "Transactions"
});

export default class Transactions extends React.Component {
  static async getInitialProps(ctx) {
    const transactions = await new Request(
      "/transactions",
      "GET",
      "admin"
    ).fetch();
    return { transactions };
  }

  render() {
    console.log(this.props.transactions);
    return (
      <div>
        <FormattedMessage {...messages.transactions}>
          {title => (
            <Head>
              <title>{title}</title>
            </Head>
          )}
        </FormattedMessage>

        <TransactionList transactions={this.props.transactions} />
      </div>
    );
  }
}
