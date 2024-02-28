import { createContext, useContext } from "react";
import { usePersistentReducer } from "../Hooks/usePersistentReducer";
import { useLocalStorage } from "../Hooks/useLocalStorage";

const Questions = [
  {
    question: "What is React?",
    options: ["A programming language", "A front-end JavaScript library", "A back-end framework", "An operating system"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "What does 'props' stand for in React?",
    options: ["Property types", "Property elements", "Properties", "Program atate"],
    correctOption: 2,
    points: 10,
  },
  {
    question: "Which company invented React?",
    options: ["Google", "Apple", "Netflix", "Facebook"],
    correctOption: 2,
    points: 10,
  },
  {
    question:
      "What does virtual DOM (VDOM) do in React?",
    options: ["Renders components directly to the DOM", "Keeps track of the changes to the DOM", "Represents a virtual version of the DOM in memory", "Synchronizes the DOM with the server"],
    correctOption: 2,
    points: 10,
  },
  {
    question: "How does data flow naturally in React apps?",
    options: [
      "From parents to children",
      "From children to parents",
      "Both ways",
      "The developers decides",
    ],
    correctOption: 0,
    points: 10,
  },
];

const quizContext = createContext();

const SECS_PER_QUESTION = 60;

const initalState = {
  questions: Questions,
  Answered: [],
  status: "ready",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  remainingSeconds: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.questions.length * SECS_PER_QUESTION,
      };
    case "saveAnswer":
      return { ...state, Answered: [...state.Answered, action.payload] };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,

        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return { ...initalState, questions: state.questions, status: "ready" };
    case "RESET_STATE":
      return { ...initalState };
    case "tick":
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action");
  }
}

function QuizContextProvider({ children }) {
  const [state, dispatch, resetState] = usePersistentReducer(
    reducer,
    initalState,
    "item"
  );

  const [highestScore, setHighestScore] = useLocalStorage(0, "highestScore");

  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    remainingSeconds,
    Answered,
  } = state;

  const numQuestion = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  return (
    <quizContext.Provider
      value={{
        state,
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        remainingSeconds,
        numQuestion,
        maxPossiblePoints,
        Answered,
        dispatch,
        resetState,
        setHighestScore,
        highestScore,
      }}
    >
      {children}
    </quizContext.Provider>
  );
}

function useQuizes() {
  const context = useContext(quizContext);
  if (context === undefined)
    throw new Error("Context is Used outside the Provider component");
  return context;
}

export { QuizContextProvider, useQuizes };
