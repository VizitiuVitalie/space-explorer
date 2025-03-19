import React, { useState } from "react";
import styles from "./DatePicker.module.css";

interface DatePickerProps {
  onDateChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value.split("-").reverse().join("/");
    setSelectedDate(date);
  };

  const handleSearchClick = () => {
    onDateChange(selectedDate);
  };

  return (
    <div className={styles.datePicker}>
      <label htmlFor="apod-date">Select Date:</label>
      <input
        type="date"
        id="apod-date"
        name="apod-date"
        min="1995-06-16"
        max={new Date().toISOString().split("T")[0]}
        onChange={handleDateChange}
      />
      <button onClick={handleSearchClick} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
};

export default DatePicker;