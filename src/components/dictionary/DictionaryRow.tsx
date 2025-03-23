import React from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "@/routes";

import "@/assets/scss/pages/dictionary-page/dictionary-row.scss";

import type {RowProps} from "@/types/dictionary-types";

const DictionaryRow: React.FC<RowProps> = ({row}) => {
  return (
    <li className="row">
      <div className="up">
        <div className="transcription">
          [<code>{row["transcription-word"]}</code>]
        </div>
      </div>
      <div className="left">
        <div className="image-box" data-number={row["id"]}>
          <img src={row["url-image"]} alt={row["eng-word"]} />
        </div>
        <div className="text-box">
          <h2>{row["eng-word"]}</h2>
          <h5>{row["ukr-word"]}</h5>
        </div>
      </div>
      <div className="right">
        <u>{row["part-of-speech"]}</u>
        <Link
          className="readmore"
          to={row["url-dictionary-cambridge"]}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more...
        </Link>
      </div>
    </li>
  );
};

export default DictionaryRow;
