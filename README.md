# E-Commerce 369 - Saudi Women's Fashion Platform

A modern, Saudi market-focused e-commerce platform specializing in women's clothing with comprehensive payment integration and Arabic language support.

## Features

- **Saudi Market Optimization**: Arabic language support, RTL layout, cultural considerations
- **Payment Integration**: Stripe, PayPal, and Saudi local payment channels (MADA, STC Pay)
- **Modern UI/UX**: Futuristic, intuitive, and dynamic product presentation
- **E-commerce Features**: Product catalog, shopping cart, order management
- **Mobile-responsive Design**: Optimized for Saudi mobile users
- **Multi-language Support**: Arabic and English with seamless switching

## Tech Stack

- **Frontend**: React.js with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Payment Processing**: Stripe, PayPal, Saudi payment gateways
- **Authentication**: JWT-based authentication
- **Internationalization**: react-i18next

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Fadil369/e-commerce-369.git
cd e-commerce-369
```

2. Install dependencies for all packages
```bash
npm run install:all
```

3. Set up environment variables
```bash
# Copy environment files and configure
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

4. Start the development servers
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

## Project Structure

```
e-commerce-369/
├── frontend/          # React.js frontend application
├── backend/           # Node.js Express backend API
├── shared/            # Shared types and utilities
└── docs/              # Documentation
```

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.