import { useEffect } from 'react';

export default function ArticleModal({ article, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div
      className="modal-backdrop open"
      id="articleModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalArticleTitle"
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{ maxWidth: '800px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          id="closeArticleModalBtn"
          onClick={onClose}
          aria-label="Close Article Modal"
        >
          &times;
        </button>
        {article.image && (
          <div style={{ marginBottom: '1.25rem', aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#000000' }}>
            <img
              src={article.image}
              alt={article.title}
              id="modalArticleImg"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
        <div
          id="modalArticleCat"
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--accent-gold)',
            marginBottom: '0.4rem',
            letterSpacing: '0.05em',
          }}
        >
          {article.category}
        </div>
        <h3
          id="modalArticleTitle"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.45rem',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}
        >
          {article.title}
        </h3>
        <p
          id="modalArticleBody"
          className="body-copy"
          style={{ fontSize: '0.9375rem', lineHeight: 1.7 }}
        >
          {article.fullContent}
        </p>
      </div>
    </div>
  );
}
