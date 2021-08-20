import { MutationHookOptions, useMutation } from "@apollo/react-hooks"
import { FetchResult } from "apollo-boost"
import gql from "graphql-tag"

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

type AuthMutationResult = {
  login: (options: MutationHookOptions) => Promise<FetchResult<{ message: string }>>
  verify: (options: MutationHookOptions) => Promise<FetchResult<responVerify>>
}

function AuthMutation(): AuthMutationResult {
  const [login] = useMutation<{ message: string }>(query.loginWithPhone)
  const [verify] = useMutation<responVerify>(query.verifyOtpPhone)
  return { login, verify }
}

export { AuthMutation }
