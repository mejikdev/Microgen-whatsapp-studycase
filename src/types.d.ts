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
  unreadedMessageCount?: number
  messages: Message[]
  people: User[]
}

interface Message {
  id: string
  text?: string
  file?: string
  recipient: User
  createdBy?: User
  status?: string
  createdAt: string
  conversation?: Conversation
}

interface Contact {
  id: string
  users: User[]
}
