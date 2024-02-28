import React from "react";
import { useQuizes } from "../Context/quizContext";
import { useNavigate } from "react-router-dom";

function NextButton() {
  const { dispatch, answer, index, numQuestion } = useQuizes();

  const navigate = useNavigate();
  if (answer === null) return null;

  const handleButtonClick = () => {
    navigate("/last");
    dispatch({ type: "finish" });
  };

  if (index < numQuestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestion - 1)
    return (
      <>
        <button className="btn btn-ui" onClick={handleButtonClick}>
          Finish
        </button>
      </>
    );
}

export default NextButton;
