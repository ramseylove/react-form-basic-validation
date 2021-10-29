import { useEffect, useState } from "react";
import UseInput from "../hooks/use-input";

const emailValidator =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueInputChangeHandler: nameChangeHandler,
    valueInputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = UseInput((value) => value.trim() !== "");

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  // let enteredEmailIsValid = enteredEmail.trim() !== "";

  useEffect(() => {
    if (!emailValidator.test(enteredEmail) && enteredEmail.trim() !== "") {
      setEnteredEmailIsValid(false);
    } else {
      setEnteredEmailIsValid(true);
    }
  }, [enteredEmail]);

  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid && !enteredEmailIsValid) {
      setFormIsValid(false);
      console.log("form is not valid");
      return;
    }

    resetNameInput();

    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = !nameInputHasError
    ? "form-control"
    : "form-control invalid";

  const emailInputClasses = !emailInputIsInvalid
    ? "form-control"
    : "form-control invalid";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
      </div>
      {nameInputHasError && (
        <p className="error-text">Name must not be empty</p>
      )}
      <div className={emailInputClasses}>
        <label htmlFor="email">Your email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
      </div>
      {emailInputIsInvalid && <p className="error-text">Email must be real</p>}
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
