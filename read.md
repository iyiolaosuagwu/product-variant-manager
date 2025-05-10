# Product Variant Manager

A responsive product and variant management application inspired by Shopify's clean interface. Built with React, TypeScript, React Query, and Shadcn UI.

## Features

-   **Product Management**: Add, edit, and delete products
-   **Variant Management**: Add multiple variants (size, color, price, stock) to each product
-   **Responsive Design**: Fully responsive from mobile to desktop
-   **Search Functionality**: Filter products and variants
-   **Form Validation**: Comprehensive validation using Zod
-   **Data Persistence**: Local storage for data persistence

## Tech Stack

-   **React** with **TypeScript**
-   **Next.js** App Router
-   **React Query** for data fetching and state management
-   **Shadcn UI** for styling and components
-   **Zod** for form validation
-   **React Hook Form** for form state management
-   **Jest** and **React Testing Library** for testing

## Installation

Follow these steps to set up the project locally:

### Prerequisites

-   Node.js 18.x or later
-   npm or yarn

### Setup Steps

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/iyiolaosuagwu/product-variant-manager.git
cd product-variant-manager
\`\`\`

2. **Install dependencies**

\`\`\`bash
npm install

# or

yarn install
\`\`\`

3. **Run the development server**

\`\`\`bash
npm run dev

# or

yarn dev
\`\`\`

4. **Open the application**

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Integration

The application can optionally integrate with external APIs:

-   **DummyJSON**: For fetching sample product data
-   **Fake Store API**: Alternative source for sample data

To seed the application with sample data, visit `/api/seed` after starting the development server.
