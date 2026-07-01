from flask import Flask, request, jsonify
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship


app = Flask(__name__)

# Create engine and base class
engine = create_engine('sqlite:///app.db', echo=True)  # echo=True logs SQL
Base = declarative_base()

# Define models (tables as Python classes)
class Book(Base):
    __tablename__ = 'books'
    
    id = Column(Integer, primary_key = True)
    title = Column(String(100), nullable = False)
    author = Column(String(100), nullable = False)
    read = Column(Boolean, default = False)
    

# Create all tables
Base.metadata.create_all(engine)

# Create session (like a database connection manager)
Session = sessionmaker(bind=engine)
session = Session()

@app.route('/')
def home():
    return "Library API is running. Try /books"

@app.route('/books')
def get_books():
    books = session.query(Book).all()
    return jsonify([{'id': b.id, 'title': b.title, 'author': b.author, 'read': b.read} for b in books])

@app.route('/add_book/<book_title>')
def add_book(book_title):
    book = Book(title = book_title, author = 'null')
    session.add(book)
    session.commit()
    return f'Added {book_title}'

@app.route('/books/<int:book_id>')
def mark_read(book_id):
    book = session.query(Book).filter_by(id = book_id)
    updated = book.update({'read' : True})
    if updated == True:
        return jsonify([{'id': b.id, 'title': b.title, 'author': b.author, 'read': b.read} for b in book])
    return "Book not found"

@app.route('/delete_book/<int:book_id>')
def delete_book(book_id):
    book = session.query(Book).filter_by(id = book_id)
    if not book:
        return "Book not found"
    deleted = book.delete()
    return "The book successfully deleted"

# ---------------- Run the app -----------------------#
'''if __name__ == '__main__':
    app.run(debug = True)
'''



