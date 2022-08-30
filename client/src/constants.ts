export const constants = {
  general: {
    backend: process.env.REACT_APP_SERVER_URL as string
  },
  cognito: {
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID as string,
    clientId: process.env.REACT_APP_COGNITO_CLIENT_ID as string,
    region: process.env.REACT_APP_COGNITO_REGION as string
  }
}
