import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

type login = {
  phoneNumber: string
}

type verify = {
  phoneNumber: string
  code: string
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

function AuthMutation(): any {
  const [login] = useMutation<{ input: login }>(query.loginWithPhone)
  const [verify] = useMutation<{ input: verify }>(query.verifyOtpPhone)
  return { login, verify }
}

export { AuthMutation }
