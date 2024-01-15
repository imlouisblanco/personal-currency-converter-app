"use client";

import { useState } from "react";

const MoneyConverter = () => {
  const [baseValue, setBaseValue] = useState("");
  const [result, setResult] = useState("");

  const handleBaseValue = (value) => {
    console.log(value);

    setBaseValue(value);
  };

  const getResult = async () => {
    console.log("baseValue:", baseValue);
    const response = await fetch(`/api/money?value=${baseValue}&baseType=BRL`);
    const data = await response.json();

    setResult(data.result)
  };

  return (
    <section>
      <p>🇧🇷BRL to 🇨🇱 CLP</p>
      <div className="flex flex-col my-2">
        <label htmlFor="baseValue">Initial</label>
        <input
          onChange={(event) => handleBaseValue(event.target.value)}
          id="baseValue"
          type="text"
        />
      </div>
      {result.length > 0 ? (
        <div className="flex flex-col my-2">
          <label htmlFor="result">Result</label>
          <input
            readOnly
            id="result"
            type="text"
            value={result}
          />
        </div>
      ) : null}
      <button
        onClick={() => getResult()}
        type="button"
        className="px-8 py-4 font-semibold bg-blue-500 mx-auto block my-2 w-full text-white"
      >
        Convert
      </button>
    </section>
  );
};

export default MoneyConverter;
