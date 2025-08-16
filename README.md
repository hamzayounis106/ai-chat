# AI Chat Terminal

![AI Chat Terminal](./public/image.png)

> A retro-styled terminal AI chat application built with Next.js 15, NextAuth, MongoDB, and Google Gemini API.

## 🚀 Features

### 🤖 AI Integration
- **Google Gemini API** integration for intelligent responses
- Real-time chat with AI assistant
- Message history persistence
- Session-based conversations

### 🔐 Authentication
- **NextAuth.js** for secure authentication
- User registration and login
- Protected routes with middleware
- Session management

### 💎 Pro Features
- **Message Limits** for free users (20 messages/day)
- **Pro Upgrade** system with email contact
- Usage tracking and limits
- Pricing page with credit system

### 🎨 Retro Terminal UI
- **90s Terminal Aesthetic** with green-on-black color scheme
- Monospace fonts and terminal-style components
- Custom scrollbars and animations
- Responsive design (max-width: 1900px)
- CSS animations instead of heavy libraries

### 💾 Data Management
- **MongoDB** with Mongoose ODM
- Separate Chat and Message models
- UUID-based chat sessions
- Message persistence and retrieval

### 🔧 Modern Tech Stack
- **Next.js 15.4.6** with App Router
- **React 19.1.0** with TypeScript
- **Tailwind CSS v4** for styling
- **Middleware** for route protection
- **Server Components** and **Client Components**

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-chat
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Environment Configuration**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # NextAuth
   NEXTAUTH_SECRET=your_nextauth_secret_key_here_make_it_long_and_random
   NEXTAUTH_URL=http://localhost:3000
   
   # Google Gemini API
   GEMENEI_API_KEY=your_google_gemini_api_key
   GEMENEI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ai-chat/
├── app/                          # Next.js 15 App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # NextAuth configuration
│   │   │   ├── [...nextauth]/    # NextAuth handler
│   │   │   └── signup/           # User registration
│   │   └── chat/                 # Chat API endpoints
│   ├── chat/                     # Chat pages
│   │   ├── ClientChat.tsx        # Chat interface component
│   │   ├── ClientWrapper.tsx     # Client wrapper
│   │   └── page.tsx              # Chat page
│   ├── login/                    # Login page
│   ├── signup/                   # Signup page
│   ├── pricing/                  # Pricing page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── Auth/                     # Authentication components
│   │   ├── LoginCard.tsx         # Login form
│   │   └── SignupCard.tsx        # Signup form
│   ├── chat/                     # Chat components
│   │   ├── MessageBubble.tsx     # Message display
│   │   └── TypingDots.tsx        # Typing indicator
│   ├── Header.tsx                # Navigation header
│   ├── Sidebar.tsx               # Chat sessions sidebar
│   ├── LayoutWrapper.tsx         # Layout wrapper
│   ├── LimitModal.tsx            # Message limit modal
│   ├── NextAuthProvider.tsx      # NextAuth provider
│   └── DevPanel.tsx              # Development utilities
├── lib/                          # Utility libraries
│   ├── auth.ts                   # NextAuth configuration
│   ├── mongoose.ts               # Database connection
│   └── messageLimit.ts           # Message limit logic
├── models/                       # Database models
│   ├── User.ts                   # User model
│   ├── Chat.ts                   # Chat session model
│   └── Message.ts                # Message model
├── types/                        # TypeScript definitions
│   └── global.d.ts               # Global type declarations
├── middleware.ts                 # Next.js middleware
└── public/                       # Static assets
    └── image.png                 # App screenshot
```

## 🔄 How It Works

### Authentication Flow
1. User visits any protected route
2. Middleware checks authentication status
3. Unauthenticated users redirect to `/login`
4. NextAuth handles login with credentials
5. Successful authentication allows access to chat

### Chat Flow
1. User authenticated and redirected to `/chat?sessionId=uuid`
2. Client loads existing messages for session
3. User sends message → saved to MongoDB
4. Message sent to Google Gemini API
5. AI response received and saved
6. UI updates with new messages
7. Session saved to localStorage for sidebar

### Message Limits
- Free users: 20 messages per day
- Pro users: Unlimited messages
- Limits reset daily at midnight
- Modal blocks usage when limit reached

## 🎨 UI Features

### Retro Terminal Styling
- Green text on black background
- Monospace font family
- Terminal-style brackets and prompts
- Custom scrollbars with terminal colors
- CSS animations for typing effects

### Responsive Design
- Mobile-friendly interface
- Sidebar collapse on smaller screens
- Maximum width of 1900px
- Flexible layout components

### Interactive Elements
- Clickable chat sessions in sidebar
- Real-time message updates
- Auto-scroll to latest messages
- Typing indicators during AI responses

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables for Production
Make sure to set all environment variables in your production environment:
- `MONGODB_URI`
- `NEXTAUTH_SECRET` 
- `NEXTAUTH_URL` (your production URL)
- `GEMENEI_API_KEY`
- `GEMENEI_API_URL`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For Pro upgrade or support, contact: **hamza@creatic.pro**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Google Gemini](https://ai.google.dev/) for AI capabilities
- [MongoDB](https://www.mongodb.com/) for database services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vercel](https://vercel.com/) for deployment platform

---

**Built with ❤️ using modern web technologies**
