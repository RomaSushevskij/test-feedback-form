import { memo, useState, MouseEvent } from "react";

import { EMPTY_STRING } from "../../constants";
import { useAppDispatch, useAppSelector, useField } from "../../hooks";
import {
  IS_EMPTY,
  MAX_LENGTH,
  MAX_LENGTH_VALUE,
  MIN_LENGTH,
  MIN_LENGTH_VALUE,
  VALID_EMAIL,
  VALID_FULL_NAME,
} from "../../hooks/useValidation/constatnts";
import {
  sendFeedbackForm,
  FeedbackFormNames,
  FeedbackFormDataType,
  selectMessage,
  selectResponseStatus,
  selectSendingStatus,
} from "../../store";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Input } from "../Input";
import { Preloader } from "../Preloader";
import { SNACK_BAR_TYPES, SnackBar } from "../SnackBar";
import { Textarea } from "../Textarea";

import style from "./FeedbackForm.module.scss";

export const FeedbackForm = memo(() => {
  const dispatch = useAppDispatch();
  const sendingFormStatus = useAppSelector(selectSendingStatus);
  const responseMessage = useAppSelector(selectMessage);
  const responseStatus = useAppSelector(selectResponseStatus);

  const snackBarType =
    responseStatus && responseStatus === "success"
      ? SNACK_BAR_TYPES.SUCCESS
      : SNACK_BAR_TYPES.ERROR;

  const fullName = useField({ [IS_EMPTY]: true, [VALID_FULL_NAME]: false });
  const message = useField({
    [IS_EMPTY]: true,
    [MIN_LENGTH]: MIN_LENGTH_VALUE,
    [MAX_LENGTH]: MAX_LENGTH_VALUE,
  });
  const email = useField({
    [IS_EMPTY]: true,
    [VALID_EMAIL]: false,
  });
  const phone = useField({
    [IS_EMPTY]: true,
  });
  const birthDate = useField({ [IS_EMPTY]: true });
  const errorOfFullNameField = fullName.isTouched ? fullName.errors : EMPTY_STRING;
  const errorOfMessageField = message.isTouched ? message.errors : EMPTY_STRING;
  const errorOfEmailField = email.isTouched ? email.errors : EMPTY_STRING;
  const errorOfPhoneField = phone.isTouched ? phone.errors : EMPTY_STRING;
  const errorOfBirthDateField = birthDate.isTouched ? birthDate.errors : EMPTY_STRING;
  const isButtonDisabled =
    !fullName.isValidInput ||
    !email.isValidInput ||
    !phone.isValidInput ||
    !birthDate.isValidInput ||
    !message.isValidInput;

  // testing the result of the request
  const [requestStatus, setRequestStatus] = useState<boolean>(false);

  const onButtonSubmitClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData: FeedbackFormDataType = {
      fullName: fullName.fieldValue,
      email: email.fieldValue,
      phone: phone.fieldValue,
      birthDate: phone.fieldValue,
      message: message.fieldValue,
    };

    const resultAction = await dispatch(sendFeedbackForm({ formData, requestStatus }));

    console.log(resultAction);
    if (!sendFeedbackForm.rejected.match(resultAction)) {
      if (resultAction.payload?.status === "success") {
        fullName.resetInputValue();
        email.resetInputValue();
        phone.resetInputValue();
        birthDate.resetInputValue();
        message.resetInputValue();
      }
    }
  };

  return (
    <div className={style.formWrapper}>
      <form>
        <h1>Feedback form</h1>
        <div className={style.field}>
          <label htmlFor="Имя Фамилия"> Имя Фамилия</label>
          <Input
            error={errorOfFullNameField}
            value={fullName.fieldValue}
            onChange={e => fullName.handleFieldValueChange(e, true)}
            onBlur={fullName.handleFieldValueBlur}
            type="text"
            name={FeedbackFormNames.fullName}
            placeholder="FIRST LAST"
            id="FullName"
          />
        </div>
        <div className={style.field}>
          <label htmlFor="E-mail"> E-mail</label>
          <Input
            error={errorOfEmailField}
            value={email.fieldValue}
            onChange={email.handleFieldValueChange}
            onBlur={email.handleFieldValueBlur}
            type="email"
            name={FeedbackFormNames.email}
            placeholder="mail@example.com"
            id="email"
          />
        </div>
        <div className={style.field}>
          <label htmlFor="Tel"> Номер телефона</label>
          <Input
            error={errorOfPhoneField}
            value={phone.fieldValue}
            onInput={phone.onTelInput}
            onPaste={phone.onTelInputPaste}
            onKeyDown={phone.onTelInputKeyDown}
            onBlur={phone.handleFieldValueBlur}
            type="tel"
            name={FeedbackFormNames.phone}
            placeholder="+7 (___) ___-__-__"
            maxLength={18}
            id="Tel"
          />
        </div>
        <div className={style.field}>
          <label htmlFor="birthDate"> Дата рождения</label>
          <Input
            error={errorOfBirthDateField}
            value={birthDate.fieldValue}
            onChange={birthDate.handleFieldValueChange}
            onBlur={birthDate.handleFieldValueBlur}
            type="date"
            name={FeedbackFormNames.birthDate}
            id="birthDate"
          />
        </div>
        <div className={style.field}>
          <label htmlFor="Message"> Сообщение </label>
          <Textarea
            value={message.fieldValue}
            onChange={message.handleFieldValueChange}
            onBlur={message.handleFieldValueBlur}
            error={errorOfMessageField}
            name={FeedbackFormNames.message}
            placeholder="Сообщение"
            id="Message"
          />
        </div>
        <div className={style.buttonBlock}>
          {sendingFormStatus === "loading" ? (
            <Preloader />
          ) : (
            <Button
              type="submit"
              className={style.primaryButton}
              onClick={onButtonSubmitClick}
              disabled={isButtonDisabled}
            >
              Отправить
            </Button>
          )}
        </div>
      </form>
      {responseMessage && <SnackBar message={responseMessage} type={snackBarType} />}
      <div className={style.checkBoxBlock}>
        {" "}
        <Checkbox checked={requestStatus} onChangeChecked={setRequestStatus}>
          Is the request error?
        </Checkbox>
      </div>
    </div>
  );
});
