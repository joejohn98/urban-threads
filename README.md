# Urban Threads 👕

A modern e-commerce platform built with React, TypeScript, and Redux, offering a seamless shopping experience for fashion enthusiasts.

## ✨ Features

- 🛍️ Browse and search products
- 🔐 User authentication
- 🛒 Shopping cart management
- ❤️ Wishlist functionality
- 📱 Responsive design
- 🌓 Modern UI with Tailwind CSS
- 🔔 Toast notifications
- 🔒 Protected routes
- 🏪 Product categorization
- 📊 Order summary and confirmation
- 📝 Product reviews and ratings
- 💰 Discount codes and promo codes
- 📊 Product filtering and sorting

## 🏗️ Project Structure

```
src/
├── assets/           # Static assets and images
├── components/       # Reusable UI components
│   ├── auth/        # Authentication components
│   └── layout/      # Layout components
├── hooks/           # Custom React hooks
├── pages/           # Application pages
│   ├── Home
│   ├── ProductList
│   ├── ProductDetail
│   ├── Cart
│   ├── Wishlist
│   ├── Checkout
│   ├── Login
│   └── SignUp
├── store/           # Redux store configuration
│   └── slices/      # Redux slices
│       ├── authSlice
│       ├── cartSlice
│       └── wishlistSlice
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## 🛠️ Technologies Used

- React 18
- TypeScript
- Redux Toolkit
- React Router DOM
- React Hot Toast
- Lucide React (Icons)
- Tailwind CSS
- Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/joejohn98/urban-threads.git
cd urban-threads
```

2. Install dependencies

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🧰 Component Details

### Authentication

- Protected routes for authenticated users
- Login and signup functionality
- User session management

### Shopping Features

- Product browsing and filtering
- Shopping cart management
- Wishlist functionality
- Checkout process
- Order confirmation

### Layout Components

- Responsive navigation bar
- Footer with site information
- Product cards and grids
- Cart and wishlist indicators

## 💾 State Management

### Redux Store Structure

- `auth`: User authentication state
- `cart`: Shopping cart items and totals
- `wishlist`: Saved items for later

### Key Features

- Persistent cart state
- User authentication status
- Wishlist management
- Order processing

## 💅 Styling

- Tailwind CSS for responsive design
- Custom CSS for specific components
- Consistent theme across pages
- Mobile-first approach

## 🔧 Development Tools

- ESLint for code linting
- TypeScript for type safety
- Vite for fast development
- PostCSS for CSS processing

Run linting:

```bash
npm run lint
```
