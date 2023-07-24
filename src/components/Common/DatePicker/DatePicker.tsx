"use client"

import React, { useState, useEffect, useMemo } from "react"
import {
  format,
  getDaysInMonth,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isBefore,
  getYear,
} from "date-fns"
import { BiLeftArrow } from "react-icons/bi"
import { BiRightArrow } from "react-icons/bi"
import { LiaAngleDownSolid } from "react-icons/lia"
import { LiaAngleUpSolid } from "react-icons/lia"
import styles from "../../../styles/common/datePicker.module.css"

interface DatePickerProps {
  location: string
  setDateInputValue: Function
  setEmptyDate: Function
  setShowDatePicker: Function
}

export default function DatePicker({
  location: location,
  setDateInputValue: setDateInputValue,
  setEmptyDate: setEmptyDate,
  setShowDatePicker: setShowDatePicker,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentDate, setCurrentDate] = useState<Date | number>(Date.now())
  const [days, setDays] = useState<Array<Date>>([])
  const [years, setYears] = useState([])
  const [showYears, setShowYears] = useState<boolean>(false)
  const [previousYears, setPreviousYears] = useState<number[]>([])
  const [nextYears, setNextYears] = useState<number[]>([])
  const [disablePrevMonth, setDisablePrevMonth] = useState<boolean>(false)
  const today = new Date()

  useEffect(() => {
    const startOfMonthDate = startOfMonth(new Date(currentDate))
    const endOfMonthDate = endOfMonth(new Date(currentDate))
    const startDate = startOfWeek(startOfMonthDate, { weekStartsOn: 1 })
    const endDate = endOfWeek(endOfMonthDate, { weekStartsOn: 1 })

    const currentMonthDays = []
    let x = startDate
    while (x <= endDate) {
      currentMonthDays.push(x)
      x = addDays(x, 1)
    }

    setDays(currentMonthDays)
  }, [currentDate])

  function handlePreviousMonth() {
    const prevMonthDate = subMonths(currentDate, 1)

    if (selectedDate && isSameMonth(today, currentDate)) {
      location === "home" ? setDisablePrevMonth(true) : null
    } else {
      setCurrentDate(prevMonthDate)
    }
  }

  function handleNextMonth() {
    const nextMonthDate = addMonths(currentDate, 1)
    setCurrentDate(nextMonthDate)
  }

  useEffect(() => {
    if (selectedDate === null) {
      setEmptyDate(true)
      setSelectedDate(new Date())
    } else {
      setEmptyDate(false)
    }
  }, [selectedDate])

  useEffect(() => {
    if (selectedDate) {
      const prevYears = []
      const nextYears = []
      const currentYear = getYear(selectedDate)
      for (let i = 1; i <= 40; i++) {
        prevYears.push(currentYear - i)
      }

      for (let i = 1; i <= 40; i++) {
        nextYears.push(currentYear + i)
      }

      setPreviousYears(prevYears)
      setNextYears(nextYears)
    }
  }, [])

  function handleShowYears() {
    setShowYears(!showYears)
  }

  useEffect(() => {
    setDateInputValue(selectedDate)
  }, [selectedDate])

  return (
    <div className={styles.date_picker_wrapper}>
      <div className={styles.date_picker_header}>
        <BiLeftArrow onClick={handlePreviousMonth} />
        <div className={styles.month_and_year}>
          <div className={styles.month}>{format(currentDate, "MMMM")}</div>
          <div className={styles.year}>
            <span>{format(currentDate, "yyyy")}</span>
            {location === "home" ? null : (
              <span className={disablePrevMonth ? styles.button_disabled : ""}>
                <LiaAngleDownSolid onClick={handleShowYears} />
              </span>
            )}
          </div>
        </div>
        <BiRightArrow onClick={handleNextMonth} />
      </div>
      <div className={styles.days}>
        <div className={styles.day}>Mon</div>
        <div className={styles.day}>Tue</div>
        <div className={styles.day}>Wed</div>
        <div className={styles.day}>Thu</div>
        <div className={styles.day}>Fri</div>
        <div className={styles.day}>Sat</div>
        <div className={styles.day}>Sun</div>
        {days.map((date, index) => {
          const isCurrentMonth = isSameMonth(date, currentDate)
          const isToday = isSameDay(date, new Date())
          const isSelected = selectedDate
            ? isSameDay(date, selectedDate)
            : false
          const isPast = isBefore(date, today) && !isToday
          return (
            <div
              key={index}
              className={`
              ${
                isCurrentMonth
                  ? `${styles.date} ${styles.current_month}`
                  : styles.other_month
              }
              ${isToday ? `${styles.date} ${styles.today}` : ""}
              ${isSelected ? `${styles.date} ${styles.selected_day}` : ""}
              ${isPast ? `${styles.date} ${styles.past}` : ""}
            `}
              onClick={() => {
                setSelectedDate(date)
              }}
            >
              {format(date, "d")}
            </div>
          )
        })}
      </div>
      {showYears}
    </div>
  )
}
