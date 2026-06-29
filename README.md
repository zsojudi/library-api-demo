# 📚 Library Manager – Full-Stack Application

A full-stack book management application built with **Flask** (backend) and **React** (frontend). Users can add, view, mark as read, and delete books.

## ✨ Features

- ✅ View all books
- ➕ Add new books (title + author)
- 📖 Mark books as read
- 🗑️ Delete books
- 🔄 Real-time UI updates
- 📱 Responsive design

## 🛠️ Tech Stack

### Backend
- **Flask** – Python web framework
- **Flask-SQLAlchemy** – ORM for database operations
- **SQLite** – Lightweight database

### Frontend
- **React** – UI library
- **Axios** – HTTP client for API calls
- **Vite** – Build tool and development server

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/library-api-demo.git
cd library-api-demo

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py