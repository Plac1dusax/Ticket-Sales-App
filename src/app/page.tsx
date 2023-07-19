import React from "react"
import CustomForm from "@/components/Common/CustomForm/CustomForm"
import styles from "../styles/home/home.module.css"

export default function Home() {
  return (
    <div className={styles.home_page_wrapper}>
      <header className={styles.home_page_header}>
        <h1>Welcome!</h1>
      </header>
      <CustomForm location={"home"} />
    </div>
  )
}
