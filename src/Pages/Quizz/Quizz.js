import React, { useEffect } from "react";
import { useQuizes } from "../../Context/quizContext";
import Header from "../../Components/Header";
import Main from "../../Components/Main";
import Progress from "../../Components/Progress";
import Question from "../../Components/Question";
import Footer from "../../Components/Footer";
import NextButton from "../../Components/NextButton";
import Timer from "../../Components/Timer";
import StartScreen from "../../Components/StartScreen";

function Quizz() {
  const { status, dispatch } = useQuizes();
  useEffect(() => {
    dispatch({ type: "RESET_STATE" });
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />

            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
      </Main>
    </div>
  );
}

export default Quizz;
