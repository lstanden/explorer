import React from "react";

import Head from "next/head";
import { FormattedMessage } from "react-intl";

import Cladogram from "@src/components/Cladogram/Cladogram";
import strings from "@src/strings";
import Request from "@src/core/Request";

export default class Clade extends React.Component {
  static async getInitialProps(ctx) {
    const { cladeId = "tree", depth = 3 } = ctx.params || ctx.query;
    const data = await new Request(
      cladeId !== "tree"
        ? `/clades/tree/${cladeId}/depth/${depth}`
        : `/clades/tree/depth/${depth}`,
      "GET"
    ).fetch();
    return { data };
  }

  render() {
    const { root, depth, actualDepth, total } = this.props.data;
    return (
      <div className="flex-grow">
        <FormattedMessage {...strings.name}>
          {name => (
            <Head>
              <title>
                {name} - {root.name}
              </title>
            </Head>
          )}
        </FormattedMessage>
        <Cladogram
          root={root}
          depth={depth}
          actualDepth={actualDepth}
          total={total}
        />
      </div>
    );
  }
}
