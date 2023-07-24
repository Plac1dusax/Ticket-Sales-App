const accounts = []

export default function handler(req, res) {
  const { method, body } = req

  switch (method) {
    case "GET":
      res.status(200).json(accounts)
      break
    case "POST":
      if (body.action === "create") {
        const isAlreadyInUse = accounts.some(
          (account) => account.newEmail === body.newEmail
        )

        if (isAlreadyInUse) {
          return res
            .status(400)
            .json({ error: "Name and email fields are required." })
        } else {
          accounts.push(body)
          return res.status(200).json(accounts)
        }
      } else if (body.action === "login") {
        const isValidAccount = accounts.filter((account) => {
          if (
            account.newNameAndSurname === body.newNameAndSurname &&
            account.newPassword === body.newPassword
          ) {
            return true
          }
        })

        return isValidAccount
          ? res.status(200).json(isValidAccount)
          : res.status(400).json({ error: "Invalid account" })
      }

      break
  }
}
