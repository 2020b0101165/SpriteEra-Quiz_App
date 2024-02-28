import React from "react";
import { useQuizes } from "../Context/quizContext";

function StartScreen() {
  const { numQuestion, dispatch } = useQuizes();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestion} question to test your React Mastery</h3>
      <h3>You Have 5 Minutes to Complete the Test </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
