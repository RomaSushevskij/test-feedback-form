import React, {
  ChangeEvent,
  DetailedHTMLProps,
  KeyboardEvent,
  memo,
  TextareaHTMLAttributes,
} from "react";

import style from "./Textarea.module.scss";

type DefaultTextAreaPropsType = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

type SuperInputTextPropsType = DefaultTextAreaPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
  customStyle?: string;
};

export const Textarea = memo(
  ({
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
    const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) onChange(e);

      if (onChangeText) onChangeText(e.currentTarget.value);
    };
    const onKeyPressCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (onKeyPress) onKeyPress(e);
      if (onEnter && e.key === "Enter") onEnter();
    };

    const finalSpanClassName = `${style.error} ${spanClassName || ""}`;
    const finalInputClassName = `${
      error ? `${style.errorTextarea} ${style.superTextarea}` : style.superTextarea
    } ${className}`;

    return (
      <div
        className={
          customStyle ? `${customStyle} ${style.textAreaWrapper}` : style.textAreaWrapper
        }
      >
        <textarea
          name={name}
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
