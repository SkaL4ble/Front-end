"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";

interface CustomDatePickerProps {
  id?: string;
  name?: string;
  value: string; // Formato "YYYY-MM-DD" ou ""
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  minDate?: string; // Formato "YYYY-MM-DD"
  maxDate?: string; // Formato "YYYY-MM-DD"
}

const WEEKDAYS_PT = ["D", "S", "T", "Q", "Q", "S", "S"];

function parseIsoDate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(year, month, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatBrDate(iso: string): string {
  const parsed = parseIsoDate(iso);
  if (!parsed) return "";
  const d = String(parsed.getDate()).padStart(2, "0");
  const m = String(parsed.getMonth() + 1).padStart(2, "0");
  const y = parsed.getFullYear();
  return `${d}/${m}/${y}`;
}

export function CustomDatePicker({
  id,
  name,
  value,
  onChange,
  placeholder = "dd/mm/aaaa",
  required = false,
  minDate,
  maxDate,
}: CustomDatePickerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedDate = useMemo(() => parseIsoDate(value), [value]);
  const minParsed = useMemo(() => (minDate ? parseIsoDate(minDate) : null), [minDate]);
  const maxParsed = useMemo(() => (maxDate ? parseIsoDate(maxDate) : null), [maxDate]);

  const initialViewDate = selectedDate ?? new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [viewYear, setViewYear] = useState(initialViewDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialViewDate.getMonth());

  useEffect(() => {
    if (selectedDate) {
      setViewYear(selectedDate.getFullYear());
      setViewMonth(selectedDate.getMonth());
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const popoverHeight = 360;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setOpenUpward(spaceBelow < popoverHeight && spaceAbove > popoverHeight + 16);
    }
    setIsOpen((prev) => !prev);
  };

  const monthTitle = useMemo(() => {
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      year: "numeric",
    });
    return formatter.format(new Date(viewYear, viewMonth, 1));
  }, [viewYear, viewMonth]);

  const calendarDays = useMemo(() => {
    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    const startWeekday = firstOfMonth.getDay(); // 0 = Domingo
    const gridStart = new Date(viewYear, viewMonth, 1 - startWeekday);

    const today = new Date();
    const todayIso = toIsoDate(today);

    return Array.from({ length: 42 }, (_, idx) => {
      const current = new Date(
        gridStart.getFullYear(),
        gridStart.getMonth(),
        gridStart.getDate() + idx
      );
      const iso = toIsoDate(current);
      const isOutsideMonth = current.getMonth() !== viewMonth;
      const isSelected = value === iso;
      const isToday = todayIso === iso;

      const isBeforeMin = minParsed ? current < minParsed : false;
      const isAfterMax = maxParsed ? current > maxParsed : false;
      const isDisabled = isBeforeMin || isAfterMax;

      return {
        key: iso,
        day: current.getDate(),
        iso,
        isOutsideMonth,
        isSelected,
        isToday,
        isDisabled,
      };
    });
  }, [viewYear, viewMonth, value, minParsed, maxParsed]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (iso: string, disabled: boolean) => {
    if (disabled) return;
    onChange(iso);
    setIsOpen(false);
  };

  const handleToday = () => {
    const now = new Date();
    const iso = toIsoDate(now);
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    onChange(iso);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setIsOpen(false);
  };

  const formattedValue = formatBrDate(value);

  return (
    <div
      ref={wrapperRef}
      className={`datepicker-wrapper ${isOpen ? "is-open" : ""}`}
    >
      {required && (
        <input
          type="text"
          tabIndex={-1}
          aria-hidden="true"
          name={name}
          value={value}
          required
          onChange={() => { }}
          className="datepicker-hidden-validator"
        />
      )}

      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={handleToggle}
        className={`input-card datepicker-trigger ${isOpen ? "is-open" : ""}`}
      >
        <span className="datepicker-trigger-left">
          <Calendar size={17} className="datepicker-icon" />
          <span className={formattedValue ? "datepicker-value" : "datepicker-placeholder"}>
            {formattedValue || placeholder}
          </span>
        </span>
        <ChevronDown
          size={17}
          className={`datepicker-icon ${isOpen ? "rotate" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Selecionar data"
          className={`datepicker-popover ${openUpward ? "open-upward" : ""}`}
        >
          <div className="datepicker-header">
            <span className="datepicker-month-label">{monthTitle}</span>
            <div className="datepicker-nav-group">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Mês anterior"
                className="datepicker-nav-btn"
              >
                <ChevronUp size={16} />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Próximo mês"
                className="datepicker-nav-btn"
              >
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <div className="datepicker-weekdays">
            {WEEKDAYS_PT.map((label, index) => (
              <span key={`${label}-${index}`} className="datepicker-weekday">
                {label}
              </span>
            ))}
          </div>

          <div className="datepicker-grid">
            {calendarDays.map((item) => (
              <button
                key={item.key}
                type="button"
                disabled={item.isDisabled}
                onClick={() => handleSelectDay(item.iso, item.isDisabled)}
                className={[
                  "datepicker-day",
                  item.isOutsideMonth ? "outside-month" : "",
                  item.isToday ? "is-today" : "",
                  item.isSelected ? "is-selected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {item.day}
              </button>
            ))}
          </div>

          <div className="datepicker-footer">
            <button
              type="button"
              onClick={handleClear}
              className="datepicker-footer-btn"
            >
              Limpar
            </button>
            <button
              type="button"
              onClick={handleToday}
              className="datepicker-footer-btn"
            >
              Hoje
            </button>
          </div>
        </div>
      )}
    </div>
  );
}