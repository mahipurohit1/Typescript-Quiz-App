import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
// Components
import QuestionCard from "./components/QuestionCard";
// types
import { QuestionsState } from "./API";
// Styles
import { GlobalStyle, Wrapper } from "./App.styles";
import Form from "./components/Form";
import { Alert } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import Score from "./components/Score";

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
  const [showAlert, setShowAlert] = useState(false);
  const [noOfQuestion, setNoOfQuestions] = useState(5);
  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState("medium");
  const [showResult, setShowResult] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setGameOver(true);
    setNoOfQuestions(5);
    setCategory(9);
    setScore(0);
    setShowResult(false);
    setDifficulty("medium");
  };

  const formDataHandler = (
    noOfQuestion: number,
    category: number,
    difficulty: string
  ) => {
    setNoOfQuestions(noOfQuestion);
    setDifficulty(difficulty);
    setCategory(category);
    setShowAlert(true);
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
    setShowAlert(false);
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
    // setGameOver(true);
    setOpen(true);
    setShowResult(true);
    // setNoOfQuestions(5);
    // setCategory(9);
    // setScore(0);
    // setDifficulty("medium");
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>TYPESCRIPT QUIZ</h1>
        {showAlert && (
          <>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              your filter set Successful— <strong>Start Quiz Now!</strong>
            </Alert>
            <br />
            <br />
          </>
        )}
        {!showAlert && gameOver ? (
          <Form formDataHandler={formDataHandler} />
        ) : null}
        {showAlert && gameOver ? (
          <button className="start" onClick={startTrivia}>
            {" "}
            start Quiz
          </button>
        ) : null}
        {/* {!gameOver ? <p className="score">Score: {score}</p> : null} */}
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

        {/* {!gameOver && !loading && userAnswers.length === noOfQuestion && (
          <button onClick={startAgainHandler} className={"start"}>
            start again
          </button>
        )} */}
        {!gameOver && !loading && userAnswers.length === noOfQuestion && (
          <button onClick={startAgainHandler} className={"start"}>
            show result
          </button>
        )}
        {showResult && (
          <Score
            open={open}
            handleClose={handleClose}
            score={score}
            total={noOfQuestion}
          />
        )}
      </Wrapper>
    </>
  );
};

export default App;
