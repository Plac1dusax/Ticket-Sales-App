"use client"

import React, { useState } from "react"

interface ProviderProps {
  children: any
}

export const AccountContext = React.createContext<any>({})

export default function AccountProvider({ children }: ProviderProps) {
  const [account, setAccount] = useState<any>()

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  )
}
