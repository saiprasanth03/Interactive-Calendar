# Interactive Wall Calendar Component

A polished, high-end React/Vite web component built as part of a Frontend Engineering Challenge. This project translates a static wall calendar design concept into a highly functional, responsive, and visually stunning web experience.

## 🌟 Key Features

### 1. Physical Wall Calendar Aesthetic
- **Realistic Spiral Binder**: Custom metallic 3D-effect spiral rings rendered at the top of the calendar.
- **Diagonal Slant Geometry**: A sharp, editorial diagonal intersection between the hero imagery and the calendar grid.
- **Curated Monthly Imagery**: 12 unique, high-resolution nature landscapes that change automatically as you navigate between months.
- **"Page-Flip" Animations**: Smooth vertical transitions that simulate the physical motion of turning a calendar page.

### 2. Interactive Functionality
- **Day Range Selector**: Robust logic allowing users to select a start and end date, with subtle visual tracks for the intermediate period.
- **Integrated Notes System**: A physical "ruled paper" notepad area for jotting down memos for specific dates or ranges, persistent via `localStorage`.
- **Date Blocking**: All dates prior to the current date are visually dimmed and blocked from selection to ensure data integrity.

### 3. Modern Design System
- **Advanced Typography**: A sophisticated mix of 'Outfit' and 'Inter' fonts for an elegant, professional look.
- **Glassmorphism**: Translucent, blurred overlays for navigation and badges.
- **Full Responsiveness**: A mobile-first strategy that scales the binder rings and adjusts the slant angle for optimal viewing on any device.

## 🛠️ Tech Stack

- **Framework**: React.js
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Modern CSS variables, Flexbox/Grid, Clip-paths)
- **Animations**: Framer Motion
- **Date Logic**: date-fns
- **Icons**: Lucide React

## 🚀 How to Run Locally

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd calender
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   The app will typically be available at `http://localhost:5173`.

---

*Built with passion for high-end frontend engineering.*
