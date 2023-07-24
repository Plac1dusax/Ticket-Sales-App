"use client"

import React, { useState, useContext, useEffect } from "react"
import FormInput from "../FormInput/FormInput"
import CustomButton from "../CustomButton/CustomButton"
import Link from "next/link"
import DatePicker from "../DatePicker/DatePicker"
import axios from "axios"
import { useRouter } from "next/navigation"
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox"
import { v4 as uuidv4 } from "uuid"
import { AccountContext } from "@/accountContext/accountContext"
import styles from "../../../styles/common/customForm.module.css"

interface CustomFormProps {
  location: string
  setShowSpinner: Function | null
}

export default function CustomForm({
  location: location,
  setShowSpinner: setShowSpinner,
}: CustomFormProps) {
  const [newNameAndSurname, setNewNameAndSurname] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [newEmail, setNewEmail] = useState<string>("")
  const [newBirthday, setNewBirthday] = useState<Date>()
  const [newCreditCardNumber, setNewCreditCardNumber] = useState<
    number | null
  >()
  const [newCVV, setNewCVV] = useState<number | null>()
  const [newExpirationDate, setNewExpirationDate] = useState<Date>()
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState<boolean>(false)
  const [emptyName, setEmptyName] = useState<boolean>(true)
  const [emptyPassword, setEmptyPassword] = useState<boolean>(true)
  const [emptyEmail, setEmptyEmail] = useState<boolean>(true)
  const [emptyDate, setEmptyDate] = useState<boolean>(true)
  const [invalidAccount, setInvalidAccount] = useState<boolean>(false)
  const [newGender, setNewGender] = useState<string | null>("male")
  const [emptyCreditCardNumber, setEmptyCreditCardNumber] =
    useState<boolean>(true)
  const [emptyCVV, setEmptyCVV] = useState<boolean>(true)
  const [emptyExpirationDate, setEmptyExpirationDate] = useState<boolean>(true)

  const [showErrors, setShowErrors] = useState<boolean>(false)
  const { setAccount } = useContext(AccountContext)

  const router = useRouter()

  async function handleLogin(e: any) {
    e.preventDefault()

    if (newNameAndSurname === "" || newPassword === "") {
      return setShowErrors(true)
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/accounts",
          {
            action: "login",
            newNameAndSurname,
            newPassword,
          }
        )

        if (Array.isArray(response.data) && response.data.length === 0) {
          throw new Error("Invalid account")
        }

        setAccount(response.data)
        setShowErrors(false)
        setInvalidAccount(false)

        router.push("/home")
      } catch (error) {
        setShowErrors(true)
        error ? setInvalidAccount(true) : setInvalidAccount(false)
      }
    }
  }

  async function handleCreateNewAccount(e: any) {
    e.preventDefault()

    if (
      newNameAndSurname === "" ||
      newPassword === "" ||
      newEmail === "" ||
      !newBirthday
    ) {
      setShowErrors(true)
      return
    } else {
      try {
        await axios.post("http://localhost:3000/api/accounts", {
          action: "create",
          id: uuidv4(),
          newNameAndSurname,
          newPassword,
          newEmail,
          newBirthday,
          newGender,
        })
        setShowErrors(false)
        setEmailAlreadyInUse(false)
        router.push("/")
      } catch (error) {
        setShowErrors(true)
        setEmailAlreadyInUse(true)
      }
    }
  }

  function handlePurchase(e: any) {
    e.preventDefault()

    if (
      emptyName ||
      emptyEmail ||
      emptyCreditCardNumber ||
      emptyCVV ||
      emptyExpirationDate
    ) {
      return setShowErrors(true)
    } else {
      if (setShowSpinner) {
        setShowSpinner(true)
      }
      setTimeout(() => {
        router.push("/home")
      }, 1000)
    }
  }

  useEffect(() => {
    if (showErrors) {
      setEmptyName(newNameAndSurname === "")
      setEmptyPassword(newPassword === "")
      setEmptyEmail(newEmail === "")
      setEmptyDate(!newBirthday)
      setEmptyCreditCardNumber(!newCreditCardNumber)
      setEmptyCVV(!newCVV)
      setEmptyExpirationDate(!newExpirationDate)
    }
  }, [
    showErrors,
    newNameAndSurname,
    newPassword,
    newEmail,
    newBirthday,
    newCreditCardNumber,
    newCVV,
    newExpirationDate,
  ])

  if (location === "home") {
    return (
      <form onSubmit={handleLogin} className={styles.login_form}>
        <h2>Login</h2>
        <FormInput
          type={"text"}
          attribute={"name"}
          value={"Name:"}
          placeholder={"Enter your name"}
          setNewNameAndSurname={setNewNameAndSurname}
          setNewPassword={setNewPassword}
          setNewEmail={setNewEmail}
          setNewBirthday={setNewBirthday}
          setNewCreditCardNumber={null}
          setNewCVV={null}
          setNewExpirationDate={null}
        />
        <FormInput
          type={"password"}
          attribute={"password"}
          value={"Password:"}
          placeholder={"Enter your password"}
          setNewNameAndSurname={setNewNameAndSurname}
          setNewPassword={setNewPassword}
          setNewEmail={setNewEmail}
          setNewBirthday={setNewBirthday}
          setNewCreditCardNumber={null}
          setNewCVV={null}
          setNewExpirationDate={null}
        />
        {showErrors ? (
          <div>
            {emptyName && (
              <div className={styles.error_message}>Empty name</div>
            )}
            {emptyPassword && (
              <div className={styles.error_message}>Empty password</div>
            )}
            {invalidAccount && (
              <div className={styles.error_message}>Invalid account</div>
            )}
          </div>
        ) : null}
        <CustomButton
          location={"loginForm"}
          type={"submit"}
          value={"Login"}
          totalPrice={null}
        />
        <div>
          Don't have an account?{" "}
          <span className={styles.sign_up}>
            <Link href={"/signup"}>Sign up</Link>
          </span>
        </div>
      </form>
    )
  } else if (location === "signup") {
    return (
      <form onSubmit={handleCreateNewAccount} className={styles.sign_up_form}>
        <h2>Sign Up</h2>
        <FormInput
          type={"text"}
          attribute={"name"}
          value={"Name and surname:"}
          placeholder={"Enter your name and surname"}
          setNewNameAndSurname={setNewNameAndSurname}
          setNewPassword={null}
          setNewEmail={null}
          setNewBirthday={null}
          setNewCreditCardNumber={null}
          setNewCVV={null}
          setNewExpirationDate={null}
        />
        <FormInput
          type={"password"}
          attribute={"password"}
          value={"Password:"}
          placeholder={"Enter your password"}
          setNewNameAndSurname={null}
          setNewPassword={setNewPassword}
          setNewEmail={null}
          setNewBirthday={null}
          setNewCreditCardNumber={null}
          setNewCVV={null}
          setNewExpirationDate={null}
        />
        <FormInput
          type={"email"}
          attribute={"email"}
          value={"Email:"}
          placeholder={"Enter your email"}
          setNewNameAndSurname={null}
          setNewPassword={null}
          setNewEmail={setNewEmail}
          setNewBirthday={null}
          setNewCreditCardNumber={null}
          setNewCVV={null}
          setNewExpirationDate={null}
        />
        <FormInput
          type={"date"}
          attribute={"date"}
          value={"Birthday:"}
          placeholder={"Enter your birthday"}
          setNewNameAndSurname={null}
          setNewPassword={null}
          setNewEmail={null}
          setNewBirthday={setNewBirthday}
          setNewCreditCardNumber={null}
          setNewCVV={null}
          setNewExpirationDate={null}
        />
        <div className={styles.genders}>
          <div>Gender:</div>
          <div className={styles.gender_checkbox_wrapper}>
            <CustomCheckbox
              gender={"Male"}
              newGender={newGender}
              setNewGender={setNewGender}
            />
            <CustomCheckbox
              gender={"Female"}
              newGender={newGender}
              setNewGender={setNewGender}
            />
          </div>
        </div>
        {showErrors ? (
          <div>
            {emptyName && (
              <div className={styles.error_message}>Empty name</div>
            )}
            {emptyPassword && (
              <div className={styles.error_message}>Empty password</div>
            )}
            {emptyEmail && (
              <div className={styles.error_message}>Empty email</div>
            )}
            {emptyDate && (
              <div className={styles.error_message}>Empty date</div>
            )}
            {emailAlreadyInUse ? (
              <div className={styles.error_message}>
                This email is already in use
              </div>
            ) : null}
          </div>
        ) : null}
        <CustomButton
          location={"signup"}
          type={"submit"}
          value={"Sign up"}
          totalPrice={null}
        />
      </form>
    )
  } else if (location === "purchase") {
    return (
      <form onSubmit={handlePurchase} className={styles.purchase_form}>
        <h2>Purchase</h2>
        <FormInput
          type={"text"}
          attribute={"name"}
          value={"Name and surname:"}
          placeholder={"Enter your name and surname"}
          setNewNameAndSurname={setNewNameAndSurname}
          setNewPassword={null}
          setNewEmail={null}
          setNewBirthday={null}
          setNewCreditCardNumber={null}
          setNewCVV={null}
          setNewExpirationDate={null}
        />
        <FormInput
          type={"email"}
          attribute={"email"}
          value={"Email:"}
          placeholder={"Enter your email"}
          setNewNameAndSurname={null}
          setNewPassword={null}
          setNewEmail={setNewEmail}
          setNewBirthday={null}
          setNewCreditCardNumber={null}
          setNewCVV={null}
          setNewExpirationDate={null}
        />
        <FormInput
          type={"number"}
          attribute={"creditCardNumber"}
          value={"Credit card number:"}
          placeholder={"Enter your credit card number"}
          setNewNameAndSurname={null}
          setNewPassword={null}
          setNewEmail={null}
          setNewBirthday={null}
          setNewCreditCardNumber={setNewCreditCardNumber}
          setNewCVV={null}
          setNewExpirationDate={null}
        />
        <div className={styles.card_information_details}>
          <FormInput
            type={"number"}
            attribute={"cvv"}
            value={"CVV:"}
            placeholder={"Enter your credit card CVV"}
            setNewNameAndSurname={null}
            setNewPassword={null}
            setNewEmail={null}
            setNewBirthday={null}
            setNewCreditCardNumber={null}
            setNewCVV={setNewCVV}
            setNewExpirationDate={null}
          />
          <FormInput
            type={"date"}
            attribute={"expirationDate"}
            value={"Expiration date:"}
            placeholder={"Enter your credit card expiration date"}
            setNewNameAndSurname={null}
            setNewPassword={null}
            setNewEmail={null}
            setNewBirthday={null}
            setNewCreditCardNumber={null}
            setNewCVV={null}
            setNewExpirationDate={setNewExpirationDate}
          />
        </div>
        {showErrors ? (
          <div>
            {emptyName && (
              <div className={styles.error_message}>Empty name</div>
            )}
            {emptyEmail && (
              <div className={styles.error_message}>Empty email</div>
            )}
            {emptyCreditCardNumber && (
              <div className={styles.error_message}>
                Empty credit card number
              </div>
            )}
            {emptyCVV ? (
              <div className={styles.error_message}>Empty CVV</div>
            ) : null}
            {emptyExpirationDate ? (
              <div className={styles.error_message}>Empty expiration date</div>
            ) : null}
          </div>
        ) : null}
        <CustomButton
          location={"purchase"}
          type={"submit"}
          value={"Purchase"}
          totalPrice={null}
        />
      </form>
    )
  }
}
