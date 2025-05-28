export default function NotFoundPage() {
  return (
    <div className='app-div'>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 className='orange-text'>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <a href='/' style={{ color: '#D73F09', textDecoration: 'underline' }}>
          <button className='back-button'>
            Go back to home
          </button>
        </a>
      </div>
    </div>
  );
}