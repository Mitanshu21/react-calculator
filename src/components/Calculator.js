import React, { useState } from "react";
import Display from "./Display";
import Buttons from "./Buttons";
// import "./styles/Calculator.css";
import { evaluate, round } from "mathjs";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const Invalid_str = 'Invalid Input';

  //input from buttons
  const inputHandler = (event) => {
    
    let val = event.target.textContent;
    const inputElmnt = document.querySelector('.input');
    const cursorPos = inputElmnt.selectionStart;

    switch (val) {
      case "x2":
        val = "^2";
      break;
      case "x3":
        val = "^3";
      break;
      case "3√":
        val = "^(1÷3)";
      break;
      case "log":
        val = "log(";
      break;
    }
  
    let str = input + val;
  
    if (answer === Invalid_str) {
      setInput(val);
      setAnswer("");
    }
    else if (answer !== "") {
      setInput(answer + val);
      setAnswer("");
    }
    else {
      setInput(str);
    }
  };

  // check brackets are balanced or not //innecesario
  const checkBracketBalanced = (expr) => {
    let stack = [];
    for (let i = 0; i < expr.length; i++) {
      let x = expr[i];
      if (x === "(") {
        stack.push(x);
        continue;
      }

      if (x === ")") {
        if (stack.length === 0) return false;
        else stack.pop();
      }
    }
    return stack.length === 0;
  };

  const addBracket = (expr) => {
    const stack = [];

    expr.split('').forEach(char => {
      if(char === '(')
        stack.push(char);
      
      else if(char === '(')
        stack.pop();
    })

    const closingBrackets = ')'.repeat(stack.length);

    return `${expr}${closingBrackets}`;
  }

  // calculate final answer
  const calculateAns = () => {
    if (input === "") return;

    let result = 0;
    let finalexpression = input;
    finalexpression = finalexpression.replaceAll("x", "*");
    finalexpression = finalexpression.replaceAll("÷", "/");

    finalexpression = addBracket(finalexpression);
    setInput(finalexpression);
    console.log(finalexpression);

    // evaluate square root
    let noSqrt = input.match(/√[0-9]+/gi);

    if (noSqrt !== null) {
      let evalSqrt = input;
      for (let i = 0; i < noSqrt.length; i++) {
        evalSqrt = evalSqrt.replace(
          noSqrt[i],
          `sqrt(${noSqrt[i].substring(1)})`
        );
      }
      finalexpression = evalSqrt;
    }

    try {
      // check brackets are balanced or not
      if (!checkBracketBalanced(finalexpression)) {
        const errorMessage = { message: "Brackets are not balanced!" };
        throw errorMessage;
      }
      result = evaluate(finalexpression); //mathjs
      console.log(result, finalexpression);
    } catch (error) {
      result =
        error.message === "Brackets are not balanced!"
          ? "Brackets are not balanced!"
          : Invalid_str; //error.message;
    }
    isNaN(result) ? setAnswer(result) : setAnswer(round(result, 3));
  };

  //Clear screen
  const clearInput = () => {
    setInput("");
    setAnswer("");
  };

  // remove last character
  const backspace = () => {
    if (answer !== "") {
      setInput(answer.toString().slice(0, -1));
      setAnswer("");
    } else setInput((prev) => prev.slice(0, -1));
  };
  

  // change prefix of expression
  const changePlusMinus = () => {
    //need to change for answer
    if (answer === Invalid_str) return;
    else if (answer !== "") {
      let ans = answer.toString();
      if (ans.charAt(0) === "-") {
        let plus = "+";
        setInput(plus.concat(ans.slice(1, ans.length)));
      } else if (ans.charAt(0) === "+") {
        let minus = "-";
        setInput(minus.concat(ans.slice(1, ans.length)));
      } else {
        let minus = "-";
        setInput(minus.concat(ans));
      }
      setAnswer("");
    } else {
      if (input.charAt(0) === "-") {
        let plus = "+";
        setInput((prev) => plus.concat(prev.slice(1, prev.length)));
      } else if (input.charAt(0) === "+") {
        let minus = "-";
        setInput((prev) => minus.concat(prev.slice(1, prev.length)));
      } else {
        let minus = "-";
        setInput((prev) => minus.concat(prev));
      }
    }
  };

  return (
    <div className="container">
      <Display input={input} setInput={setInput} answer={answer}/>
      <Buttons
        inputHandler={inputHandler}
        clearInput={clearInput}
        backspace={backspace}
        changePlusMinus={changePlusMinus}
        calculateAns={calculateAns}
        />
    </div>
  );
}
