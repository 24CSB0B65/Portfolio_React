# Portfolio Full-Stack Application

This project extends my React Portfolio Website by adding a Node.js and Express backend with SQLite database storage.

The React frontend fetches project data from the backend and submits contact form messages through a live API.

The project contains two parts:

- `portfolio-react` — React frontend
- `server` — Node.js/Express backend

---

## Application Flow

### Projects

```text
React Frontend
      ↓
GET /api/projects
      ↓
Express Backend
      ↓
SQLite Database
```

### Single Project

```text
React Frontend
      ↓
GET /api/projects/:id
      ↓
Express Backend
      ↓
SQLite Database
```

### Contact Form

```text
React Frontend
      ↓
POST /api/contact
      ↓
Express Validation
      ↓
SQLite Database
```

---

# Technologies Used

## Frontend

- React
- React Router
- JavaScript
- CSS
- Fetch API

## Backend

- Node.js
- Express.js
- SQLite
- Sequelize
- Zod
- JWT
- bcryptjs
- CORS
- dotenv
- Helmet

---

# How to Run the Project

This application requires both the backend and frontend to be running.

## 1. Run the Backend

Open a terminal and go to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create the environment file from `.env.example`.

Example:

```bash
cp .env.example .env
```

Then update the values in `.env` if necessary.

Start the backend:

```bash
npm run dev
```

The backend runs at:

```text
http://localhost:5000
```

The basic API check is:

```text
GET http://localhost:5000/
```

Expected response:

```json
{
  "status": "ok"
}
```

---

## 2. Run the React Frontend

Open another terminal.

Go to the React project:

```bash
cd portfolio-react
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The React application runs at:

```text
http://localhost:5173
```

Both the frontend and backend should be running at the same time.

---

# Environment Variables

The backend uses environment variables for configuration.

Create a `.env` file inside the `server` folder.

Example:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_STORAGE=./data/portfolio.sqlite

# Authentication
JWT_SECRET=your-long-random-secret-here
JWT_EXPIRES_IN=1d

# CORS
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
AUTH_RATE_LIMIT_MAX=10
```

The actual `.env` file should not be committed to GitHub.

The `.env.example` file is included to show all required variables.

---

# API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Confirms that the API is running |
| GET | `/api/projects` | Returns all projects |
| GET | `/api/projects/:id` | Returns a single project |
| POST | `/api/contact` | Submits a contact form message |
| GET | `/api/contact` | Returns all submitted contact messages |

---

## 1. API Health Check

### Request

```http
GET /
```

### Response

```json
{
  "status": "ok"
}
```

Status:

```text
200 OK
```

---

## 2. Get All Projects

### Request

```http
GET /api/projects
```

Example:

```text
http://localhost:5000/api/projects
```

### Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Student Resource Allocator",
      "description": "Project description",
      "tech": [
        "React",
        "Node.js"
      ],
      "image": "example.jpg",
      "link": "https://github.com/example"
    }
  ]
}
```

Status:

```text
200 OK
```

The React Projects page fetches this data using `useEffect()` and `fetch()`.

---

## 3. Get a Single Project

### Request

```http
GET /api/projects/:id
```

Example:

```text
GET http://localhost:5000/api/projects/1
```

The React application uses:

```js
useParams()
```

to read the project ID from the URL.

For example:

```text
/projects/1
```

causes the frontend to fetch:

```text
GET /api/projects/1
```

If the project does not exist, the frontend displays a Project Not Found message.

---

## 4. Submit Contact Form

### Request

```http
POST /api/contact
Content-Type: application/json
```

### Request Body

```json
{
  "name": "Deekshitha",
  "email": "test@example.com",
  "message": "Hello, this is a test message."
}
```

### Successful Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Deekshitha",
    "email": "test@example.com",
    "message": "Hello, this is a test message."
  }
}
```

Valid submissions are stored in the SQLite database.

The React Contact form sends the request using:

```js
fetch("http://localhost:5000/api/contact", {
  method: "POST"
})
```

After successful submission:

- A success message is displayed.
- The form fields are cleared.
- The message is stored in the backend database.

---

## Contact Form Validation

The backend validates the following:

- Name is required.
- Email is required.
- Email must have a valid format.
- Message is required.
- Message must contain at least 5 characters.

Invalid requests return an error response with HTTP status:

```text
400 Bad Request
```

---

## 5. List Contact Submissions

### Request

```http
GET /api/contact
```

Example:

```text
http://localhost:5000/api/contact
```

### Example Response

```json
[
  {
    "id": 1,
    "name": "Deekshitha",
    "email": "test@example.com",
    "message": "Hello, this is a test message.",
    "isRead": false
  }
]
```

This endpoint is intentionally open without authentication for assignment verification.

In a production application, contact submissions would normally be protected and accessible only to an administrator.

---

# Frontend Integration

## Projects Page

The Projects page no longer renders projects from the static `projects.js` file.

Instead:

```text
Projects.jsx
      ↓
useEffect()
      ↓
fetch()
      ↓
GET /api/projects
      ↓
Backend
      ↓
SQLite
```

The page includes:

- Loading state while data is being fetched.
- Error state if the backend is unavailable.
- Normal project cards when the request succeeds.

---

## Project Details Page

The dynamic route is:

```text
/projects/:projectId
```

The application uses:

```js
useParams()
```

to read the project ID.

Example:

```text
/projects/1
```

The frontend then requests:

```text
GET /api/projects/1
```

If the project does not exist, the user sees:

```text
Project Not Found
```

instead of a blank page or application crash.

---

## Contact Form

The Contact form is a controlled React component.

The flow is:

```text
User fills form
      ↓
Client-side validation
      ↓
POST /api/contact
      ↓
Server-side validation
      ↓
SQLite Database
      ↓
Success or Error Message
```

The form handles:

- Client-side validation
- Server-side validation errors
- Loading/submitting state
- Successful submission
- Form reset after success
- Backend connection errors

---

# Error Handling

The backend includes centralized error handling.

Undefined routes return a JSON error response instead of an HTML page.

Example:

```text
GET /api/doesnotexist
```

Expected result:

```text
404 Not Found
```

The server also uses a global error-handling middleware to prevent unexpected errors from crashing the application.

---

# CORS

CORS is enabled so that the React frontend running on:

```text
http://localhost:5173
```

can communicate with the backend running on:

```text
http://localhost:5000
```

The allowed frontend origin is configured using:

```env
CORS_ORIGIN=http://localhost:5173
```

---

# Project Structure

```text
project-root/
│
├── portfolio-react/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   └── ProjectInfo.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectDetails.jsx
│   │   │   └── Contact.jsx
│   │   │
│   │   └── data/
│   │       └── projects.js
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── data/
│   │   └── portfolio.sqlite
│   │
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

# Testing

The API can be tested using Postman.

Important tests include:

```text
GET /
GET /api/projects
GET /api/projects/1
GET /api/projects/999
POST /api/contact
GET /api/contact
GET /api/doesnotexist
```

Example failure cases:

### Invalid Contact Request

```json
{
  "name": "",
  "email": "invalid-email",
  "message": ""
}
```

Expected:

```text
400 Bad Request
```

### Non-Existent Project

```text
GET /api/projects/999
```

Expected:

```text
404 Not Found
```

### Undefined Route

```text
GET /api/doesnotexist
```

Expected:

```text
404 Not Found
```

---

# Screen Recording Demonstration

The application can be demonstrated in a short 2–3 minute recording showing:

1. Backend server running.
2. React frontend running.
3. Projects page loading projects from the backend.
4. Opening a project details page.
5. Directly visiting a project URL.
6. Submitting the Contact form successfully.
7. Checking the saved contact submission with `GET /api/contact`.
8. Stopping the backend.
9. Refreshing the Projects page to show the frontend error state.
10. Restarting the backend and showing that the application recovers.

---

# Assignment Requirements Completed

## Backend

- B1 — Express Server Setup and Health Check
- B2 — GET `/api/projects`
- B3 — GET `/api/projects/:id`
- B4 — POST `/api/contact`
- B5 — GET `/api/contact`
- B6 — Centralized Error Handling and 404 Handling
- B7 — CORS and Environment Configuration

## Frontend

- F1 — Fetch Projects from Backend
- F2 — Handle Fetch Errors
- F3 — Fetch Single Project for Detail Page
- F4 — Submit Contact Form to Backend

---

# Storage

SQLite with Sequelize is used for persistent backend storage.

Projects and contact messages are stored in the SQLite database instead of being duplicated in the React frontend.