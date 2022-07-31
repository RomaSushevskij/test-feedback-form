import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  memo,
} from "react";

import style from "./Input.module.scss";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperInputTextPropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
  customStyle?: string;
};

export const Input = memo(
  ({
    type,
    onChange,
    onChangeText,
    onKeyPress,
    onEnter,
    error,
    className,
    spanClassName,
    name,
    customStyle,

    ...restProps
  }: SuperInputTextPropsType) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
      if (onChangeText) onChangeText(e.currentTarget.value);
    };
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
      if (onKeyPress) onKeyPress(e);
      if (onEnter && e.key === "Enter") onEnter();
    };

    const finalSpanClassName = `${style.error} ${spanClassName || ""}`;
    const finalInputClassName = `${
      error ? `${style.errorInput} ${style.superInput}` : style.superInput
    } ${className}`;

    return (
      <div
        className={
          customStyle ? `${customStyle} ${style.inputWrapper}` : style.inputWrapper
        }
      >
        <input
          name={name}
          type={type}
          onChange={onChangeCallback}
          onKeyPress={onKeyPressCallback}
          className={finalInputClassName}
          {...restProps}
        />
        {error && <div className={finalSpanClassName}>{error}</div>}
      </div>
    );
  },
);
