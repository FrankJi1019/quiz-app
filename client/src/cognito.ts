import { CognitoUserPool } from "amazon-cognito-identity-js"
import { constants } from "./constants"

const poolData = {
  UserPoolId: constants.cognito.userPoolId,
  ClientId: constants.cognito.clientId
}

const UserPool = new CognitoUserPool(poolData)

export default UserPool
