interface User {
  id: string
  email: string
  firstName: string
}

interface Message {
  id: string
  data: string
  createdBy: User
}
