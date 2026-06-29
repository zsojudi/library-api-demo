import { useState, useEffect} from 'react'
import { getBooks, addBook, markRead, deleteBook } from './api'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

//console.log('API functions loaded:', { getBooks, addBook, markRead });

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load books when the component first loads
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await getBooks();
      setBooks(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books. Make sure Flask is running on port 5000');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      await addBook(title);
      setTitle('');
      setAuthor('');
      setError('');
      fetchBooks(); // Refresh the list
    } catch (err) {
      console.error('Error adding book:', err);
      setError('Failed to add book');
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markRead(id);
      fetchBooks(); // Refresh the list
    } catch (err) {
      console.error('Error marking read:', err);
      setError('Failed to update book');
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks();//refresh the list
    } catch(err) {
      console.error('Error deleteing the book:', err);
      setError('Failed to delete book');
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>📚 My Library</h1>

      {error && (
        <div style={{ background: '#fee', color: '#c00', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
          {error}
          <button 
            onClick={() => setError('')} 
            style={{ marginLeft: '10px', background: 'none', border: 'none', color: '#c00', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Add Book Form */}
      <form onSubmit={handleAddBook} style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: '2', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', minWidth: '150px' }}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ flex: '1', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', minWidth: '120px' }}
        />
        <button 
          type="submit" 
          style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Add Book
        </button>
      </form>

      {/* Book List */}
      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p style={{ color: '#666' }}>No books yet. Add your first book above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {books.map((book) => (
            <li 
              key={book.id} 
              style={{ 
                padding: '12px 15px', 
                marginBottom: '8px', 
                background: book.read ? '#f0f8f0' : '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <span>
                <strong>{book.title}</strong> by {book.author}
                <span style={{ marginLeft: '10px', fontSize: '0.85rem', color: book.read ? '#28a745' : '#666' }}>
                  {book.read ? '✅ Read' : '📖 Unread'}
                </span>
              </span>
              <button
                onClick={() => handleMarkRead(book.id)}
                disabled={book.read}
                style={{
                  padding: '5px 12px',
                  background: book.read ? '#ccc' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: book.read ? 'not-allowed' : 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                {book.read ? 'Done' : 'Mark Read'}
              </button>
              <br></br>
               <button
                onClick={() => handleDeleteBook(book.id)}
                style={{
                  padding: '5px 12px',
                  background: '#ca1c12',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                }}
              >
                {'Delete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;


/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
*/
