import React from "react"
import styles from "../../../styles/common/formInput.module.css"

interface FormInputProps {
  type: string
  attribute: string
  value: string
  placeholder: string
  setNewNameAndSurname: Function | null
  setNewPassword: Function | null
  setNewEmail: Function | null
  setNewBirthday: Function | null
  setNewExpirationDate: Function | null
  setNewCVV: Function | null
  setNewCreditCardNumber: Function | null
}

export default function FormInput({
  type: type,
  attribute: attribute,
  value: value,
  placeholder: placeholder,
  setNewNameAndSurname: setNewNameAndSurname,
  setNewPassword: setNewPassword,
  setNewEmail: setNewEmail,
  setNewBirthday: setNewBirthday,
  setNewExpirationDate: setNewExpirationDate,
  setNewCVV: setNewCVV,
  setNewCreditCardNumber: setNewCreditCardNumber,
}: FormInputProps) {
  function handleFormInput(e: any) {
    switch (type) {
      case "text":
        if (setNewNameAndSurname) {
          setNewNameAndSurname(e.target.value)
        }
        break
      case "password":
        if (setNewPassword) {
          setNewPassword(e.target.value)
        }
        break
      case "email":
        if (setNewEmail) {
          setNewEmail(e.target.value)
        }
        break
      case "date":
        if (setNewBirthday) {
          setNewBirthday(e.target.value)
        } else if (setNewExpirationDate) {
          setNewExpirationDate(e.target.value)
        }
        break
      case "number":
        if (setNewCreditCardNumber) {
          setNewCreditCardNumber(e.target.value)
        } else if (setNewCVV) {
          setNewCVV(e.target.value)
        }
        break
    }
  }

  return (
    <div className={styles.form_input_container}>
      <label className={styles.form_input_header} htmlFor={attribute}>
        {value}
      </label>
      <input
        onChange={handleFormInput}
        type={type}
        id={attribute}
        name={attribute}
        placeholder={placeholder}
      />
    </div>
  )
}
