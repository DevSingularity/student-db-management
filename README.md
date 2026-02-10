# Student Database Management System

A production-grade React frontend application for managing student data, fee tracking, and payment analytics. Built for internal college use by administrators and office staff.

![Student Database Management System](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.1-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan) ![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.2-violet)

## 🚀 Features

### 1. **Authentication System**
- Secure admin and office staff login
- Role-based access control
- Session persistence with localStorage
- Auto-redirect based on authentication status

### 2. **Main Dashboard**
- Real-time summary cards showing:
  - Total students count
  - Total fees collected
  - Pending fees amount
- Advanced student search functionality:
  - Search by name, GR number, or phone number
  - Live search results with instant filtering
  - Direct navigation to student profiles

### 3. **Student Profile Page**
- Comprehensive student information display:
  - Personal details (name, contact, address, Aadhaar)
  - Academic information (class, division, admission year)
  - Guardian/parent details
  - Fee status with visual progress indicators
- Complete payment history with transaction details
- Fee payment progress bar
- Responsive layout with organized sections

### 4. **Payment Dashboard**
- Dual view modes:
  - **List View**: Tabular display of all transactions
  - **Calendar View**: Interactive monthly calendar with daily payment indicators
- Timeframe filters:
  - Daily payments
  - Weekly summary
  - Monthly analytics
- Transaction details including:
  - Payment date and time
  - Student name
  - Amount paid
  - Payment mode (UPI, Cash, Card, Net Banking)
  - Transaction reference number
- Total collection summaries per timeframe

## 🛠️ Tech Stack

### Core Technologies
- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS v4** - Utility-first styling with custom theme
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing

### UI Libraries
- **Lucide React** - Beautiful icon set
- **date-fns** - Date manipulation and formatting

## 📁 Project Structure

```
student-db-system/
├── src/
│   ├── components/           # Reusable UI components
│   │   └── Layout.jsx       # Main layout with header and navigation
│   ├── data/                # Mock data
│   │   └── mockData.js      # All mock data (students, payments, auth)
│   ├── pages/               # Page components
│   │   ├── LoginPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── StudentProfile.jsx
│   │   └── PaymentDashboard.jsx
│   ├── store/               # Redux store
│   │   ├── store.js         # Store configuration
│   │   └── slices/          # Redux slices
│   │       ├── authSlice.js
│   │       ├── studentSlice.js
│   │       └── paymentSlice.js
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles and Tailwind config
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies
└── README.md               # This file
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: Professional and trustworthy
  - 50-900 scale for various UI elements
- **Success Green**: Paid status indicators
- **Warning Orange**: Partial payment status
- **Danger Red**: Pending payment alerts
- **Gray Scale**: Text and backgrounds

### Typography
- **Display Font**: Archivo (headings, titles)
- **Body Font**: Inter (content, UI elements)

### UI Principles
- Clean, minimal design
- Professional white base with blue accents
- Generous spacing and clear hierarchy
- Smooth transitions and animations
- Fully responsive layouts

## 📊 Mock Data

The application includes comprehensive mock data in `src/data/mockData.js`:

### Authentication Data
- 3 employee accounts (Admin and Office Staff)
- Demo credentials provided on login page

### Student Records
- 30 detailed student profiles including:
  - Personal information (name, email, phone, address)
  - Academic details (class, division, GR number)
  - Guardian information
  - Fee status and payment history
  - Family background (caste, mother tongue, income)

### Payment Data
- 27+ payment transactions
- Various payment modes (UPI, Cash, Card, Net Banking)
- Distributed across daily, weekly, and monthly timeframes
- Complete transaction references

### Dashboard Summaries
- Real-time calculations
- Aggregated statistics
- Timeframe-based analytics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

1. **Clone or extract the project:**
```bash
cd student-db-system
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open in browser:**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🔐 Demo Login Credentials

### Admin Account
- **Employee ID**: EMP001
- **Password**: admin123

### Office Staff Account
- **Employee ID**: EMP002
- **Password**: staff123

## 📱 Features Breakdown

### Dashboard
- Summary cards with key metrics
- Real-time student search
- Direct navigation to student profiles
- Fee status indicators

### Student Profile
- Comprehensive information display
- Fee payment progress visualization
- Complete payment history
- Guardian contact details
- Academic records

### Payment Dashboard
- Switch between List and Calendar views
- Filter by daily/weekly/monthly
- Interactive calendar with payment indicators
- Detailed transaction table
- Total collection summaries
- Payment mode categorization

## 🔄 API Integration Ready

The application is structured for easy API integration:

1. **Mock Data Structure**: All data follows RESTful API patterns
2. **Redux Thunks**: Ready for async API calls
3. **Error Handling**: Built-in error states in Redux slices
4. **Loading States**: UI components support loading indicators
5. **Normalized Data**: Easy to replace with API responses

### To Integrate APIs:

1. Replace mock data imports in Redux slices
2. Add API calls in thunks (already structured)
3. Update action creators with async logic
4. Add API error handling
5. Configure base URL and endpoints

## 🎯 Future Enhancements

- Add new student registration
- Edit student information
- Process new payments
- Generate fee receipts
- Export reports (PDF/Excel)
- Advanced analytics and charts
- Email/SMS notifications
- Bulk operations
- Advanced search filters
- User profile management

## 📝 Notes

- All dates are formatted using date-fns
- Currency formatting uses Indian Rupee (INR)
- Authentication state persists in localStorage
- Fully responsive design works on mobile, tablet, and desktop
- Clean code with consistent naming conventions
- Production-ready architecture

## 🤝 Contributing

This is a demo application. In a production environment:

1. Replace mock data with real API calls
2. Add proper authentication with JWT tokens
3. Implement server-side validation
4. Add user permissions and roles
5. Set up proper error logging
6. Add automated tests

## 📄 License

This project is created for educational and demonstration purposes.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
