Family Health Tracker — Instructions & Implementation Notes

This document captures the product requirements, a small engineering contract, suggested data shapes and APIs, UI/component breakdown, tech stack, and a prioritized implementation checklist for the Family Health Tracker app.

**Summary**

This app allows users to track health measurements (BP, weight, sugar, cholesterol, etc.) for family members, providing a centralized view of their health data. Users can sign in with Google and track their health measurements over time.

**User Requirements**

*   **Authentication:**
    *   Login/Signup with email and password.
    *   Google Sign-in.
    *   Forgot Password/Reset Password flows.
*   **Data Tracking:**
    *   Record health measurements (BP, weight, sugar, cholesterol, etc.) for family members.
    *   Store measurements with timestamps.
*   **Family Management:**
    *   Add new family members.
    *   View family member details.

**Data Model**

*   **User:** `id, name, email, verified (bool), avatarUrl`
*   **Family:** `id, ownerId, name`
*   **Member:** `id, familyId, name, dob, gender, avatarUrl, relation`
*   **MedicalRecord:** `id, memberId, timestamp (ISO), measurements: { bp?: { systolic: number, diastolic: number }, sugar?: { value: number, type?: 'fasting'|'random'|'postprandial' }, weightKg?: number, heightCm?: number, bmi?: number, notes?: string, medications?: string[] }`

**Tech Stack**

*   **Framework:** React
*   **Styling:** Tailwind CSS
*   **Data Fetching:** React Query
*   **Form Handling:** React Hook Form + Zod
*   **Animations:** Framer Motion
*   **UI Components:** Headless UI / Radix primitives

**Component Breakdown**

*   **Pages:**
    *   `/auth/login` - `Auth/Login.jsx`
    *   `/auth/signup` - `Auth/Signup.jsx`
    *   `/auth/forgot` - `Auth/ForgotPassword.jsx`
    *   `/auth/reset` - `Auth/ResetPassword.jsx`
    *   `/dashboard` - `Dashboard.jsx`
    *   `/account` - `Account.jsx`
    *   `/members/:id` - `MemberDetail.jsx`
*   **Components:**
    *   `Header` (with user menu, add-member button)
    *   `MemberCard` (shows avatar, name, short snapshot: last BP, weight, BMI)
    *   `MemberList` (grid of `MemberCard`)
    *   `RecordModal` (add/edit medical record form in modal)
    *   `RecordList` (timeline or list view)
    *   `RecordChart` (time-series chart component, supports multiple metrics toggles)
    *   `AuthContext` (global context for authentication state)

**Implementation Checklist (Prioritized)**

1.  **Setup AuthContext & Basic Route Layout:**  Implement authentication context and basic route layout (public/auth routes + protected routes).
2.  **Auth Pages:** Implement login, signup, forgot/reset UI flows.
3.  **Dashboard:**
    *   `MemberList` with `MemberCard` skeletons.
    *   `RecordChart` skeleton with mocked data.
4.  **MemberDetail Page:** Implement `RecordChart` with mocked time-series data and metric selector.
5.  **Add-Record Modal:** Implement `RecordModal` (React Hook Form, Zod).
6.  **Google Login:** Integrate Google Sign-in UI flow.
7.  **Email Verification:** Implement email verification UI flow.
8.  **Connect to Backend:** Integrate React Query to fetch data from the backend API endpoints.
9.  **Testing & Accessibility:** Ensure tests pass and accessibility standards are met.

**Development Notes**

*   **Milestone A (MVP):** Auth (signup/login), dashboard with member cards (mocked), member detail chart (mocked), add-record modal (mocked).
*   **Milestone B:** Integrate backend auth and APIs, Google login, email verification.
*   **Milestone C:** Polish UI animations, export/print records, CSV download, reminders/notifications (future).

**Key Considerations**

*   **Error Handling:** Implement robust error handling and user-friendly error messages.
*   **Data Validation:** Use Zod for client-side form validation.
*   **Security:** Follow secure coding practices, including token storage and rate limiting.
*   **Accessibility:**  Prioritize accessibility throughout the development process.