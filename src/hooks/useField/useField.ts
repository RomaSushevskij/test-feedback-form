import { useCallback, useMemo, useState } from "react";

import { EMPTY_STRING } from "./constants";

export const useField = () => {
  const [fieldValue, setFieldvalue] = useState<string>(EMPTY_STRING);
  const handleSetFieldValue = (fieldValue: string) => setFieldvalue(fieldValue);
  const handleFieldValueChange = useCallback(
    (event: EventFieldValueType): void => {
      handleSetInputValue(event.currentTarget.value);
    },
    [handleSetInputValue],
  );

  return useMemo(
    () => ({ inputValue, handleFieldValueChange }),
    [inputValue, handleFieldValueChange],
  );
};
