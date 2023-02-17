import React, { useRef } from "react";
import style from "./Form.module.css";

interface propsData {
  formDataHandler: (
    noOfQuestion: number,
    category: number,
    difficulty: string
  ) => void;
  onstartTrivia: () => void;
}

const Form: React.FC<propsData> = (props) => {
  const numberRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const difficultyRef = useRef<HTMLSelectElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const number = +numberRef.current!.value;
    const category = +categoryRef.current!.value;
    const difficulty = difficultyRef.current!.value;
    props.formDataHandler(number, category, difficulty);
    props.onstartTrivia();
  };

  return (
    <form action="" onSubmit={submitHandler} className={style.form}>
      <div>
        <label htmlFor="noOfQuestion"> No. of Question : </label>
        <input
          type="number"
          name=""
          id=""
          min={5}
          max={20}
          ref={numberRef}
          required
          placeholder="5"
        />
      </div>
      <div>
        <label htmlFor="category"> Select Category : </label>
        <select name="category" id="" ref={categoryRef} required>
          <option value="9">General Knowledge</option>
          <option value="21">Sports</option>
          <option value="23">History</option>
          <option value="18">Science : Computer</option>
          <option value="19">Science : Maths</option>
          <option value="25">Arts</option>
        </select>
      </div>
      <div>
        <label htmlFor="difficulty"> Select Difficulty : </label>
        <select name="difficulty" id="" ref={difficultyRef} required>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div>
        <button>Save</button>
      </div>
    </form>
  );
};

export default Form;
