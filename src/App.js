import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Quizz from "./Pages/Quizz/Quizz";
import FinishedScreen from "./Pages/FinishedScreen/FinishedScreen";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import { useQuizes } from "./Context/quizContext";

function App() {
  const { status } = useQuizes();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="quizz" element={<Quizz />} />
        {status === "finished" && (
          <Route path="last" element={<FinishedScreen />} />
        )}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
