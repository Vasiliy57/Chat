import React from "react"

interface IUser {
  userName?: string
  email?: string
  img?: string
  key?: string | number
}

export interface IFriendsProps {
  data: Array<IUser>
  renderDialog?: React.ReactNode
}