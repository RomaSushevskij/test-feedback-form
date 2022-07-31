import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from "react";

import style from "./Checkbox.module.scss";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperCheckboxPropsType = DefaultInputPropsType & {
  onChangeChecked?: (checked: boolean) => void;
  spanClassName?: string;
};

export const Checkbox: React.FC<SuperCheckboxPropsType> = ({
  onChange,
  onChangeChecked,
  className,
  children,

  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (onChangeChecked) onChangeChecked(e.currentTarget.checked);
  };

  const finalInputClassName = `${style.checkbox} ${className || ""}`;

  return (
    <div className={style.checkbox}>
      <input
        type="checkbox"
        onChange={onChangeCallback}
        className={finalInputClassName}
        {...restProps}
        id="chekcbox1"
      />
      <label htmlFor="chekcbox1">
        <span className={style.checkboxIcon} />
        {children && <span className={style.spanClassName}>{children}</span>}
      </label>
    </div>
  );
};
