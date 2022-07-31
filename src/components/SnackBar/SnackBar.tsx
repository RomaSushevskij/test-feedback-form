import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons/faCircleExclamation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from "./SnackBar.module.scss";

export enum SNACK_BAR_TYPES {
  ERROR = "error",
  SUCCESS = "success",
}

type ErrorBarPropsType = {
  message: string;
  type: SNACK_BAR_TYPES;
};

export const SnackBar = ({ message, type }: ErrorBarPropsType) => {
  let finalClassName;

  if (type === SNACK_BAR_TYPES.SUCCESS) {
    finalClassName = `${style.snackBarWrapper} ${style.successBarWrapper}`;
  } else if (type === SNACK_BAR_TYPES.ERROR) {
    finalClassName = `${style.snackBarWrapper} ${style.errorBarWrapper}`;
  } else {
    finalClassName = style.snackBarWrapper;
  }

  return (
    <div className={finalClassName}>
      <div className={style.icon}>
        <FontAwesomeIcon
          icon={type === SNACK_BAR_TYPES.SUCCESS ? faCircleCheck : faCircleExclamation}
        />
      </div>
      <p>{message}</p>
    </div>
  );
};
