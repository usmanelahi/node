## Project Folder Structure

This structure outlines the different parts of the project, organizing them in a way that's easy to navigate and understand.

```plaintext
project-root
│
├── public/              # Static files like images, stylesheets, etc.
├── src/                 # Source files for the application
│   ├── db/              # Database configurations and scripts
│   ├── modules/         # Reusable modules throughout the app
│   ├── middlewares/     # Express middlewares for handling requests
│   ├── routes/          # Router setup for all endpoints
│   ├── utils/           # Utility functions and helpers
│   ├── controllers/     # Controllers to handle request logic
│   ├── app.js           # Express app setup
│   ├── index.js         # Entry point of the application
│   └── constants.js     # Constants used across the application
│
├── .gitignore           # Specifies files and directories to be ignored by version control
├── .env                 # Environment variables for configuration
└── package.json         # Manages project dependencies, scripts, and version
