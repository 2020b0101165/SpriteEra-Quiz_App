import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizes } from "../../Context/quizContext";
import styles from "./FinishedScreen.module.css";

function FinishedScreen() {
  const {
    points,
    maxPossiblePoints,
    dispatch,
    remainingSeconds,
    state,
    resetState,
    highestScore,
    setHighestScore,
    highScore,
  } = useQuizes();

  const navigate = useNavigate();

  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🎖️";
  if (percentage >= 80 && percentage < 100) emoji = "🍕";
  if (percentage >= 50 && percentage < 80) emoji = "😁";
  if (percentage > 0 && percentage < 50) emoji = "😥";
  if (percentage === 0) emoji = "🤦";

  const time_to_finish = 300 - remainingSeconds;
  const minute = Math.floor(time_to_finish / 60);
  const seconds = time_to_finish % 60;

  useEffect(
    function () {
      setHighestScore(highScore > highestScore ? highScore : highestScore);
    },
    [setHighestScore, highScore, highestScore]
  );

  return (
    <>
      <div className={styles.card}>
        <div className={styles.tools}>
          <div className={styles.circle}>
            <span className={`${styles.box} ${styles.red}`}></span>
          </div>
          <div className={styles.circle}>
            <span className={`${styles.box} ${styles.yellow}`}></span>
          </div>
          <div className={styles.circle}>
            <span className={`${styles.box} ${styles.green}`}></span>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.Sucess}>Submission successful</h1>
            <p>Thanks! We have received your submission.</p>
          </div>

          <div className={styles.Score}>
            <p>
              <span>{emoji}</span>
              You Scored <strong>{points}</strong> out of{" "}
              <strong>
                {maxPossiblePoints} ({Math.ceil(percentage)}%)
              </strong>
            </p>
            <p>
              You finished the Quizz in <strong>{minute}</strong> min{" "}
              <strong>{seconds}</strong>sec
            </p>
            <p className={styles.highScore}>
              (HighScore: {highestScore} points)
            </p>
          </div>
          {state.status === "finished" && (
            <div className={styles.YourAnswer}>
              <p>Your Answers</p>
              {state.Answered.map((answer, index) => (
                <div
                  className={`${styles.btn} ${styles.btnoption} ${
                    state.questions[index].options[
                      state.questions[index].correctOption
                    ] === answer
                      ? "Green"
                      : "Black"
                  }`}
                  key={index}
                >
                  {answer}
                </div>
              ))}
            </div>
          )}

          <button
            className="btn btn-ui"
            onClick={() => {
              dispatch({ type: "restart" });
              resetState();
              navigate("/quizz");
            }}
          >
            Restart Quizz
          </button>
        </div>
      </div>
    </>
  );
}

export default FinishedScreen;
