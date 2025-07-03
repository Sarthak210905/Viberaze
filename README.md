# Viberaze - Complete Ecommerce Platform

A modern, full-featured ecommerce website built with React, Firebase, and Tailwind CSS. Viberaze is a comprehensive online shopping platform with all the essential features needed for a production-ready ecommerce business.

## 🚀 Features

### 🛍️ Core Ecommerce Features
- **Product Catalog**: Browse products by category, gender, and filters
- **Advanced Search**: Real-time search with filters and sorting options
- **Product Details**: Detailed product pages with images, descriptions, and specifications
- **Shopping Cart**: Add, remove, and manage cart items with quantity controls
- **Wishlist**: Save products for later purchase
- **User Authentication**: Secure signup, login, and password reset
- **Order Management**: Complete order tracking and history
- **Payment Integration**: Razorpay payment gateway integration
- **Responsive Design**: Mobile-first design that works on all devices

### 👤 User Features
- **User Profiles**: Complete profile management with address and preferences
- **Order History**: Track all past orders with status updates
- **Wishlist Management**: Save and organize favorite products
- **Review System**: Rate and review products with detailed feedback
- **Notifications**: Real-time notifications for orders and promotions
- **Dark/Light Mode**: Toggle between themes for better user experience

### 🔍 Advanced Features
- **Product Comparison**: Compare up to 4 products side by side
- **Advanced Filtering**: Filter by price, size, color, category, and more
- **Sorting Options**: Sort by price, popularity, newest, and relevance
- **Stock Management**: Real-time stock tracking and availability
- **Sale/Discount System**: Support for sale prices and discount codes
- **Coupon System**: Apply discount codes with minimum purchase requirements

### 🛠️ Admin Features
- **Admin Dashboard**: Comprehensive analytics and management tools
- **Product Management**: Add, edit, and delete products with image uploads
- **Order Management**: Process orders, update status, and track shipments
- **User Management**: View and manage user accounts
- **Analytics**: Sales reports, user statistics, and performance metrics
- **Inventory Management**: Track stock levels and manage inventory

### 🎨 UI/UX Features
- **Modern Design**: Clean, professional design with smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Loading States**: Smooth loading indicators and skeleton screens
- **Toast Notifications**: User-friendly success and error messages
- **Image Galleries**: Product image carousels with zoom functionality
- **Interactive Elements**: Hover effects, transitions, and micro-interactions

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Redux Toolkit**: State management for cart and user data
- **React Router**: Client-side routing
- **Lucide React**: Beautiful icon library
- **React Toastify**: Toast notifications
- **GSAP**: Advanced animations

### Backend & Services
- **Firebase**: Backend-as-a-Service
  - **Firestore**: NoSQL database
  - **Authentication**: User authentication and authorization
  - **Storage**: File and image storage
- **Razorpay**: Payment gateway integration

### Development Tools
- **ESLint**: Code linting and formatting
- **PropTypes**: Runtime type checking
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Razorpay account (for payments)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/viberaze.git
cd viberaze
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Configuration
1. Create a new Firebase project
2. Enable Authentication, Firestore, and Storage
3. Update `src/firebase/FirebaseConfig.jsx` with your Firebase credentials

### 4. Environment Variables
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 5. Start Development Server
```bash
npm run dev
```

### 6. Build for Production
```bash
npm run build
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── filter/         # Product filtering components
│   ├── footer/         # Footer component
│   ├── gender/         # Gender-specific product components
│   ├── heroSection/    # Hero section components
│   ├── layout/         # Layout wrapper components
│   ├── loader/         # Loading components
│   ├── modal/          # Modal components
│   ├── navbar/         # Navigation components
│   ├── productCard/    # Product card components
│   ├── search/         # Search functionality
│   ├── wishlist/       # Wishlist components
│   ├── reviews/        # Review system
│   ├── notifications/  # Notification system
│   └── comparison/     # Product comparison
├── context/            # React context providers
├── firebase/           # Firebase configuration
├── pages/              # Page components
│   ├── admin/          # Admin dashboard pages
│   ├── allproducts/    # Product listing pages
│   ├── cart/           # Shopping cart pages
│   ├── home/           # Home page
│   ├── order/          # Order management pages
│   ├── productInfo/    # Product detail pages
│   ├── profile/        # User profile pages
│   └── registration/   # Authentication pages
├── protectedroute/     # Route protection components
├── redux/              # Redux store and slices
└── main.jsx           # Application entry point
```

## 🔧 Configuration

### Firebase Setup
1. **Authentication**: Enable Email/Password authentication
2. **Firestore**: Create collections for `products`, `users`, `orders`, `reviews`
3. **Storage**: Set up storage rules for image uploads
4. **Security Rules**: Configure Firestore security rules

### Payment Gateway
1. **Razorpay**: Set up Razorpay account and get API keys
2. **Webhook**: Configure webhooks for payment status updates
3. **Test Mode**: Use test credentials for development

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize Firebase: `firebase init`
3. Build and deploy: `npm run build && firebase deploy`

## 📱 Features in Detail

### User Authentication
- Email/password registration and login
- Password reset functionality
- Email verification
- Protected routes for authenticated users
- Session management with localStorage

### Product Management
- Product catalog with categories
- Advanced filtering and sorting
- Product search with autocomplete
- Product comparison tool
- Stock management and availability
- Sale price support

### Shopping Experience
- Add to cart with size/color selection
- Wishlist functionality
- Shopping cart management
- Secure checkout process
- Order tracking and history
- Review and rating system

### Admin Dashboard
- Sales analytics and reports
- Product management interface
- Order processing and status updates
- User management
- Inventory tracking
- Performance metrics

## 🔒 Security Features

- Firebase Authentication for user management
- Protected routes for admin access
- Input validation and sanitization
- Secure payment processing
- Environment variable protection
- CORS configuration

## 📊 Performance Optimization

- Code splitting and lazy loading
- Image optimization and lazy loading
- Redux state management
- Memoized components
- Efficient re-rendering
- Bundle size optimization

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run tests (when implemented)
npm test

# Build for production
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact: support@viberaze.com
- Documentation: [docs.viberaze.com](https://docs.viberaze.com)

## 🎯 Roadmap

### Upcoming Features
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Social media integration
- [ ] Advanced recommendation system
- [ ] Bulk order management
- [ ] Advanced inventory management
- [ ] Customer support chat
- [ ] Advanced reporting
- [ ] API for third-party integrations

### Version History
- **v1.0.0**: Initial release with core ecommerce features
- **v1.1.0**: Added wishlist and comparison features
- **v1.2.0**: Enhanced admin dashboard and analytics
- **v1.3.0**: Improved UI/UX and performance optimizations

---

**Viberaze** - Your complete ecommerce solution! 🛍️✨
