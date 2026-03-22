import { ArrowRightOutlined } from '@ant-design/icons';
import Button from '../../../components/common/Button';

export default function HeroSection() {
  return (
    <section style={styles.hero} className="hero-section">
      <div style={styles.container} className="hero-container">
        <div style={styles.content} className="hero-content">
          {/* Badge */}
          <div style={styles.badge} className="hero-badge">
            <span style={styles.badgeText}>Editor Choice Best Books</span>
            <span style={styles.badgeDiscount}>Up To 50% Off</span>
          </div>

          {/* Main Heading */}
          <h1 style={styles.heading} className="hero-heading">
            Your Next Favorite Book<br />
            Is Just A <span style={styles.highlight}>Click Away</span>
          </h1>

          {/* Description */}
          <p style={styles.description} className="hero-description">
            Sed ac arcu sed felis vulputate molestie. Nullam at urna in velit finibus vestibulum euismod A
            Urna. Sed quia aliquam leo. Duis iaculis lorem mauris, et convallis du
          </p>

          {/* Buttons */}
          <div style={styles.buttons} className="hero-buttons">
            <Button 
              text="Shop Now" 
              variant="primary"
              icon={<ArrowRightOutlined />}
            />
            <Button 
              text="View All Books" 
              variant="secondary"
              icon={<ArrowRightOutlined />}
            />
          </div>
        </div>

        {/* Hero Image */}
        <div style={styles.imageSection} className="hero-image-section">
          <img 
            src="/images/hero-girl-1.png" 
            alt="Reading Girl" 
            style={styles.heroImage}
          />
          <img 
            src="/images/book-2.png" 
            alt="Book" 
            style={styles.floatingBook}
            className="hero-floating-book"
          />
          <img 
            src="/images/book-shape.png" 
            alt="Book" 
            style={styles.floatingBookBottom}
            className="hero-floating-book-bottom"
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div style={styles.decorativeShape}></div>

      {/* Responsive CSS */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .hero-badge {
          animation: fadeInRight 0.8s ease-out;
        }

        .hero-heading {
          animation: fadeInRight 0.8s ease-out 0.2s backwards;
        }

        .hero-description {
          animation: fadeInRight 0.8s ease-out 0.4s backwards;
        }

        .hero-buttons {
          animation: fadeInUp 0.8s ease-out 0.6s backwards;
        }

        .hero-image-section {
          animation: fadeInLeft 1s ease-out 0.3s backwards;
        }

        .hero-floating-book {
          animation: float 3s ease-in-out infinite, scaleIn 0.8s ease-out 0.8s backwards;
        }

        .hero-floating-book-bottom {
          animation: float 3s ease-in-out infinite 1.5s, scaleIn 0.8s ease-out 1s backwards;
        }

        @media (max-width: 1024px) {
          .hero-container {
            flex-direction: column;
            gap: 40px !important;
            paddingTop: 60px!important;
          }
          .hero-content {
            max-width: 100% !important;
            text-align: center;
          }
          .hero-heading {
            font-size: 42px !important;
          }
          .hero-buttons {
            justify-content: center;
          }
          .hero-image-section {
            max-width: 500px;
          }
        }
        @media (max-width: 768px) {
          .hero-section {
            min-height: auto !important;
            paddingTop: 40px !important;
          }
          .hero-heading {
            font-size: 32px !important;
          }
          .hero-description {
            font-size: 14px !important;
          }
          .hero-floating-book {
            width: 100px !important;
          }
          .hero-floating-book-bottom {
            width: 120px !important;
          }
        }
        @media (max-width: 480px) {
          .hero-heading {
            font-size: 28px !important;
          }
          .hero-badge {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 50%, #c94b4b 100%)',
    minHeight: '600px',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '80px'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '60px',
    position: 'relative',
    zIndex: 2
  },
  content: {
    flex: 1,
    maxWidth: '550px'
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },
  badgeText: {
    color: '#ff6b6b',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '0.5px'
  },
  badgeDiscount: {
    backgroundColor: '#fff',
    color: '#1a1a2e',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '700'
  },
  heading: {
    fontSize: '56px',
    fontWeight: '700',
    color: '#fff',
    lineHeight: '1.2',
    marginBottom: '24px'
  },
  highlight: {
    color: '#ff6b6b'
  },
  description: {
    color: '#e0e0e0',
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '32px'
  },
  buttons: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    position: 'relative',
    zIndex: 10
  },
  imageSection: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px'
  },
  heroImage: {
    maxWidth: '100%',
    height: 'auto',
    position: 'relative',
    zIndex: 2
  },
  floatingBook: {
    position: 'absolute',
    top: '10%',
    right: '10%',
    width: '150px',
    height: 'auto',
    animation: 'float 3s ease-in-out infinite'
  },
  floatingBookBottom: {
    position: 'absolute',
    bottom: '-5%',
    left: '-105%',
    width: '500px',
    height: 'auto',
    animation: 'float 3s ease-in-out infinite',
    animationDelay: '1.5s',
    transform: 'rotate(-15deg)',
    zIndex: 0
  },
  decorativeShape: {
    position: 'absolute',
    bottom: '-50px',
    left: '-100px',
    width: '400px',
    height: '400px',
    background: 'rgba(255, 107, 107, 0.1)',
    borderRadius: '50%',
    filter: 'blur(80px)'
  }
};
