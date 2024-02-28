import React from "react";
import { useQuizes } from "../Context/quizContext";

function Option() {
  const { questions, index, dispatch, answer } = useQuizes();
  const QuestionNo = questions[index];
  const hasAnswer = answer != null;
  return (
    <div className="options">
      {QuestionNo.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""}  ${
            hasAnswer &&
            (index === QuestionNo.correctOption ? "correct" : "wrong")
          }`}
          disabled={hasAnswer}
          key={option}
          onClick={() => {
            dispatch({ type: "newAnswer", payload: index });
            dispatch({ type: "saveAnswer", payload: option });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
