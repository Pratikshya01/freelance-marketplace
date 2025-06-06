# Freelance Marketplace

A modern freelance marketplace platform built with React + Vite, designed to connect freelancers with clients. The platform features secure authentication and a responsive user interface.

## Live Demo

Check out the live application: [Freelance Marketplace](https://freelance-marketplace-react.netlify.app/)

## Features

- User authentication and authorization
- Project posting and bidding system
- Responsive design with Tailwind CSS
- Redux state management with persistence
- Form validation using Formik and Yup
- Toast notifications for better UX

## Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **State Management:** Redux Toolkit + Redux Persist
- **Styling:** Tailwind CSS + HeadlessUI
- **Form Management:** Formik + Yup
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios
- **UI Components:** @heroicons/react
- **Development Tools:** ESLint

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/Pratikshya01/freelance-marketplace.git
cd freelance-marketplace
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
freelance-marketplace/
├── public/               # Static files
├── src/                 # Source code
│   ├── assets/         # Images, fonts, and other static assets
│   │   ├── auth/      # Authentication related components
│   │   ├── common/    # Shared/utility components
│   │   ├── dashboard/ # Dashboard specific components
│   │   ├── home/      # Home page components
│   │   ├── jobs/      # Job related components
│   │   └── layout/    # Layout components (header, footer, etc.)
│   ├── pages/         # Page components
│   │   ├── client/    # Client specific pages
│   │   ├── dashboard/ # Dashboard pages
│   │   └── *.jsx      # Other page components
│   ├── services/      # API services and utilities
│   ├── store/         # Redux store configuration
│   │   └── slices/    # Redux slices
│   ├── App.jsx        # Main application component
│   ├── main.jsx       # Application entry point
│   └── index.css      # Global styles
├── .gitignore         # Git ignore configuration
├── package.json       # Project dependencies and scripts
├── vite.config.js     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js  # PostCSS configuration
├── eslint.config.js   # ESLint configuration
└── README.md         # Project documentation
```

## Deployment

This project is deployed on Netlify. You can visit the live application at [https://freelance-marketplace-react.netlify.app/](https://freelance-marketplace-react.netlify.app/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## 👥 Authors

- [Pratikshya Gochhayat](https://github.com/Pratikshya01)

