# Group_BSE24-X_ToDoApp
Project: To-Do App
Table of Contents
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Collaboration Guidelines](#collaboration-guidelines)
  - [Branching Strategy](#branching-strategy)
  - [Commit Messages](#commit-messages)
  - [Pull Requests](#pull-requests)
- [Contributing](#contributing)
Project Overview
This To-Do application is designed to help users manage their tasks effectively. Built using the MERN Stack (MongoDB, Express.js, React.js, Node.js), the app provides the following core features:
Key Features:
1. **Add Tasks**: Users can create new tasks by providing a title and description, with the option to set a deadline.
2. **Edit Tasks**: Users can update or modify the details of existing tasks.
3. **Delete Tasks**: Users can remove tasks that are no longer needed.
4. **Set Deadlines**: Users can set deadlines for tasks to manage priorities.
5. **Task List**: The main interface displays all tasks with details.
6. **Mark Tasks as Complete**: Users can mark tasks as completed.
Getting Started
To start working on the project, clone the repository to your local machine and set it up by following the instructions below.
Prerequisites
- **Git**
- **Node.js** (version >= 14.x)
- **MongoDB** (local database or remote)
- **npm** or **yarn**
Installation
1. **Clone the repository:**
```bash
git clone https://github.com/your-username/Group_BSE24-ToDoApp.git
```
2. **Navigate to the project directory:**
```bash
cd C:\ Group_BSE24-ToDoApp
```
3. **Install server-side (Node.js) dependencies:**
```bash
cd backend
npm install
```
4. **Install client-side (React.js) dependencies:**
```bash
cd ../frontend
npm install
```
5. **Set up environment variables:**
In the `backend` folder, create a `.env` file following the structure of `.env.example`.
Running the Project
- **Start the backend (Node.js/Express) server:**
```bash
cd backend
npm start
```
- **Start the frontend (React.js) development server:**
```bash
cd ../frontend
npm start
```
The app will be accessible at `http://localhost:3000` (client) and `http://localhost:5000` (server).
Collaboration Guidelines
Branching Strategy
- The `main` branch is protected and should always contain the latest stable version.
- Feature development happens on individual branches:
```bash
git checkout -b feature/your-feature-name
```
- Once a feature is complete, push your branch and open a pull request for review.
Commit Messages
- Use descriptive and meaningful commit messages:
```
feat: [short description] – for new features
fix: [short description] – for bug fixes
refactor: [short description] – for restructuring code
```
Pull Requests
- Ensure your pull request is reviewed by at least one team member.
- Use the provided PR template and link related issues.
- Once approved, squash and merge changes into `main`.
Contributing
Contributions from all team members are welcome. Ensure your changes align with project goals.
- Discuss major changes with the team before starting.
- Follow the project's style guidelines and document your code.
