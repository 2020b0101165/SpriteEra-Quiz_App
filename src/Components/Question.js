import React from "react";
import Option from "./Option";
import { useQuizes } from "../Context/quizContext";

function Question() {
  const { questions, index } = useQuizes();
  return (
    <div className="question">
      <h4>{questions[index].question}</h4>
      <Option />
    </div>
  );
}

export default Question;
