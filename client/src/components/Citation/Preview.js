import React from "react";
import s from "./Citation.scss";
import { Citation as AttributionsCitation } from "../Citation";

export default function Preview({ attributions, cladeName }) {
  return (
    attributions.length > 0 && (
      <div className={s.preview_container}>
        <p className={s.preview_header}>Preview:</p>
        <p className={s.preview}>
          <AttributionsCitation attributions={attributions} clade={cladeName} />
        </p>
      </div>
    )
  );
}
