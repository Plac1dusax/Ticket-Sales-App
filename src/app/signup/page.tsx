import React from "react"
import CustomForm from "../../components/Common/CustomForm/CustomForm"
import styles from "../../styles/signup/signUpPage.module.css"

export default function page() {
  return (
    <div className={styles.signup_page_wrapper}>
      <CustomForm location={"signup"} setShowSpinner={null} />
    </div>
  )
}
