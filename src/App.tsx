import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
// Components
import QuestionCard from "./components/QuestionCard";
// types
import { QuestionsState } from "./API";
// Styles
import { GlobalStyle, Wrapper } from "./App.styles";
import Form from "./components/Form";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const [noOfQuestion, setNoOfQuestions] = useState(5);
  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState("medium");

  const formDataHandler = (
    noOfQuestion: number,
    category: number,
    difficulty: string
  ) => {
    setNoOfQuestions(noOfQuestion);
    setDifficulty(difficulty);
    setCategory(category);

    setGameOver(false);
  };

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      noOfQuestion,
      difficulty,
      category
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === noOfQuestion) {
      // setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };
  const startAgainHandler = () => {
    setGameOver(true);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>TYPESCRIPT QUIZ</h1>
        {/* {gameOver || userAnswers.length === noOfQuestion ? (
          <Form formDataHandler={formDataHandler} onstartTrivia={startTrivia} /> : null
        )} */}
        {gameOver ? (
          <Form formDataHandler={formDataHandler} onstartTrivia={startTrivia} />
        ) : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={noOfQuestion}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== noOfQuestion - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}

        {!gameOver && !loading && userAnswers.length === noOfQuestion && (
          <button onClick={startAgainHandler} className={"start"}>
            start again
          </button>
        )}
      </Wrapper>
    </>
  );
};

export default App;
