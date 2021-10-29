import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const UseInput = (key, validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [localValue, setLocalValue] = useLocalStorage(key, "");

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
    setLocalValue(event.target.value);
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
    localValue: localValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueInputChangeHandler,
    valueInputBlurHandler,
    reset,
  };
};

export default UseInput;
