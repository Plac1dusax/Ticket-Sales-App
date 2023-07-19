import React from "react"
import FormInput from "../FormInput/FormInput"
import CustomButton from "../CustomButton/CustomButton"
import Link from "next/link"
import DatePicker from "../DatePicker/DatePicker"
import styles from "../../../styles/common/customForm.module.css"

interface CustomFormProps {
  location: string
}

export default function LoginForm({ location: location }: CustomFormProps) {
  return location === "home" ? (
    <form className={styles.login_form}>
      <h2>Login</h2>
      <FormInput
        type={"text"}
        attribute={"name"}
        value={"Name:"}
        placeholder={"Enter your name"}
      />
      <FormInput
        type={"password"}
        attribute={"password"}
        value={"Password:"}
        placeholder={"Enter your password"}
      />
      <CustomButton location={"loginForm"} type={"submit"} value={"Login"} />
      <div>
        Don't have an account?{" "}
        <span className={styles.sign_up}>
          <Link href={"/signup"}>Sign up</Link>
        </span>
      </div>
    </form>
  ) : (
    <form className={styles.sign_up_form}>
      <h2>Sign Up</h2>
      <FormInput
        type={"text"}
        attribute={"name"}
        value={"Name:"}
        placeholder={"Enter your name"}
      />
      <FormInput
        type={"password"}
        attribute={"password"}
        value={"Password:"}
        placeholder={"Enter your password"}
      />
      <FormInput
        type={"email"}
        attribute={"email"}
        value={"Email:"}
        placeholder={"Enter your email"}
      />
      <CustomButton location={"signup"} type={"submit"} value={"Sign up"} />
      <div>Date</div>
      <DatePicker />
    </form>
  )
}
