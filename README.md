# Kalvi Thaervu — Government Exam Mock Test Platform

> AI-enabled mock test platform for TNPSC, UPSC, Banking & SSC aspirants.  
> A product of **Sharpened Mind Tech & Solutions Pvt. Ltd.**  
> Directed by **Durga Devi M**, Director & CEO

---

## 🏗 Tech Stack

| Layer      | Technology                           |
|------------|--------------------------------------|
| Frontend   | React 18 + Vite                      |
| Styling    | CSS Modules (global.css) + Inline    |
| State      | React Context API (Auth + Exam)      |
| Routing    | Custom client-side router            |
| Backend    | Node.js + Express *(connect here)*   |
| Database   | MongoDB *(connect here)*             |
| Fonts      | Playfair Display + Lato (Google)     |

---

## 📁 Project Structure

```
kalvithervu/
├── public/
│   └── index.html
├── src/
│   ├── assets/              # images, icons, fonts
│   ├── components/
│   │   ├── common/
│   │   │   ├── Logo.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Mandala.jsx
│   │   ├── ads/
│   │   │   └── AdPlayer.jsx
│   │   └── exam/
│   │       └── NavigationPalette.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ExamContext.jsx
│   ├── hooks/
│   │   ├── useExamTimer.js
│   │   └── useAdUnlock.js
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── student/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ExamsPage.jsx
│   │   │   ├── ExamDetailPage.jsx
│   │   │   ├── ExamRoomPage.jsx
│   │   │   ├── ResultPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   └── AboutPage.jsx
│   │   ├── publisher/
│   │   │   └── PublisherDashboardPage.jsx
│   │   └── admin/
│   │       └── AdminDashboardPage.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── styles/
│   │   └── global.css
│   ├── utils/
│   │   ├── constants.js
│   │   └── scoreCalc.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# Opens at http://localhost:3000

# 3. Build for production
npm run build
```

---

## 🔑 Demo Login

| Username      | Role      | Redirects To         |
|---------------|-----------|----------------------|
| `admin`       | Admin     | Admin Dashboard      |
| `publisher1`  | Publisher | Publisher Dashboard  |
| anything else | Student   | Student Dashboard    |

> Password: any non-empty value

---

## 📄 Pages Included

| Page                    | Route / Page Key        |
|-------------------------|-------------------------|
| Landing / Home          | `home`                  |
| Login                   | `login`                 |
| Register                | `register`              |
| Exam Listing            | `exams`                 |
| Exam Detail + Ad Unlock | `exam-detail`           |
| Exam Room (Full Screen) | `exam-room`             |
| Result & Analytics      | `result`                |
| Student Dashboard       | `dashboard`             |
| About Us                | `about`                 |
| Publisher Dashboard     | `publisher-dashboard`   |
| Admin Dashboard         | `admin-dashboard`       |

---

## 💰 Monetization Model

- **Phase 1 (< 2000 users):** Ad-based only. 1 free attempt → watch 30s ad for re-attempt.
- **Phase 2:** Hybrid — free (ads) + Premium subscription (unlimited, ad-free, advanced analytics).
- **Publisher Revenue:** ₹0.50 per completed attempt after 1,000 attempts minimum per exam.

---

## 🛡 Security Features (Exam Room)

- Full-screen enforcement
- Tab-switch detection → auto-lock / terminate
- Keyboard shortcuts disabled
- One-device session policy
- Auto-submit on timer expiry
- Activity logging

---

## 📦 Environment Variables (Backend)

Create a `.env` file in your backend:

```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/kalvithervu
JWT_SECRET=your_jwt_secret
PORT=5000
AD_PROVIDER_KEY=your_ad_sdk_key
```

---

*Kalvi Thaervu — Excellence Today, Bright Future Tomorrow.*
"# kalvi" 
