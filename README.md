# Quizzy

## Set up

### Environment Setup

1. Please make sure you have [dotnet](https://dotnet.microsoft.com/en-us/download), [Node](https://nodejs.org/en/download/), and [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) installed on your device.
2. Add the SQL Server connection string in the "appsetting.json"
3. Open a terminal and direct to the Server folder, where the current directory should contain "Models" folder
4. Execute `dotnet ef database update`
5. Add the .env file to the client folder, below is a example .env file

```
REACT_APP_SERVER_URL=https://localhost:8000

REACT_APP_COGNITO_USER_POOL_ID=us-east-1_zgpnQkiko
REACT_APP_COGNITO_CLIENT_ID=qr1el3uvai1mckplgqto6ps8g
REACT_APP_COGNITO_REGION=us-east-1
```

### Running the Project

1. Open a terminal and direct to the Server side folder, where the current directory should contain "Program.cs"
2. Execute `dotnet run`
3. Open another terminal and direct to the client side folder, where the current directory should contain "package.json"
4. Execute `npm start`