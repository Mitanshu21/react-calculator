import React from "react";
import "./styles/Display.css";

const Display = ({ input, setInput, answer }) => {
  // const onChangeTagInput = (e) => {
  //   // setInputVal(e.target.value.replace(/^[0-9 ()+-]+$/, "a"));
  //   // if(e.target.value === "1")
  //   setInput(e.target.value);
  //   // console.log(e.target.value.test(/^[0-9 ()+-]+$/));
  //   // console.log(e.target.value);
  // };

  return (
    <>
      <div className="display">
        {answer === "" ? (
          <>
            <input
              type="text"
              name="input"
              className="input"
              style={{ padding: "29px" }}
              value={input}
              placeholder="0"
              // onChange={onChangeTagInput}
              maxLength={12}
              disabled
            />
          </>
        ) : (
          <>
            <input
              type="text"
              name="input"
              className="value"
              value={input}
              placeholder="0"
              // onChange={onChangeTagInput}
              maxLength={12}
              disabled
            />
            <input
              type="text"
              name="value"
              className="input"
              value={answer}
              disabled
            />
          </>
        )}
      </div>
    </>
  );
};

export default Display;
