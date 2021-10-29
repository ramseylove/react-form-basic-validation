import { useState } from "react";

const UseInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  let valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  // const validateEmail = (email) => {
  //   if (email.trim() !== "" && emailValidator.test(email)) {
  //     console.log("email valid");
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // if (key === "email") {
  //   valueIsValid = emailValidator.test(enteredValue);
  // }

  const valueInputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueInputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueInputChangeHandler,
    valueInputBlurHandler,
    reset,
  };
};

export default UseInput;
