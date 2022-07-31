import { useCallback, useMemo, useState } from "react";

import { EMPTY_STRING } from "../../constants";
import { useInputPhoneMask } from "../useInputPhoneMask";
import { useValidation } from "../useValidation";

import { EventFieldValueType } from "./types";

export const useField = (validations: any, initialValue: string = EMPTY_STRING) => {
  const [fieldValue, setFieldValue] = useState<string>(initialValue);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valid = useValidation(fieldValue, validations);
  const phoneMask = useInputPhoneMask(setFieldValue);

  const handleSetFieldValue = useCallback(
    (newFieldValue: string) => setFieldValue(newFieldValue),
    [],
  );
  const handleFieldValueChange = useCallback(
    (event: EventFieldValueType, isUpperCase: boolean = false): void => {
      const { value } = event.currentTarget;
      const resultValue = isUpperCase ? value.toUpperCase() : value;

      handleSetFieldValue(resultValue);
    },
    [handleSetFieldValue],
  );
  const handleFieldValueBlur = useCallback(() => {
    setIsTouched(true);
  }, [setIsTouched]);
  const resetInputValue = useCallback(() => {
    setFieldValue(EMPTY_STRING);
  }, [setFieldValue]);

  return useMemo(
    () => ({
      fieldValue,
      handleFieldValueChange,
      isTouched,
      handleFieldValueBlur,
      resetInputValue,
      ...valid,
      ...phoneMask,
    }),
    [
      fieldValue,
      handleFieldValueChange,
      isTouched,
      handleFieldValueBlur,
      valid,
      validations,
    ],
  );
};
