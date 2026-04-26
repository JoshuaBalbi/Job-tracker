# Job Tracker 🚀

A full-stack **Job Application Tracker** built with **React**, **Bootstrap**, **Node.js**, **Express**, and **Firebase Firestore**.

This application helps users organize and manage their job search by tracking applications, interview progress, offers, rejections, and notes — all through a modern responsive dashboard.

---

## 🌐 Live Project Overview

Job Tracker allows users to:

- Add new job applications
- Edit existing applications
- Delete applications
- Search applications instantly
- Filter by application status
- Sort by newest / oldest date
- View detailed notes in modal popups
- Track interview and offer progress on dashboard analytics
- Persist data in the cloud using Firebase Firestore

---

## 🛠 Tech Stack

### Frontend
- React
- React Router DOM
- Bootstrap 5
- CSS3

### Backend
- Node.js
- Express.js

### Database
- Firebase Firestore

### Other Tools
- Vite
- REST APIs
- Git / GitHub

---

## 📸 Features

### Dashboard Page
- Total Applications
- Applied Count
- Interview Count
- Rejected Count
- Interview Rate
- Offer Rate
- Recent Applications Table

### Applications Page
- Add Application Modal
- Edit Application Modal
- Delete Confirmation
- Search Bar
- Status Filter
- Sort Controls
- View Notes Popup
- Toast Notifications

---

## 🧠 What I Learned

This project helped strengthen my understanding of:

- React component architecture
- Hooks (`useState`, `useEffect`, `useMemo`)
- Controlled forms
- State management
- Conditional rendering
- REST API integration
- Express backend development
- CRUD operations
- Firebase Firestore integration
- Responsive UI design with Bootstrap

---

## 🏗 Project Structure

```bash
job-tracker/
│── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
│── backend/
│   ├── server.js
│   ├── .env
│   └── serviceAccountKey.json
```


## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/JoshuaBalbi/job-tracker.git
cd job-tracker
```

### 2️⃣ Install Frontend Dependencies

```bash

npm install

```

### 3️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 4️⃣ Add Firebase Credentials
Inside the backend/ folder, add your Firebase Admin SDK key file:

```bash
serviceAccountKey.json
```
Create a .env file inside backend/:
```bash
PORT=5001
```

### ▶️ Run Project
Start Backend Server
```bash
cd backend
npm run dev
```
Start Frontend Server
```bash
npm run dev
```

### 🔌 API Routes
```bash
GET    /api/health
GET    /api/applications
POST   /api/applications
PUT    /api/applications/:id
DELETE /api/applications/:id
```


## 💡 Future Improvements

- Firebase Authentication for secure user login and account management  
- Multi-user support with private application data per user  
- Dark mode / theme customization  
- Interactive charts and analytics dashboard  
- Resume and cover letter tracker  
- Interview scheduling reminders and notifications  
- Email follow-up tracker for recruiters  
- Application status timeline/history logs  
- Search optimization with advanced filters  
- Export applications to CSV / PDF  
- Public deployment using Vercel / Render / Railway  
- Unit and integration testing  
- Role-based admin dashboard for recruiters or team use  
- AI-powered job matching or resume suggestions

## 🎥 Demo Video

Watch a quick walkthrough of the Job Tracker application here: 

<p align="center">
  <img src="JOBTRACKERDEMO.gif"/>
</p>

This demo showcases:

- Dashboard analytics and metrics  
- Adding new job applications  
- Editing and deleting entries  
- Search, filtering, and sorting  
- Notes modal popups  
- Full-stack data persistence with Node.js + Firebase  

---

## 📌 Why I Built This

As someone actively pursuing software engineering opportunities, I wanted to build a practical real-world application that combines frontend, backend, and database technologies into one polished project.

This project demonstrates full-stack development using React, Bootstrap, Node.js, Express, and Firebase Firestore while solving a real productivity problem for job seekers.

It also gave me hands-on experience designing scalable UI components, building REST APIs, managing cloud data, and creating a responsive user experience.

---

## 👨‍💻 Author

**Joshua Balbi**

- LinkedIn: https://linkedin.com/in/joshua-balbi-4407981b3

---

## ⭐ If You Like This Project

Feel free to fork the repository, star the project, or connect with me on LinkedIn.
