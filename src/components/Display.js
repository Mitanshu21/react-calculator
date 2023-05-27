import React, { useEffect, useRef } from "react";
import "./styles/Display.css";

export default function Display({ input, setInput, answer }) {

  const onChangeTagInput = (e) => {
    const re = /^[!%(-+\x2D-9^glox\xF7\u221A]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      setInput(e.target.value);
    }
  };

  return (
    <div className="display">
      <input
        type="text"
        name="input"
        className="value"
        value={answer === '' ? answer : input}
        disabled
      />
      <input
        type="text"
        name="input"
        className="input"
        autoComplete="off"
        style={{ padding: "29px" }}
        value={answer === '' ? input : answer}
        onChange={answer === '' ? onChangeTagInput : null}
        disabled={answer !== ''}
      />
    </div>
  );
};