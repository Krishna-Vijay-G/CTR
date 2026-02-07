'use client';

import React from 'react';

interface InstagramPost {
  id: string;
  url: string;
}

interface InstagramFeedProps {
  username?: string;
  limit?: number;
}

export default function InstagramFeed({ username = 'chennaiturboriders', limit = 6 }: InstagramFeedProps) {
  // Real Instagram post IDs for @chennaiturboriders
  const posts: InstagramPost[] = [
    { id: '1', url: 'https://www.instagram.com/p/DLIQW3xzIy4/' },
    { id: '2', url: 'https://www.instagram.com/p/DChLCjUzgQX/' },
    { id: '3', url: 'https://www.instagram.com/p/C_K8pDJTc-Q/' },
    { id: '4', url: 'https://www.instagram.com/p/C_6BJbpz7wx/' },
    { id: '5', url: 'https://www.instagram.com/reel/DAgB2x-tOdA/' },
    { id: '6', url: 'https://www.instagram.com/reel/C_Dc2vKNLSb/' },
    { id: '7', url: 'https://www.instagram.com/p/C8W3fxTyRzj/' },
    { id: '8', url: 'https://www.instagram.com/p/C8VnQxpSEMt/' },
    { id: '9', url: 'https://www.instagram.com/p/C8UzBxvyHkL/' }
  ];

  const displayPosts = posts.slice(0, limit);

  return (
    <div className="insta-feed-wrapper">
      <div className="insta-grid">
        {displayPosts.map((post, idx) => {
          // Extract shortcode from URL
          const shortcode = post.url.split('/p/')[1]?.split('/')[0] || post.url.split('/reel/')[1]?.split('/')[0];
          const embedUrl = `https://www.instagram.com/p/${shortcode}/embed`;

          return (
            <div 
              key={post.id} 
              className={`insta-item item-${idx + 1}`}
            >
              <div className="insta-card">
                <iframe
                  src={embedUrl}
                  className="insta-iframe"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  allow="encrypted-media"
                ></iframe>
                <div className="insta-corner-tag">CTR</div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .insta-feed-wrapper {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .insta-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 450px; /* Increased height for real embeds */
          gap: 20px;
        }

        .insta-item {
          position: relative;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .insta-item:hover {
          transform: scale(1.02);
          z-index: 10;
        }

        /* Custom Staggered Layout */
        .item-1 { grid-column: span 2; grid-row: span 2; } 
        .item-2 { grid-column: span 1; grid-row: span 1; }
        .item-3 { grid-column: span 1; grid-row: span 1; }
        .item-4 { grid-column: span 1; grid-row: span 2; } 
        .item-5 { grid-column: span 1; grid-row: span 1; }
        .item-6 { grid-column: span 2; grid-row: span 1; } 
        .item-7 { grid-column: span 1; grid-row: span 1; }
        .item-8 { grid-column: span 1; grid-row: span 1; }
        .item-9 { grid-column: span 1; grid-row: span 1; }

        .insta-card {
          height: 100%;
          background: #000;
          border: 1px solid #1a1a1a;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        .insta-iframe {
          width: 100%;
          height: 100%;
          border: none;
          background: white;
        }

        .insta-corner-tag {
          position: absolute;
          bottom: -15px;
          right: -15px;
          background: var(--ctr-yellow);
          color: black;
          padding: 20px;
          transform: rotate(-45deg);
          font-weight: 900;
          font-size: 0.6rem;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          padding-left: 8px;
          padding-top: 4px;
          z-index: 15;
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .insta-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 400px;
          }
          .item-1, .item-2, .item-3, .item-4, .item-5, .item-6, .item-7, .item-8, .item-9 {
            grid-column: span 1;
            grid-row: span 1;
          }
          .item-1 { grid-column: span 2; }
        }

        @media (max-width: 600px) {
          .insta-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 500px;
          }
          .item-1 { grid-column: span 1; }
        }
      `}</style>
    </div>
  );
}
