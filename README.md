## About This Project

This application is a user management system. It provides functionality to:
- View/Create/Update user profiles
- View/Create/Update roles for users

## Live Demo

You can try out a live version of the application here: [Demo](https://user-management.home.infernos.co.za)

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

Before running the application, you'll need to set up your environment variables.

1.  Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
2.  Open the newly created `.env` file and ensure the `API_BASE_URL` points to your User Management API.
3.  Install the project dependencies:
    ```bash
    npm install
    ```
## Running the Application

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
