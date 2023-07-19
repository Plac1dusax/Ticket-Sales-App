"use client"

import React from "react"
import styles from "../../../styles/common/customButton.module.css"

interface CustomButtonProps {
  location: string
  type: "button" | "submit"
  value: string
}

export default function CustomButton({
  location: location,
  type: type,
  value: value,
}: CustomButtonProps) {
  function handleCustomButtonClick(e: any) {
    switch (location) {
      case "loginForm":
        e.preventDefault()
        break
      case "signup":
        e.preventDefault()
        break
    }
  }

  return (
    <button
      onClick={handleCustomButtonClick}
      className={styles.custom_button}
      type={type}
    >
      {value}
    </button>
  )
}
