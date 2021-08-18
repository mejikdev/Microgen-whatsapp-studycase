interface User {
  id: string
  email: string
  firstName: string
  role: string
  avatar: string
  phoneNumber: string
}

interface Conversation {
  id: string
  name: string
  messages: Message[]
  people: User[]
}

interface Message {
  id: string
  text?: string
  file?: string
  recipient: User
  createdBy: User
  createdAt: string
}
