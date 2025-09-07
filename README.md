# Family Health Tracker

Family Health Tracker is a modern, full-stack web application designed to help families monitor and manage key health metrics. It provides a centralized platform for tracking measurements like blood pressure, blood sugar, weight, and cholesterol, presented in an intuitive and visually appealing interface.

## ✨ Features

- **Secure User Authentication**: Robust authentication including email/password signup, login, and password reset, with email verification.
- **Google OAuth 2.0**: Seamless sign-in and signup using Google accounts.
- **Family Member Management**: Easily add, view, and manage family members' profiles.
- **Health Metric Tracking**: Log and monitor crucial health data points with timestamps.
- **Interactive Data Visualization**: Dynamic charts to visualize health trends over time.
- **Responsive Design**: Fully responsive interface for a seamless experience on any device.
- **Dark Mode**: Switch between light and dark themes for personalized comfort.

## 🛠️ Tech Stack

### Frontend

- **Framework**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **State Management & Data Fetching**: [React Query](https://tanstack.com/query/latest)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Headless UI](https://headlessui.com/)
- **Charting**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Backend

- **Framework**: [Spring Boot](https://spring.io/projects/spring-boot)
- **Language**: Java 17
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: Spring Security with JWT
- **API**: RESTful API

## 🚀 Getting Started

### Prerequisites

- Java 17 or later
- Maven
- Node.js 18 or later
- npm
- MongoDB instance

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/health-tracker.git
    cd health-tracker/backend
    ```

2.  **Configure the application:**
    Open `src/main/resources/application.properties` and update the following properties:
    - `spring.data.mongodb.uri`: Your MongoDB connection string.
    - `app.jwt.secret`: A secure, 32+ character JWT secret.
    - `spring.mail.host`, `spring.mail.port`, `spring.mail.username`, `spring.mail.password`: Your SMTP server details for sending emails.
    - `spring.security.oauth2.client.registration.google.client-id` and `spring.security.oauth2.client.registration.google.client-secret`: Your Google OAuth2 credentials.

3.  **Run the backend server:**
    ```bash
    mvn spring-boot:run
    ```
    The backend will be running at `http://localhost:8080`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend will be running at `http://localhost:5173`.

## 📁 Project Structure

```
health-tracker/
├── backend/
│   ├── src/main/java/com/example/healthtracker/
│   │   ├── auth/         # Authentication logic
│   │   ├── config/       # Spring configurations
│   │   ├── controller/   # REST API controllers
│   │   ├── model/        # Data models
│   │   ├── repository/   # Database repositories
│   │   └── service/      # Business logic
│   └── pom.xml           # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # React contexts
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Application pages
│   │   ├── services/     # API service layer
│   │   └── types/        # TypeScript types
│   └── package.json      # Frontend dependencies
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request.

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature`).
6.  Open a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
