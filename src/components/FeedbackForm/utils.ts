import { ClipboardEvent, FormEvent, KeyboardEvent } from "react";

import { EMPTY_STRING } from "../../constants";

const VALID_FIRST_NUMBERS = ["7", "8", "9"];
const ZERO_SYMBOLS = 0;
const ONE_SYMBOL = 1;
const FOUR_SYMBOLS = 4;
const SEVEN_SYMBOLS = 7;
const FIVE_SYMBOLS = 5;
const EIGHT_SYMBOLS = 8;
const NINE_SYMBOLS = 9;
const TEN_SYMBOLS = 10;
const ELEVEN_SYMBOLS = 11;
const SIXTEEN_SYMBOLS = 16;

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
