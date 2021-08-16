interface User {
  id: string
  email: string
  firstName: string
  role: string
  avatar: string
  phoneNumber: string
}

interface Message {
  id: string
  data: string
  createdBy: User
}

interface Room {
  id: string
  chats: [Chat]
  users: [User]
}

interface Chat {
  id: string
  room: Room
  message: Text
  file: string
  sender: User
  recipient: User
  createdAt: string
}
