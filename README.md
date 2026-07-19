# 🔗 URL Shortener

A full-stack URL Shortener built with **Node.js, Express.js, MongoDB, and EJS** that allows users to convert long URLs into short, shareable links with custom aliases and redirect functionality.

## 🚀 Features

- 🔗 Shorten long URLs instantly
- ✨ Custom short aliases
- 🔄 Automatic redirection
- 💾 MongoDB database integration
- ⚡ Fast and lightweight backend
- ✅ URL validation
- 📱 Responsive user interface
- 🔒 Secure REST API architecture

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- EJS

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Tools
- Git
- GitHub
- Postman

---

## 📂 Project Structure

```
url-shortener/
│
├── models/
├── routes/
├── controllers/
├── views/
├── public/
├── config/
├── app.js
├── package.json
└── README.md
```

---


### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
```

### Start the server

```bash
npm run dev
```

or

```bash
npm start
```

---

## 📷 Screenshots

- Home Page
- <img width="343" height="302" alt="Screenshot 2026-07-19 175217" src="https://github.com/user-attachments/assets/681864f8-8c94-4270-aea1-2c1617c5317e" />

- URL Creation
- <img width="719" height="409" alt="Screenshot 2026-07-19 175235" src="https://github.com/user-attachments/assets/33e22e09-c282-4681-bc9b-016d8f79d8fd" />

- Short URL Output
- <img width="733" height="290" alt="Screenshot 2026-07-19 175303" src="https://github.com/user-attachments/assets/05fee33b-8ab5-4e2d-8cf5-55f741f4e74e" />


---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/shorten` | Create a short URL |
| GET | `/:shortId` | Redirect to original URL |

---

## 📌 Future Improvements

- 📊 Click Analytics
- 🔐 User Authentication
- 📈 Dashboard
- 📅 URL Expiration
- 🗑️ Delete URLs
- ⭐ Custom Domains

---

## 👨‍💻 Author

**Shivam Shukla**

---

## ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub.
