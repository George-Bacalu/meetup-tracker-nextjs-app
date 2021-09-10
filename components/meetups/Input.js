import React, { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef((props, ref) => {
  const { id, label, type, rows, isInput } = props.inputData;

  return (
    <div className={classes.control}>
      <label htmlFor={id}>{label}</label>
      {isInput && <input ref={ref} type={type} id={id} required />}
      {!isInput && <textarea ref={ref} type={type} id={id} rows={rows} required />}
    </div>
  );
});

export default Input;
