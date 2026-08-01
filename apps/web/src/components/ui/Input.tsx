import { forwardRef } from "react";

import "./../../styles/components/input.css";

import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`input ${className}`}
      />
    );
  }
);

Input.displayName = "Input";