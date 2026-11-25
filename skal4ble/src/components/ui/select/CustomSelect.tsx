"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id?: string;
  name: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  dropdownTitle?: string;
  required?: boolean;
}

export default function CustomSelect({
  id,
  name,
  options,
  value,
  defaultValue = "",
  onChange,
  placeholder = "Selecione",
  dropdownTitle,
  required = false,
}: CustomSelectProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedValue = isControlled ? value : internalValue;
  const selectedOption = options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleToggle = () => {
    if (!isOpen && wrapperRef.current) {
      const triggerRect = wrapperRef.current.getBoundingClientRect();
      const mainEl = wrapperRef.current.closest("main");
      const containerBottom = mainEl
        ? mainEl.getBoundingClientRect().bottom
        : window.innerHeight;
      const containerTop = mainEl
        ? mainEl.getBoundingClientRect().top
        : 0;

      const spaceBelow = containerBottom - triggerRect.bottom;
      const spaceAbove = triggerRect.top - containerTop;

      // Abre para cima se não houver espaço suficiente abaixo (~260px)
      setOpenUpward(spaceBelow < 260 && spaceAbove > spaceBelow);
    }

    setIsOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: string) => {
    if (!isControlled) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      className={`custom-select-wrapper ${isOpen ? "is-open" : ""}`}
      ref={wrapperRef}
    >
      {/* Input oculto para manter o envio via FormData e a validação nativa required */}
      <input
        type="text"
        name={name}
        value={selectedValue}
        onChange={() => {}}
        required={required}
        tabIndex={-1}
        aria-hidden="true"
        className="custom-select-hidden-validator"
      />

      <button
        id={id}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={handleToggle}
        className={`input-card custom-select-trigger ${
          isOpen ? "is-open" : ""
        }`}
      >
        <span
          className={
            selectedOption
              ? "custom-select-value"
              : "custom-select-placeholder"
          }
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <ChevronDown
          size={17}
          strokeWidth={2.4}
          className={`custom-select-chevron ${isOpen ? "rotate" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`custom-select-dropdown ${
            openUpward ? "open-upward" : ""
          }`}
          role="listbox"
        >
          {dropdownTitle && (
            <div className="custom-select-header">
              <span>{dropdownTitle}</span>
            </div>
          )}

          <div className="custom-select-options">
            {options.map((option) => {
              const isSelected = option.value === selectedValue;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(option.value)}
                  className={`custom-select-option ${
                    isSelected ? "selected" : ""
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <span className="custom-select-check">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}