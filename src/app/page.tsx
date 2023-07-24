import React from "react"
import CustomForm from "@/components/Common/CustomForm/CustomForm"
import styles from "../styles/login/login.module.css"

export default function Login() {
  return (
    <div className={styles.login_page_wrapper}>
      <header className={styles.login_page_header}>
        <h1>Welcome!</h1>
      </header>
      <CustomForm location={"home"} setShowSpinner={null} />
    </div>
  )
}
