import { MutationResult, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

type login = {
  phoneNumber: string
}

// type verify = {
//   phoneNumber: string
//   code: string
// }

interface responVerify {
  verifyLoginWithPhone: verifyLoginWithPhone
}

interface verifyLoginWithPhone {
  token: string
}

const query = {
  loginWithPhone: gql`
    mutation loginWithPhone($phoneNumber: PhoneNumber!) {
      loginWithPhone(input: { phoneNumber: $phoneNumber }) {
        message
      }
    }
  `,
  verifyOtpPhone: gql`
    mutation verifyLogin($phoneNumber: PhoneNumber!, $code: String!) {
      verifyLoginWithPhone(input: { phoneNumber: $phoneNumber, code: $code }) {
        token
        user {
          id
          firstName
        }
      }
    }
  `,
}

function AuthMutation() {
  const [login] = useMutation<{ input: login }>(query.loginWithPhone)
  const [verify] = useMutation<responVerify>(query.verifyOtpPhone)
  return { login, verify }
}

export { AuthMutation }
