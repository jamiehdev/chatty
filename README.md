# Chatty

Chatty is a simple yet powerful chat application designed to facilitate real-time communication. This project is structured as a monorepo containing two main repositories: `ChatAppFrontend` and `ChatAppBackend`.

- **ChatAppFrontend**: Built with Angular 16 and styled using Tailwind CSS, this repository houses the user interface components and the client-side logic of the application.
- **ChatAppBackend**: Developed in C# and .NET 7, this repository contains the server-side logic, handling user authentication and message transmission through SignalR and WebSockets.

## Features

- User Account Creation and Login
- Real-Time Message Sending and Receiving (Currently Local Only)
- Secure Password Hashing (SHA-512) and Storage in SQL Database

## Future Enhancements

- Implement HTTPS to secure communication and prevent password interception.
- Add password confirmation during account creation.
- Set up email confirmation during user registration.
- Introduce a forgotten password recovery feature via email.

## Getting Started

### Cloning the Repository

To get started with Chatty, you need to clone the repository to your local machine. Open a terminal and run the following command:

```sh
git clone https://github.com/jamiehdev/chatty
```

This command will clone both the `ChatAppFrontend` and `ChatAppBackend` repositories to your local machine.

### Prerequisites

- Angular 16
- .NET 7
- SQL Server
- Tailwind CSS (for Frontend)

### Initializing the Database

1. Create a new database named `ChatAppDB` in your SQL Server.
2. Create a table `Users` within `ChatAppDB` with the following structure:

   ```sql
   CREATE TABLE Users (
     Id INT PRIMARY KEY,
     Username NVARCHAR(50) NOT NULL,
     PasswordHash NVARCHAR(128) NOT NULL,
     PasswordSalt NVARCHAR(128) NOT NULL
   );
   ```

## Running the Application

### Backend:
1. **Ensure you have the .NET 7 SDK installed on your machine.**
   - You can download it from [https://dotnet.microsoft.com/download/dotnet/7.0](https://dotnet.microsoft.com/download/dotnet/7.0).
   
2. **Navigate to the `ChatAppBackend` directory.**
   ```sh
   cd ChatAppBackend
   ```
   
3. **Install the necessary packages.**
   ```sh
   dotnet restore
   ```
   
4. **Run the command to start the backend server.**
   ```sh
   dotnet run
   ```

### Frontend:
1. **Navigate to the `ChatAppFrontend` directory.**
   ```sh
   cd ChatAppFrontend
   ```
   
2. **Install the necessary packages.**
   ```sh
   npm install
   ```
   
3. **Ensure that Tailwind CSS is properly configured.**
   - Check the `angular.json` and `tailwind.config.js` files are present and properly set up in the repo.
   - If any discrepancies are found or if Tailwind CSS is not working as expected, refer to the [Tailwind CSS installation and configuration guide for Angular](https://tailwindcss.com/docs/guides/angular).
   
4. **Run the command to start the Angular development server.**
   ```sh
   ng serve
   ```
   
5. **Open your browser and navigate to the application.**
   [http://localhost:4200/](http://localhost:4200/)

You should now be able to create an account, log in, and send messages locally.

## Contributing
Contributions are welcome! Feel free to fork the project, create a new branch, make your changes, and open a pull request.
