## About This Project

This application is a user management system. It provides functionality to:
- View/Create/Update user profiles
- View/Create/Update roles for users

## Live Demo

You can try out a live version of the application here: [Demo](https://user-management-web.home.infernos.co.za)

## Technology Stack

- **Frontend:** [Next.js](https://nextjs.org/) (React framework)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Programming Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [SQlite3](https://www.sqlite.org/index.html)
- **Linting:** [ESLint](https://eslint.org/)
- **Version Control:** [Git](https://git-scm.com/)
- **Backend:** [.Net 9](https://dotnet.microsoft.com/en-us) ([User Management API](https://github.com/imbavirus/UserManagementAPI))
- **Package Manager:** [npm](https://www.npmjs.com/)

## Requirements

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (which includes npm) - Version 18.20.5 or higher is recommended.
- A code editor of your choice (e.g., [VS Code](https://code.visualstudio.com/)).
- A modern web browser (e.g., Chrome, Firefox, Edge).
- [User Management API](https://github.com/imbavirus/UserManagementAPI)

## Getting Started

Before running the frontend application, you'll need to set up and run the backend API, and then configure the frontend's environment variables.

**1. Set up and run the User Management API:**
   - Clone the API repository (if you haven't already):

     ```bash
     git clone https://github.com/imbavirus/UserManagementAPI.git
     ```

   - Navigate into the API project directory:
   
     ```bash
     cd UserManagementAPI 
     ```

   - Run the API (this might vary based on the .NET project setup, `dotnet run` is common):

     ```bash
     dotnet run --project ./API 
     ```

   - Ensure the API is running and accessible. It should be running on [http://localhost:5000](http://localhost:5000). Check the API's output for the exact URL.


**2. Configure the Frontend Application:**
   - Clone this frontend repository (if you haven't already):

     ```bash
     git clone https://github.com/imbavirus/UserManagementWeb.git 
     ```

   - Navigate into the frontend project directory:

     ```bash
     cd UserManagementWeb
     ```

   - Copy the example environment file:

      ```bash
      cp .env.example .env
      ```

   - Open the newly created `.env` file and ensure the `API_BASE_URL` points to your User Management API.

   - Install the project dependencies:

      ```bash
      npm install
      ```

## Running the Application

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Previews

* User Profile Listing Page
![User Profile Listing](https://i.gyazo.com/ae020f92a3f236a113e659d38cd37768.png)

* User Profile Edit Page
![User Profile Edit](https://i.gyazo.com/38837a45a022824965a3389b9527f392.png)
