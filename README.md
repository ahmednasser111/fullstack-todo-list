# Fullstack Todo List

A robust and interactive Todo List application built with React, TypeScript, and Strapi backend.

## Features

- **Interactive UI**: Easily add, edit, and delete todos.
- **TypeScript**: Leverage the power of TypeScript for type safety.
- **Responsive Design**: Works seamlessly on both mobile and desktop devices.
- **Authentication**: Secure user authentication system.
- **Strapi Backend**: Utilizes Strapi for a flexible and powerful backend.
- **Error Handling**: Comprehensive error handling with custom ErrorHandler component.
- **Loading States**: Skeleton loading for improved user experience.
- **React Query**: Efficient data fetching and caching with React Query.

## Tech Stack

- **Frontend**: React, TypeScript
- **Backend**: Strapi (Headless CMS)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks, React Query
- **Development Tools**: Vite, ESLint

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 14.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management
- [Strapi](https://strapi.io/) installed globally or as a project dependency

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ahmednasser111/fullstack-todo-list.git
   ```

2. Navigate to the project directory:

   ```bash
   cd fullstack-todo-list
   ```

3. Install frontend dependencies:

   ```bash
   npm install
   ```

4. Set up Strapi backend:

   Follow the Strapi documentation to set up your backend with the necessary content types and permissions.

5. Configure environment variables:

   Create a `.env` file in the root directory and add necessary environment variables (e.g., API_URL).

6. Run the development server:

   ```bash
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal).

## Usage

- **Sign Up/Login**: Create an account or log in to access your todos.
- **Add a Todo**: Click on the floating "+" button to create a new todo item.
- **Edit a Todo**: Click on a todo item to edit its content.
- **Delete a Todo**: Use the delete button next to each todo to remove it.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for suggestions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Strapi team for providing an excellent headless CMS
- React Query for efficient data fetching and state management
- Tailwind CSS for rapid UI development
