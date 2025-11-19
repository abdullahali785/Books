# Abdullah's Books 📚

A personal book tracker web app built with **Node.js (Express)**, **PostgreSQL**, and **EJS**.  
You can see what books I have read, sort them by title, date, or rating. I have used the **OpenLibrary Covers API** to display cover images for the books I've read.

---

## ✨ Features
- Add new books with **title, author, notes, cover ID (ISBN), rating, and date read**.
- Display all books with cover images pulled from [OpenLibrary Covers API](https://openlibrary.org/dev/docs/api/covers).
- Sort books by:
  - **Date** (Newest first)
  - **Rating** (Highest first)
  - **Title** (Alphabetical)
- Edit book details.
- Delete a book.
- Default book cover image handling (if no cover is available).

---

## 🛠 Tech Stack
- **Backend**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Templating**: [EJS](https://ejs.co/)
- **Styling**: [Bootstrap 5](https://getbootstrap.com/)
- **Covers API**: [OpenLibrary Covers](https://openlibrary.org/dev/docs/api/covers)

---

[Home](public/Home.png?raw=True)

---

## ⚡ Installation
   ```bash
   git clone https://github.com/abdullahali/Books.git
   cd Books
   
   npm install

   node index.js
   ```

---
