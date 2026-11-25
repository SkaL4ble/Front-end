'use client';

import React, { useRef } from 'react';
import { Calendar } from 'lucide-react';

interface DateInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  name: string;
}

export default function DateInput({
  id,
  name,
  className = '',
  disabled = false,
  onClick,
  ...rest
}: DateInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenCalendar = () => {
    const input = inputRef.current;
    if (!input || disabled) return;

    input.focus();

    if (typeof input.showPicker === 'function') {
      try {
        input.showPicker();
      } catch {
        // Fallback silencioso caso o navegador bloqueie o showPicker
      }
    }
  };

  return (
    <div
      className={`date-input-wrapper ${disabled ? 'is-disabled' : ''}`}
      onClick={handleOpenCalendar}
    >
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="date"
        disabled={disabled}
        className={`input-card date-input-field ${className}`.trim()}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
          handleOpenCalendar();
        }}
        {...rest}
      />
      <Calendar aria-hidden="true" className="date-input-icon" size={16} strokeWidth={2}/>
    </div>
  );
}