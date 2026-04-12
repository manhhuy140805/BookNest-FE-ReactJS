import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../../../components/common/bookCard/BookCard";
import { getBooks } from "../../../services/book.js";
import { getFavorites } from "../../../services/favorites.js";
import styles from "./FeaturedBooks.module.css";

export default function FeaturedBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  // Fetch books and favorites
  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        setLoading(true);
        const booksData = await getBooks({ limit: 10 });
        setBooks(booksData.items || []);

        try {
          const favoritesData = await getFavorites();
          const ids =
            (Array.isArray(favoritesData)
              ? favoritesData
              : favoritesData?.data || []) || [];
          const favoriteIdsList = ids.map((fav) => fav.id || fav.bookId);
          setFavoriteIds(favoriteIdsList);
        } catch (err) {
          console.log("Could not fetch favorites:", err);
        }
      } catch (error) {
        console.error("Error fetching featured books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  // Auto-scroll carousel smoothly every 4 seconds
  useEffect(() => {
    if (books.length === 0 || !carouselRef.current) return;

    let currentIndex = 0;

    const interval = setInterval(() => {
      if (!carouselRef.current || carouselRef.current.children.length === 0)
        return;

      // Get the exact width of one slide plus gap
      const firstChild = carouselRef.current.children[0];
      if (!firstChild) return;

      const slideWidth = firstChild.offsetWidth;
      const gap = 20; // From CSS gap: 20px
      const scrollStep = slideWidth + gap;

      // Calculate how many items are visible
      const containerWidth = carouselRef.current.offsetWidth;
      const visibleCount = Math.floor(containerWidth / scrollStep);

      // Max allowed index
      const maxIndex = Math.max(0, books.length - visibleCount);

      currentIndex++;

      if (currentIndex > maxIndex) {
        // Reset to start if reached end
        currentIndex = 0;
        carouselRef.current.scrollLeft = 0;
      } else {
        const scrollAmount = currentIndex * scrollStep;
        carouselRef.current.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [books.length]);

  const handleExploreMore = () => {
    navigate("/books");
  };

  if (loading) {
    return <div className={styles.loading}>Loading featured books...</div>;
  }

  if (books.length === 0) {
    return <div className={styles.loading}>No books available</div>;
  }

  return (
    <section className={styles.featuredSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Books</h2>
          <button className={styles.exploreBtn} onClick={handleExploreMore}>
            Explore More <span className={styles.arrow}>→</span>
          </button>
        </div>

        {/* Carousel Container */}
        <div className={styles.carousel} ref={carouselRef}>
          {books.map((book) => (
            <div key={book.id} className={styles.bookSlide}>
              <BookCard book={book} favoriteIds={favoriteIds} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
