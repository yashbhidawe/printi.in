

---

# printi.in 

Welcome to the printi.in! This project is a comprehensive solution for creating and managing custom prints with fast delivery and premium quality. Below, you'll find an overview of the project's structure, key features, setup instructions, and more.

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

## Project Overview
ImageGalaxy aims to provide users with an easy-to-use platform to create custom prints. The project includes functionalities such as product management, user authentication, a dynamic cart system, and secure payment processing.

## Key Features
- User Authentication (OTP and Google oAuth based)
- Profile Creation and Management
- Dynamic Cart System
- Bill Generation
- Admin Dashboard
- Payment Gateway Integration (Razorpay)
- User Notifications via WhatsApp
- Mobile-first Design Approach

## Tech Stack
- **Frontend**: React, Redux, Tailwind CSS, Material Tailwind, Headless UI, ShadCN
- **Backend**: Firebase (Firestore, Authentication, Analytics)
- **Payment Processing**: Razorpay
- **Deployment**: Vercel, Firebase Hosting

## Setup Instructions
### Prerequisites
- Node.js installed
- Firebase account and project set up
- Razorpay account set up

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/imagegalaxy.git
   cd printi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables.

### Environment Variables
Ensure you have the necessary keys in your `.env` file:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
VITE_RAZORPAY_KEY=your_razorpay_key
VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Running Locally
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to see the project in action.

### Deployment
1. **Deploy to Vercel**:
   - Go to your Vercel dashboard and create a new project.
   - Import your repository from GitHub.
   - Set up your environment variables in the Vercel project settings.
   - Deploy the project.

2. **Deploy Backend with Firebase**:
   - Ensure your Firebase services (Firestore, Authentication, etc.) are working as expected.
   - Deploy your backend:
     ```bash
     firebase deploy
     ```

## Usage
- **User**: Sign up or log in using OTP or Google oAuth, create custom prints, and manage orders.
- **Admin**: Access the admin dashboard to manage products and orders.

## Roadmap
- Implement order tracking.
- Add coupon codes and promotional discounts.
- Integrate push notifications via WhatsApp and text messages.
- Implement location-specific discounts.
- Add mobile support for all features.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any questions or feedback, feel free to reach out to us at contact@printi.in.

---

