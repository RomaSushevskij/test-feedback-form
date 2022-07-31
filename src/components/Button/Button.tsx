import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import paperStyle from "../../common/styles/classes.module.scss";

import style from "./Button.module.scss";

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType & {
  red?: boolean;
};

export const Button: React.FC<SuperButtonPropsType> = ({
  red,
  className,
  type,
  ...restProps
}) => {
  const finalClassName = `${red ? style.red : style.default} ${className}`;

  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={`${finalClassName} ${paperStyle.shadowPaper} ${paperStyle.relative}`}
      data-z="paper"
      data-hover-z="paper-1"
      {...restProps}
    />
  );
};
