"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import CustomSelect, { SelectOption } from "@/src/components/ui/select/CustomSelect";

export interface FilterField {
  key: string;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  includeNoneOption?: boolean;
  noneLabel?: string;
}

interface FilterMenuProps {
  id?: string;
  title?: string;
  ariaLabel?: string;
  fields: FilterField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onClear: () => void;
}

export default function FilterMenu({
  id = "menu-filtros",
  title = "Filtrar por",
  ariaLabel = "Filtros",
  fields,
  values,
  onChange,
  onClear,
}: FilterMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

  const activeFiltersCount = Object.values(values).filter(Boolean).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={filtersRef} className="filter-wrapper">
      <button
        type="button"
        className="filter-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="7" y1="12" x2="17" y2="12" />
          <line x1="10" y1="18" x2="14" y2="18" />
        </svg>

        <span>Filtros</span>

        {activeFiltersCount > 0 && (
          <span className="filter-badge">{activeFiltersCount}</span>
        )}

        <ChevronDown
          size={18}
          strokeWidth={2.4}
          className={`filter-chevron ${isOpen ? "open" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          id={id}
          className="filters-dropdown"
          role="region"
          aria-label={ariaLabel}
        >
          <div className="filters-dropdown-header">
            <span>{title}</span>
            {activeFiltersCount > 0 && (
              <button
                type="button"
                className="filters-clear-btn"
                onClick={onClear}
              >
                Limpar
              </button>
            )}
          </div>

          {fields.map((field) => {
            const shouldIncludeNone = field.includeNoneOption !== false;
            const fieldOptions: SelectOption[] = shouldIncludeNone
              ? [
                  { value: "nenhum", label: field.noneLabel ?? "Nenhum" },
                  ...field.options,
                ]
              : field.options;

            return (
              <div key={field.key} className="form-group">
                <label
                  htmlFor={`${id}-${field.key}`}
                  className="form-field-label"
                >
                  {field.label}
                </label>
                <CustomSelect
                  id={`${id}-${field.key}`}
                  name={field.key}
                  value={values[field.key] ?? ""}
                  onChange={(val) =>
                    onChange(field.key, val === "nenhum" ? "" : val)
                  }
                  placeholder={field.placeholder ?? "Todos"}
                  dropdownTitle={field.label}
                  options={fieldOptions}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}