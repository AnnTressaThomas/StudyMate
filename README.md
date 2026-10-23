# StudyMate – Student Task & Study Planner 🎓

StudyMate is a responsive, beginner-friendly MERN stack (MongoDB, Express.js, React, Node.js) web application designed to help students track subjects, assignments, upcoming deadlines, and study progress in one place.

---

## 🌟 Key Features

- **📊 Comprehensive Student Dashboard:** Real-time statistics displaying total subjects, total assignments, pending tasks, completed tasks, and a dynamic progress bar tracking completion percentage.
- **📚 Course & Subject Management:** Add, view, edit, and delete academic subjects with custom codes and color tags.
- **📝 Assignment Tracking:** Create and manage assignments with titles, detailed notes, linked subjects, and deadline pickers.
- **⏰ Smart Deadline Tracking:** Automatic categorization of pending tasks into upcoming deadlines (sorted chronologically) and red-highlighted **Overdue** alerts for passed deadlines.
- **📈 Study Progress & Completion:** One-click status toggling between "Pending" and "Completed" with instant metric updates.
- **🛡️ Cascading Delete Safety:** Deleting a subject cleanly removes all associated assignments, keeping database records consistent.
- **📱 Responsive & Clean UI:** Clean blue-and-white theme built with standard CSS, responsive across desktops, tablets, and smartphones.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18 (JavaScript) | Component-based UI built with Vite |
| **Styling** | Vanilla CSS3 | Modern variables, flexbox, and responsive CSS grid |
| **Backend** | Node.js & Express.js | RESTful API with route controllers and validation middleware |
| **Database** | MongoDB & Mongoose | Document database with schema validation and cascade removal |
| **Security & Utilities** | CORS & Dotenv | Cross-origin request handling and environment variable isolation |

---

## 📁 Folder Structure

```text
StudyMate/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection handler
│   ├── controllers/
│   │   ├── subjectController.js   # Subject CRUD logic
│   │   └── assignmentController.js# Assignment CRUD & dashboard summary logic
│   ├── middleware/
│   │   └── errorMiddleware.js    # Centralized API error handler
│   ├── models/
│   │   ├── Subject.js            # Subject Mongoose schema
│   │   └── Assignment.js         # Assignment Mongoose schema
│   ├── routes/
│   │   ├── subjectRoutes.js      # /api/subjects routes
│   │   └── assignmentRoutes.js   # /api/assignments routes
│   ├── .env.example              # Backend environment template
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server & CORS configuration
│
├── frontend/
│   ├── public/                   # Static assets & favicon
│   ├── src/
│   │   ├── components/           # Modular UI elements
│   │   │   ├── AssignmentCard.jsx
│   │   │   ├── AssignmentModal.jsx
│   │   │   ├── DashboardStats.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StudyProgress.jsx
│   │   │   └── SubjectModal.jsx
│   │   ├── pages/                # Views
│   │   │   ├── DashboardView.jsx
│   │   │   ├── AssignmentsView.jsx
│   │   │   └── SubjectsView.jsx
│   │   ├── services/
│   │   │   └── api.js            # Centralized API fetch layer
│   │   ├── App.css               # Clean blue-and-white theme
│   │   ├── App.jsx               # Root application component
│   │   └── main.jsx              # Vite entry point
│   ├── .env.example              # Frontend environment template
│   ├── index.html                # HTML entry point
│   ├── package.json              # Frontend dependencies
│   └── vite.config.js            # Vite build configuration
│
├── .gitignore                    # Git ignore file protecting .env & node_modules
└── README.md                     # Project documentation
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
Create a `.env` file in the `backend/` directory based on `backend/.env.example`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/studymate
CLIENT_URL=http://localhost:5173
```
*For cloud hosting, replace `MONGO_URI` with your MongoDB Atlas connection string and `CLIENT_URL` with your frontend domain.*

### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend/` directory based on `frontend/.env.example`:
```env
VITE_API_URL=http://localhost:5000/api
```
*For cloud hosting, replace `VITE_API_URL` with your deployed backend URL (e.g. `https://your-backend.onrender.com/api`).*

---

## 🚀 Local Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) running locally or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection URI

### Step 1: Clone Repository
```bash
git clone https://github.com/<your-username>/StudyMate.git
cd StudyMate
```

### Step 2: Set up Backend
```bash
cd backend
npm install
cp .env.example .env
# Start the backend server (runs on port 5000)
npm run dev
```

### Step 3: Set up Frontend
Open a new terminal window:
```bash
cd frontend
npm install
cp .env.example .env
# Start frontend development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 REST API Reference

### Health Check
- `GET /api/health` - Check backend health status

### Subjects (`/api/subjects`)
- `GET /api/subjects` - List all subjects
- `POST /api/subjects` - Create a new subject (`{ name, code, color }`)
- `GET /api/subjects/:id` - Fetch single subject by ID
- `PUT /api/subjects/:id` - Update subject details
- `DELETE /api/subjects/:id` - Delete subject and cascade delete all related assignments

### Assignments (`/api/assignments`)
- `GET /api/assignments` - List all assignments (supports `?status=Pending` and `?subject=:id`)
- `POST /api/assignments` - Create assignment (`{ title, description, subject, dueDate, status }`)
- `GET /api/assignments/:id` - Fetch single assignment by ID
- `PUT /api/assignments/:id` - Update assignment (details or toggle status)
- `DELETE /api/assignments/:id` - Delete single assignment
- `GET /api/assignments/stats/summary` - Fetch dashboard statistics & progress metrics

---

## 🚢 Deployment Guide

Recommended beginner-friendly and free cloud hosting options:
- **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free 512MB shared tier)
- **Backend:** [Render](https://render.com) (Free web service) or [Railway](https://railway.app)
- **Frontend:** [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com)

### 1. Database Deployment (MongoDB Atlas)
1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free **M0 cluster**.
3. Under **Database Access**, create a user with a password.
4. Under **Network Access**, add IP `0.0.0.0/0` (allow access from anywhere).
5. Click **Connect -> Drivers** and copy your connection string:
   `mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/studymate?retryWrites=true&w=majority`

### 2. Backend Deployment (Render)
1. Push your repository to GitHub.
2. Sign in to [Render](https://render.com) and click **New + -> Web Service**.
3. Connect your StudyMate repository.
4. Configure settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables in the Render dashboard:
   - `PORT`: `5000`
   - `MONGO_URI`: *(your MongoDB Atlas URI)*
   - `CLIENT_URL`: *(your Vercel frontend URL, or `*` temporarily)*
6. Click **Deploy**. Note your live backend URL (e.g., `https://studymate-api.onrender.com`).

### 3. Frontend Deployment (Vercel)
1. Sign in to [Vercel](https://vercel.com) and import your GitHub repository.
2. Configure settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
3. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend-service.onrender.com/api`
4. Click **Deploy**.

---

## 🎓 College Submission & Documentation Preparation

### Screenshots to Capture:
1. **Dashboard View:** Shows the summary cards, progress bar at ~50%, and upcoming tasks.
2. **Overdue Task Alert:** Shows an assignment card with the red border and **Overdue** tag.
3. **Subjects View:** Shows courses with color pills and task counters.
4. **Add Assignment Modal:** Shows form validation with date picker and subject dropdown.
5. **Mobile View:** Using Chrome DevTools Device Mode (`Ctrl+Shift+M`) displaying the responsive collapsed sidebar.
6. **MongoDB Compass / Atlas:** Showing the `subjects` and `assignments` collections in the database.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
