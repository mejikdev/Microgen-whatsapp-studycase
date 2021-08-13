interface User {
  id: string
  email: string
  firstName: string
  role: string
  avatar: string
}

interface Message {
  id: string
  data: string
  createdBy: User
}

interface Room {
  id: string
  chats: [Chat]
}

interface Chat {
  id: string
  message: Text
  toUser: User
  createdAt: string
}
