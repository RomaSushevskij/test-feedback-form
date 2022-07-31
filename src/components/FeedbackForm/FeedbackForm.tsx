import { memo } from "react";

import { EMPTY_STRING } from "../../constants";
import { useField } from "../../hooks";
import {
  IS_EMPTY,
  MAX_LENGTH,
  MAX_LENGTH_VALUE,
  MIN_LENGTH,
  MIN_LENGTH_VALUE,
  VALID_EMAIL,
  VALID_FULL_NAME,
} from "../../hooks/useValidation/useValidation";
import { FeedbackFormNames } from "../../store/reducers/feedbackForm/enums";
import { sendFeedbackForm } from "../../store/reducers/feedbackForm/feedbackFormReducer";
import { Button } from "../Button";
import { Input } from "../Input";
import { Textarea } from "../Textarea";

import style from "./FeedbackForm.module.scss";

export const FeedbackForm = memo(() => {
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
            placeholder="FIRSTNAME LASTNAME"
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
          <Button className={style.primaryButton} onClick={sendFeedbackForm}>
            Отправить
          </Button>
        </div>
      </form>
    </div>
  );
});
