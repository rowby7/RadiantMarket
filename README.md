# Radiant Market 🛍️

A modern, full-stack e-commerce platform built with Next.js 15 and Supabase. Radiant Market provides a seamless shopping experience with authentication, product browsing, and cart management.

Domain: https://radiant-market.vercel.app/


![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-latest-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan)

## ✨ Features

- **🔐 Authentication System**
  - User sign-up and login
  - Password recovery and reset
  - Email confirmation
  - Protected routes and session management

- **🛒 Shopping Experience**
  - Product storefront with grid layout
  - Shopping cart functionality
  - User profile management
  - Real-time data from Supabase

- **🎨 Modern UI/UX**
  - Responsive design with Tailwind CSS
  - Dark/Light theme support
  - Radix UI components
  - Hero Icons and Lucide icons
  - Mobile-friendly navigation

- **⚡ Performance**
  - Server-side rendering (SSR)
  - API routes for backend operations
  - Optimized database queries

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **Components:** Radix UI, Headless UI
- **Icons:** Hero Icons, Lucide React
- **Theme:** next-themes

### Backend
- **Database & Auth:** Supabase
- **API:** Next.js API Routes
- **ORM:** Supabase Client

### Development Tools
- **Linting:** ESLint 9
- **Code Quality:** TypeScript strict mode
- **CSS Processing:** PostCSS, Autoprefixer

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 20.x or higher
- npm or yarn package manager
- A Supabase account and project

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rowby7/RadiantMarket.git
cd radiant-market
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under API.

### 4. Database Setup

Create the following tables in your Supabase project:

#### Products Table
```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public products are viewable by everyone"
  ON products FOR SELECT
  USING (true);
```

#### Cart Table (if needed)
```sql
CREATE TABLE cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  product_id UUID REFERENCES products NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Users can only see their own cart items
CREATE POLICY "Users can view own cart items"
  ON cart_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  USING (auth.uid() = user_id);
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
radiant-market/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   └── debug-cart/       # Cart debugging endpoint
│   ├── auth/                 # Authentication pages
│   │   ├── login/            # Login page
│   │   ├── sign-up/          # Registration page
│   │   ├── forgot-password/  # Password recovery
│   │   └── update-password/  # Password reset
│   ├── protected/            # Protected routes
│   ├── shop/                 # Shopping pages
│   │   ├── cart/             # Shopping cart
│   │   ├── profile/          # User profile
│   │   └── storefront/       # Product listing
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ui/                   # UI primitives (Radix/shadcn)
│   ├── auth-button.tsx       # Authentication button
│   ├── cart-page.tsx         # Cart display
│   ├── login-form.tsx        # Login form
│   ├── navbar.tsx            # Navigation bar
│   ├── product-grid.tsx      # Product grid layout
│   └── profile.tsx           # Profile component
├── lib/                      # Utility functions
│   ├── supabase/             # Supabase clients
│   │   ├── client.ts         # Client-side client
│   │   ├── server.ts         # Server-side client
│   │   └── proxy.ts          # Proxy configuration
│   ├── cart_action.ts        # Cart actions
│   └── utils.ts              # Helper functions
├── public/                   # Static assets
│   └── logo/                 # Logo images
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

## 🔑 Key Features Explained

### Authentication Flow
- Users can sign up with email and password
- Email confirmation required for new accounts
- Password reset functionality via email
- Session management with Supabase Auth
- Protected routes require authentication

### Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- Cart persists across sessions
- Real-time cart updates

### Product Management
- Products stored in Supabase
- Image support
- Price and description fields
- Sortable by creation date

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Theming
The application supports dark and light themes. Theme switching is handled by `next-themes` and can be customized in the theme-switcher component.

### Styling
Tailwind CSS classes can be modified in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global styles
- Individual component files

### Components
UI components are built with Radix UI and can be customized in the `components/ui/` directory.

## 🔒 Security Considerations

- Environment variables are used for sensitive data
- Row Level Security (RLS) is enabled on Supabase tables
- Authentication tokens are handled securely by Supabase
- CSRF protection via Supabase SSR

## 🐛 Troubleshooting

### Common Issues

**Issue:** Supabase connection errors
- **Solution:** Verify your `.env.local` file has correct credentials
- Check that your Supabase project is active

**Issue:** Products not displaying
- **Solution:** Ensure the products table is created and has data
- Check RLS policies allow public read access

**Issue:** Authentication not working
- **Solution:** Verify email confirmation is set up in Supabase
- Check redirect URLs in Supabase Auth settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Cam Flowers**

- GitHub: [@rowby7](https://github.com/rowby7)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)

---

⭐ If you found this project helpful, please consider giving it a star on GitHub!
