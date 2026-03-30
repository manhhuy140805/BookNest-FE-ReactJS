import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CheckOutlined,
  HeartFilled,
  MinusOutlined,
  PlusOutlined,
  StarFilled,
} from "@ant-design/icons";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer/Footer";
import { getBookById } from "../../services/book";
import "./BookDetail.css";

const FALLBACK_IMAGE = "https://via.placeholder.com/400x560?text=Book";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [activeThumb, setActiveThumb] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookById(id);
        const payload = response?.data?.data || response?.data || null;
        setBook(payload);
      } catch (err) {
        setError("Failed to fetch book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const detail = useMemo(() => {
    if (!book) return null;

    const title = book.title || "Castle The Sky";
    const description =
      book.description ||
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar, tortor quis varius pretium est felis scelerisque nulla.";

    const price = Number(book.price || 0);
    const oldPrice = Number(book.originalPrice || price + 14);
    const rating = Math.min(
      5,
      Math.max(0, Math.round(Number(book.rating || 4))),
    );
    const reviews = Number(book.reviewCount || 1);

    const image =
      book.coverImage ||
      book.image ||
      book.imageUrl ||
      book.thumbnail ||
      FALLBACK_IMAGE;

    return {
      title,
      description,
      price,
      oldPrice,
      rating,
      reviews,
      author: book.author || "Admin",
      image,
      category: book.category?.name || book.categoryName || "Kids Toys",
      stock: Number(book.stock || 1) > 0 ? "In Stock" : "Out Of Stock",
      sku: book.sku || `BOOK-${id}`,
      pages: book.totalPages || 330,
      year: book.publishedYear || 2021,
      format: book.format || "Hardcover",
      language: book.language || "English",
    };
  }, [book, id]);

  const gallery = useMemo(() => {
    const source = detail?.image || FALLBACK_IMAGE;
    return [source, source, source, source, source];
  }, [detail]);

  if (loading) {
    return (
      <div className="book-detail-page">
        <Header />
        <div className="book-detail-state">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="book-detail-page">
        <Header />
        <div className="book-detail-state">{error || "Book not found."}</div>
        <Footer />
      </div>
    );
  }

  const renderTabContent = () => {
    if (activeTab === "additional") {
      return (
        <div className="book-detail-tab-grid">
          <p>
            <strong>Author:</strong> {detail.author}
          </p>
          <p>
            <strong>Category:</strong> {detail.category}
          </p>
          <p>
            <strong>Pages:</strong> {detail.pages}
          </p>
          <p>
            <strong>Language:</strong> {detail.language}
          </p>
        </div>
      );
    }

    if (activeTab === "reviews") {
      return (
        <p className="book-detail-tab-text">
          Đánh giá trung bình {detail.rating}/5 từ {detail.reviews} lượt đánh
          giá.
        </p>
      );
    }

    return <p className="book-detail-tab-text">{detail.description}</p>;
  };

  const relatedProducts = Array.from({ length: 5 }).map((_, index) => ({
    id: `${id}-${index}`,
    title: detail.title,
    price: detail.price,
    oldPrice: detail.oldPrice,
    image: detail.image,
  }));

  return (
    <div className="book-detail-page">
      <Header />

      <section className="book-detail-hero">
        <h1>Shop Details</h1>
        <p>Home / Shop Details</p>
      </section>

      <main className="book-detail-container">
        <section className="book-detail-main">
          <div className="book-detail-gallery">
            <div className="book-detail-main-image">
              <img src={gallery[activeThumb]} alt={detail.title} />
            </div>

            <div className="book-detail-thumbs">
              {gallery.map((image, index) => (
                <button
                  key={`thumb-${index}`}
                  type="button"
                  className={activeThumb === index ? "active" : ""}
                  onClick={() => setActiveThumb(index)}
                >
                  <img src={image} alt={`${detail.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="book-detail-info">
            <div className="book-detail-title-row">
              <h2>{detail.title}</h2>
              <span>Stock Availability: {detail.stock}.</span>
            </div>

            <div className="book-detail-rating-row">
              <div className="book-detail-stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarFilled
                    key={`star-${index}`}
                    className={index < detail.rating ? "active" : ""}
                  />
                ))}
              </div>
              <small>({detail.reviews} customer reviews)</small>
            </div>

            <p className="book-detail-description">{detail.description}</p>

            <div className="book-detail-price-row">
              <span className="book-detail-price">
                ${detail.price.toFixed(2)}
              </span>
              {detail.oldPrice > detail.price && (
                <span className="book-detail-old-price">
                  ${detail.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="book-detail-action-row">
              <div className="book-detail-qty">
                <button
                  type="button"
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                >
                  <MinusOutlined />
                </button>
                <span>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((prev) => prev + 1)}
                >
                  <PlusOutlined />
                </button>
              </div>

              <button type="button" className="book-detail-read-btn">
                Read A Little
              </button>
              <button type="button" className="book-detail-add-btn">
                Add To Cart
              </button>
              <button
                type="button"
                className="book-detail-icon-btn"
                aria-label="Favorite"
              >
                <HeartFilled />
              </button>
            </div>

            <div className="book-detail-meta">
              <p>
                <strong>SKU:</strong> {detail.sku}
              </p>
              <p>
                <strong>Tags:</strong> Design Low Book
              </p>
              <p>
                <strong>Total page:</strong> {detail.pages}
              </p>
              <p>
                <strong>Publish Year:</strong> {detail.year}
              </p>
              <p>
                <strong>Category:</strong> {detail.category}
              </p>
              <p>
                <strong>Format:</strong> {detail.format}
              </p>
              <p>
                <strong>Language:</strong> {detail.language}
              </p>
              <p>
                <strong>Century:</strong> United States
              </p>
            </div>

            <div className="book-detail-features">
              <p>
                <CheckOutlined /> Free shipping orders from $150
              </p>
              <p>
                <CheckOutlined /> 30 days exchange & return
              </p>
              <p>
                <CheckOutlined /> Money Flash Discount: Starting at 30% Off
              </p>
              <p>
                <CheckOutlined /> Safe & Secure online shopping
              </p>
            </div>
          </div>
        </section>

        <section className="book-detail-tabs">
          <div className="book-detail-tab-header">
            <button
              type="button"
              className={activeTab === "description" ? "active" : ""}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              type="button"
              className={activeTab === "additional" ? "active" : ""}
              onClick={() => setActiveTab("additional")}
            >
              Additional Information
            </button>
            <button
              type="button"
              className={activeTab === "reviews" ? "active" : ""}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews ({detail.reviews})
            </button>
          </div>
          <div className="book-detail-tab-body">{renderTabContent()}</div>
        </section>

        <section className="book-detail-related">
          <h3>Related Products</h3>
          <p>Donec at nulla nulla. Duis posuere mi lacus.</p>

          <div className="book-detail-related-grid">
            {relatedProducts.map((item) => (
              <article key={item.id}>
                <div className="book-detail-related-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <h4>{item.title}</h4>
                <p className="price-row">
                  <span>${item.price.toFixed(2)}</span>
                  <del>${item.oldPrice.toFixed(2)}</del>
                </p>
                <button type="button">Add To Cart</button>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BookDetail;
