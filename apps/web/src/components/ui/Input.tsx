import "./../../styles/components/input.css";

import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`input ${props.className ?? ""}`}
    />
  );
}