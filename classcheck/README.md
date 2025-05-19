# ClassCheck Frontend

This directory contains the frontend application for ClassCheck, a web application designed to track and manage class attendance efficiently.

## Overview

The ClassCheck frontend is built with modern web technologies to provide a responsive and intuitive user interface for attendance management.

## Tech Stack

- React.js with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- ShadCN UI components

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Project Structure

- `src/` - Source code
  - `components/` - Reusable UI components
  - `pages/` - Application pages
  - `hooks/` - Custom React hooks
  - `context/` - React context providers
  - `utils/` - Utility functions
  - `types/` - TypeScript type definitions
  - `assets/` - Static assets like images and icons

## Features

- Student attendance tracking interface
- Real-time attendance updates via socket.io
- Responsive design for desktop and mobile devices
- User authentication and authorization
- Interactive dashboards for attendance statistics

## Development

### Code Style

This project uses ESLint and Prettier for code formatting and style enforcement.

### Testing

Run tests with:

```bash
npm test
```

## Connecting to Backend

The frontend communicates with the backend API located in the `../backend` directory. Make sure the backend server is running when developing the frontend.

## Contributing

Please refer to the main project README for contribution guidelines.

## License

This project is licensed under the MIT License.
