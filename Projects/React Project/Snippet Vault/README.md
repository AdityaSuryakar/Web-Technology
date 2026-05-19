# 📚 Snippet Vault

A full-stack **Code Snippet Manager** built with React, Express.js, and MySQL. Save, search, tag, view, edit, and delete your code snippets — all persisted in a real database.

---

## ✨ Features

- **📝 Create Snippets** — Save code with a title, language, description, and tags
- **👁 View Snippets** — Full detail page with syntax-highlighted code
- **✏️ Edit Snippets** — Update any snippet at any time
- **🗑️ Delete Snippets** — Remove snippets with confirmation
- **🔍 Search** — Filter by title, description, tags, or code content
- **🏷️ Tag Filtering** — Click any tag to filter snippets by it
- **🌐 Language Filter** — Filter snippets by programming language
- **⎘ Copy to Clipboard** — One-click copy on every snippet card and view page
- **💾 MySQL Backend** — All data persisted in a real relational database
- **⚡ Vite + React** — Lightning-fast dev server with hot module replacement

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 19, React Router v7, Vite 8 |
| Styling    | Vanilla CSS (custom design system)|
| Syntax     | Highlight.js (Atom One Dark theme)|
| Backend    | Node.js, Express.js               |
| Database   | MySQL 8+ / MySQL 9.x              |
| ORM/Driver | mysql2 (Promise API)              |
| Config     | dotenv                            |

---

## 📁 Project Structure

```
Snippet Vault/
│
├── server/                     # Express.js backend
│   ├── index.js                # REST API server
│   ├── db.js                   # MySQL connection pool
│   ├── schema.sql              # Database schema
│   ├── .env                    # DB credentials (not committed)
│   └── package.json
│
├── src/                        # React frontend
│   ├── api/
│   │   └── snippetApi.js       # Centralized API service layer
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── SnippetCard.jsx     # Card with View / Edit / Delete
│   │   └── SnippetForm.jsx     # Shared add/edit form
│   ├── pages/
│   │   ├── Snippets.jsx        # Library listing with search & filters
│   │   ├── AddSnippet.jsx      # Create new snippet
│   │   ├── EditSnippet.jsx     # Edit existing snippet
│   │   └── ViewSnippet.jsx     # Full detail view
│   ├── App.jsx                 # Router + global state
│   └── App.css                 # Full design system styles
│
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) 8 or 9

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/snippet-vault.git
cd snippet-vault
```

---

### 2. Set Up the Database

Open your MySQL client and run:

```sql
CREATE DATABASE IF NOT EXISTS snippet_vault;
USE snippet_vault;

CREATE TABLE IF NOT EXISTS snippets (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255)  NOT NULL,
  language    VARCHAR(50)   NOT NULL DEFAULT 'javascript',
  code        LONGTEXT      NOT NULL,
  description TEXT,
  tags        TEXT,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

Or use the provided schema file:

```bash
mysql -u root -p < server/schema.sql
```

---

### 3. Configure Environment Variables

Create `server/.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=snippet_vault
PORT=5000
```

---

### 4. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ..
npm install
```

---

### 5. Run the App

Open **two terminals**:

**Terminal 1 — Backend API:**
```bash
cd server
node index.js
```
> ✅ API running on `http://localhost:5000`

**Terminal 2 — Frontend:**
```bash
npm run dev
```
> ⚡ App running on `http://localhost:5173`

---

## 🔌 API Reference

Base URL: `http://localhost:5000/api`

| Method   | Endpoint            | Description           |
|----------|---------------------|-----------------------|
| `GET`    | `/snippets`         | Fetch all snippets    |
| `GET`    | `/snippets/:id`     | Fetch a single snippet|
| `POST`   | `/snippets`         | Create a new snippet  |
| `PUT`    | `/snippets/:id`     | Update a snippet      |
| `DELETE` | `/snippets/:id`     | Delete a snippet      |
| `GET`    | `/health`           | DB connection check   |

### Snippet Object

```json
{
  "id": 1,
  "title": "Debounce Function",
  "language": "javascript",
  "code": "function debounce(fn, delay) { ... }",
  "description": "A utility to debounce function calls",
  "tags": ["utility", "performance"],
  "createdAt": "2026-05-19T13:00:00.000Z",
  "updatedAt": "2026-05-19T13:00:00.000Z"
}
```

---

## 🎨 Supported Languages

| Language   | Badge Color |
|------------|-------------|
| JavaScript | Amber       |
| TypeScript | Blue        |
| Python     | Green       |
| HTML       | Red         |
| CSS        | Cyan        |
| Java       | Orange      |
| C++        | Indigo      |
| Shell      | Purple      |
| JSON       | Yellow      |
| Other      | Gray        |

---

## 📸 Pages Overview

| Route                  | Page           | Description                        |
|------------------------|----------------|------------------------------------|
| `/snippets`            | Library        | Grid view with search + filters    |
| `/add-snippet`         | Add Snippet    | Form to create a new snippet       |
| `/view-snippet/:id`    | View Snippet   | Full detail with highlighted code  |
| `/edit-snippet/:id`    | Edit Snippet   | Pre-filled form to update          |

---

## 🧑‍💻 Author

**Aditya Suryakar**

---

## 📄 License

This project is for educational purposes.
