# Family Health Tracker

A centralized health tracking application for family members to monitor blood pressure, weight, sugar, and cholesterol measurements over time.

## Features

- 🔒 **User Authentication**: Login, signup, Google sign-in, password reset flows
- 📊 **Health Tracking**: Record and visualize health measurements with timestamps
- 👨‍👩‍👧‍👦 **Family Management**: Add/view family members with detailed profiles
- 📈 **Data Visualization**: Interactive time-series charts for health metrics

## Tech Stack

| Category          | Technology                     |
|--------------------|---------------------------------|
| Framework          | React                          |
| Styling            | Tailwind CSS                   |
| Data Fetching      | React Query                    |
| Form Handling      | React Hook Form + Zod          |
| Animations         | Framer Motion                  |
| UI Components      | Headless UI / Radix primitives |

## Implementation Plan

We prioritize these milestones:

1. **MVP (Milestone A)**:  
   - Auth flows (login/signup)
   - Dashboard with member cards (mocked)
   - Member detail chart (mocked)
   - Add-record modal (mocked)

2. **Milestone B**:  
   - Backend integration
   - Google login
   - Email verification

3. **Milestone C**:  
   - Polish UI animations
   - CSV exports
   - Reminders and notifications

## Component Breakdown

- **Pages**:
  - `/auth/login`
  - `/auth/signup`
  - `/dashboard`
  - `/account`
  - `/members/:id`

- **Components**:
  - `Header` (with user menu)
  - `MemberCard` (avatar, name, health snapshot)
  - `MemberList` (grid of member cards)
  - `RecordModal` (add/edit medical record form)
  - `RecordChart` (time-series chart with metric toggles)
  - `AuthContext` (global authentication state)

## Development Notes

- 🔒 **Security**: Secure token storage and rate limiting
- 🛠️ **Validation**: Client-side validation using Zod
- 🧑‍💻 **Accessibility**: Prioritized throughout development
- 🚨 **Error Handling**: Robust error messaging for all user interactions

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development: `npm run dev`

## Contributing
Pull requests are welcome! Please follow these guidelines:
1. Create a new branch
2. Make your changes
3. Add tests if applicable
4. Submit a pull request with clear description