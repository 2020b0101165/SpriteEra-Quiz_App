import React from "react";
import { useQuizes } from "../Context/quizContext";

function ProgressBar() {
  const { index, answer, points, numQuestion, maxPossiblePoints } = useQuizes();
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestion} />
      <p>
        Question <strong>{index + 1}</strong>/{numQuestion}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </header>
  );
}

export default ProgressBar;
