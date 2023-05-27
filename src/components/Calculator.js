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
      result = evaluate(finalexpression); //mathjs
    } catch (error) {
      result = Invalid_str;
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
    if (answer === Invalid_str) return;
    
    const ans = answer.toString();
    const firstChatA = ans.charAt(0);
    const firstChatI = input.charAt(0);
    let sign = '-';

    if (answer !== "") {
      if(firstChatA === '-' || firstChatA === '+'){
        sign = firstChatA === '-' ? '+' : '-';
        setInput(sign.concat(ans.slice(1)));
      }
      else
        setInput(sign.concat(ans));
    }

    else {
      if(firstChatI === '-' || firstChatI === '+'){
        sign = firstChatI === '-' ? '+' : '-';
        setInput((prev) => sign.concat(prev.slice(1)));
      }
      else
        setInput((prev) => sign.concat(prev));
    }
    
    setAnswer("");
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
