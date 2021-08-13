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
