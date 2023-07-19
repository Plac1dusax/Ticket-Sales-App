"use client"

import React, { useState, useEffect } from "react"
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
} from "date-fns"
import { BiLeftArrow } from "react-icons/bi"
import { BiRightArrow } from "react-icons/bi"
import { LiaAngleDownSolid } from "react-icons/lia"
import { LiaAngleUpSolid } from "react-icons/lia"
import styles from "../../../styles/common/datePicker.module.css"

export default function DatePicker() {
  const [currentDay, setCurrentDay] = useState<number>()
  const [currentMonth, setCurrentMonth] = useState<number>()
  const [currentYear, setCurrentYear] = useState<number>()
  const [currentMonthName, setCurrentMonthName] = useState<string>()

  const currentDate = Date.now()
  const day = parseInt(format(currentDate, "dd"))
  const month = parseInt(format(currentDate, "MM"))
  const year = parseInt(format(currentDate, "yyyy"))
  const monthName = format(currentDate, "MMMM")
  const startDate = startOfWeek(startOfMonth(currentDate))
  const endDate = endOfWeek(endOfMonth(currentDate))

  useEffect(() => {
    setCurrentDay(day)
    setCurrentMonth(month)
    setCurrentYear(year)
    setCurrentMonthName(monthName)
  }, [])

  const days = []

  let x = startDate
  while (x <= endDate) {
    days.push(x)
    x = addDays(x, 1)
  }

  console.log(startDate)

  return (
    <div className={styles.date_picker_wrapper}>
      <div className={styles.date_picker_header}>
        <BiLeftArrow />
        <div className={styles.month_and_year}>
          <div className={styles.month}>{currentMonthName}</div>
          <div className={styles.year}>
            <span>Year</span>
            <span>
              <LiaAngleDownSolid />
            </span>
          </div>
        </div>
        <BiRightArrow />
      </div>
      <div className={styles.days}>
        {days.map((date, index) => {
          const isCurrentMonth = isSameMonth(date, currentDate)
          return (
            <div
              key={index}
              className={`${
                isCurrentMonth ? styles.current_month : styles.other_month
              }`}
            >
              {format(date, "d")}
            </div>
          )
        })}
      </div>
    </div>
  )
}
