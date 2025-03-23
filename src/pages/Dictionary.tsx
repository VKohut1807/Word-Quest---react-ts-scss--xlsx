import React from "react";

import "@/assets/scss/pages/dictionary-page/index.scss";

import type { DictionaryProps } from "@/types/dictionary-types";

import DictionaryRow from "@/components/dictionary/DictionaryRow";

const Dictionary: React.FC<DictionaryProps> = ({ data }) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="container">
          <ul className="body">
            {data.map((row, idx) => (
              <DictionaryRow key={idx} row={row} />
            ))}
          </ul>
        </div>
      ) : (
        <>
          <h2>Oops...</h2>
          <p>Data not found.</p>
        </>
      )}
    </>
  );
};

export default Dictionary;
