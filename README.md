# E-Commerce 369 - Saudi Women's Fashion Platform

A modern, Saudi market-focused e-commerce platform specializing in women's clothing with comprehensive payment integration, Arabic language support, and exceptional performance. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Saudi Market Optimization**: Arabic language support, RTL layout, cultural considerations
- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Payment Integration**: Stripe, PayPal, and Saudi local payment channels (MADA, STC Pay)
- **Responsive Design**: Mobile-first approach optimized for Saudi mobile users
- **Product Management**: Comprehensive product catalog with categories and search
- **Shopping Cart**: Full-featured cart with real-time updates
- **User Authentication**: Secure user registration and login system
- **Order Management**: Complete order tracking and management
- **Admin Panel**: Administrative interface for product and order management
- **Multi-language Support**: Arabic and English with seamless switching
- **SEO Optimized**: Built-in SEO features for better search visibility
- **Performance**: Optimized for speed and performance

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Ready for PostgreSQL with Prisma ORM (MongoDB support planned)
- **Authentication**: NextAuth.js (planned)
- **Payment Processing**: Stripe, PayPal, Saudi payment gateways
- **Internationalization**: react-i18next for Arabic/English support
- **Deployment**: Vercel-ready
- **Testing**: Jest + React Testing Library (planned)
- **Linting**: ESLint + Prettier

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

1. Clone the repository:
```bash
git clone https://github.com/Fadil369/e-commerce-369.git
cd e-commerce-369
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Configure your environment variables for Saudi payment gateways and Arabic support
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css     # Global styles with RTL support
│   ├── layout.tsx      # Root layout with Arabic/English support
│   └── page.tsx        # Home page
├── components/         # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries and configurations
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Design System

The application uses a consistent design system with:

- **Color Palette**: Primary blue theme with semantic color variables
- **Typography**: Inter font for optimal readability (with Arabic font support)
- **Spacing**: Consistent spacing scale using Tailwind
- **RTL Support**: Full right-to-left layout for Arabic
- **Components**: Reusable component library (planned)

## 🔐 Security Features

- **Type Safety**: Full TypeScript implementation
- **Input Validation**: Server-side and client-side validation
- **Authentication**: Secure user authentication system
- **HTTPS**: SSL/TLS encryption ready
- **Environment Variables**: Secure configuration management
- **Payment Security**: PCI-compliant payment processing

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables (including Saudi payment credentials)
3. Deploy with automatic CI/CD

## 📊 Performance

- **Lighthouse Score**: Optimized for 90+ scores
- **Core Web Vitals**: Excellent performance metrics
- **Image Optimization**: Next.js built-in image optimization
- **Code Splitting**: Automatic code splitting and lazy loading
- **Arabic Font Loading**: Optimized Arabic font delivery

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our contributing guidelines before submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohamed El Fadil Abuagla**

- GitHub: [@Fadil369](https://github.com/Fadil369)
- Email: [your-email@example.com]

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vercel for hosting and deployment platform
- Saudi payment gateway providers for local payment integration

---

Built with ❤️ for Saudi women's fashion using Next.js and TypeScript
