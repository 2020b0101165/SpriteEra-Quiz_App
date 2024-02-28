import React, { useEffect } from "react";
import { useQuizes } from "../Context/quizContext";
import { useNavigate } from "react-router-dom";

export default function Timer() {
  const { remainingSeconds, dispatch } = useQuizes();
  const navigate = useNavigate();
  const minute = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      if (remainingSeconds === 0) {
        navigate("/last");
      }

      return () => clearInterval(id);
    },
    [dispatch, remainingSeconds, navigate]
  );
  return (
    <div className="timer">
      {minute < 10 && "0"}
      {minute}: {seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
