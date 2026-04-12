import { useState, useEffect } from "react";
import { BookOutlined } from "@ant-design/icons";
import { getCategories, getBooks } from "../../../services/book.js";
import styles from "./TopCategories.module.css";

export default function TopCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getCategories();
        const categoriesData = Array.isArray(response)
          ? response
          : response?.data || [];

        // Get only first 6 categories
        const topCategories = categoriesData.slice(0, 6);

        // Fetch book count and a sample book for each category
        const categoriesWithCounts = await Promise.all(
          topCategories.map(async (category) => {
            try {
              const booksData = await getBooks({
                categoryId: category.id,
                limit: 1,
              });
              const totalCount = booksData.pagination?.total || 0;
              const sampleBook = booksData.items?.[0];
              const bookCoverUrl =
                sampleBook?.coverUrl ||
                sampleBook?.imageUrl ||
                sampleBook?.cover ||
                sampleBook?.image;

              return {
                ...category,
                bookCount: totalCount,
                bookCoverUrl: bookCoverUrl,
              };
            } catch (error) {
              console.error(
                `Failed to fetch book count for category ${category.id}:`,
                error,
              );
              return {
                ...category,
                bookCount: 0,
                bookCoverUrl: null,
              };
            }
          }),
        );

        setCategories(categoriesWithCounts);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading categories...</div>;
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className={styles.categoriesSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <BookOutlined className={styles.icon} />
            <h2 className={styles.title}>Top Categories Book</h2>
          </div>
        </div>

        {/* Categories Grid */}
        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <div key={category.id} className={styles.categoryCard}>
              {/* Category Image */}
              <div className={styles.imageContainer}>
                {category.bookCoverUrl ? (
                  <img
                    src={category.bookCoverUrl}
                    alt={category.name}
                    className={styles.image}
                  />
                ) : category.image || category.imageUrl || category.coverUrl ? (
                  <img
                    src={
                      category.image || category.imageUrl || category.coverUrl
                    }
                    alt={category.name}
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.placeholderImage}>
                    <BookOutlined />
                  </div>
                )}
              </div>

              {/* Book Count Badge */}
              <div className={styles.badge}>{category.bookCount} Books</div>

              {/* Category Info */}
              <div className={styles.info}>
                <h3 className={styles.categoryName}>{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
