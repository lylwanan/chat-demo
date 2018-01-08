export interface MessageInfo {
  time: number
  user: UserInfo
  content: string
}

export interface UserInfo {
  uid: number
  name: string
}

export interface Record {
  [key: string]: MessageInfo[]
}