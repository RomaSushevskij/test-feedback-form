import { ClipboardEvent, FormEvent, KeyboardEvent } from "react";

import { EMPTY_STRING } from "../../constants";

import {
  EIGHT_SYMBOLS,
  ELEVEN_SYMBOLS,
  FIVE_SYMBOLS,
  FOUR_SYMBOLS,
  NINE_SYMBOLS,
  ONE_SYMBOL,
  SEVEN_SYMBOLS,
  SIXTEEN_SYMBOLS,
  TEN_SYMBOLS,
  VALID_FIRST_NUMBERS,
  ZERO_SYMBOLS,
} from "./constants";

export const getInputNumbersValue = (value: string) => value.replace(/\D/g, "");

export const useInputPhoneMask = (setTelInput: (telInputValue: string) => void) => {
  const onTelInputPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const inputNumbersValue = getInputNumbersValue(input.value);
    const pasted = e.clipboardData || navigator.clipboard;

    if (pasted) {
      const pastedTest = pasted.getData("Text");

      if (/\D/g.test(pastedTest)) {
        setTelInput(inputNumbersValue);
      }
    }
  };

  const onTelInput = (e: FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;

    const inputNumbersValue = getInputNumbersValue(input.value);
    let formattedInputValue = EMPTY_STRING;
    const { selectionStart } = input;

    if (!inputNumbersValue) {
      setTelInput(EMPTY_STRING);

      return;
    }
    if (input.value.length !== selectionStart) {
      setTelInput(inputNumbersValue);
    }

    const firstCharOfInputValue = inputNumbersValue[0];

    if (VALID_FIRST_NUMBERS.includes(firstCharOfInputValue)) {
      if (firstCharOfInputValue === "9") {
        const currentInputValue = `7${inputNumbersValue}`;

        setTelInput(currentInputValue);
      }
      const firstSymbols = firstCharOfInputValue === "8" ? "8" : "+7";

      formattedInputValue = `${firstSymbols} `;

      if (inputNumbersValue.length > ONE_SYMBOL) {
        formattedInputValue += `(${inputNumbersValue.slice(ONE_SYMBOL, FOUR_SYMBOLS)}`;
      }

      if (inputNumbersValue.length >= FIVE_SYMBOLS) {
        formattedInputValue += `) ${inputNumbersValue.slice(
          FOUR_SYMBOLS,
          SEVEN_SYMBOLS,
        )}`;
      }

      if (inputNumbersValue.length >= EIGHT_SYMBOLS) {
        formattedInputValue += `-${inputNumbersValue.slice(SEVEN_SYMBOLS, NINE_SYMBOLS)}`;
      }

      if (inputNumbersValue.length >= TEN_SYMBOLS) {
        formattedInputValue += `-${inputNumbersValue.slice(
          NINE_SYMBOLS,
          ELEVEN_SYMBOLS,
        )}`;
      }

      setTelInput(formattedInputValue);
    } else {
      const currentInputValue = `+${inputNumbersValue.slice(
        ZERO_SYMBOLS,
        SIXTEEN_SYMBOLS,
      )}`;

      setTelInput(currentInputValue);
    }
  };

  const onTelInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const inputNumbersValue = getInputNumbersValue(e.currentTarget.value);

    if (e.key === "Backspace" && inputNumbersValue.length === ONE_SYMBOL) {
      setTelInput("");
    }
  };

  return { onTelInputPaste, onTelInput, onTelInputKeyDown };
};
