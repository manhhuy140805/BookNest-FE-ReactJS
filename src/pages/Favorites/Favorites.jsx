import { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Button,
  Spin,
  Empty,
  Alert,
  Space,
  Pagination,
  message,
} from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import Header from "../../components/layout/Header";
import BookCard from "../../components/common/BookCard/BookCard";
import * as favoritesService from "../../services/favorites";
import styles from "./Favorites.module.css";

const { Content } = Layout;

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await favoritesService.getFavorites();
      setFavorites(response.data.favoriteBooks || []);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Không thể tải danh sách yêu thích";
      setError(errorMsg);
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (bookId) => {
    try {
      await favoritesService.removeFavorite(bookId);

      // Update local state
      setFavorites(favorites.filter((book) => book.id !== bookId));
      message.success("Đã xóa sách khỏi danh sách yêu thích");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Không thể xóa sách khỏi danh sách yêu thích";
      setError(errorMsg);
      message.error(errorMsg);
      console.error("Error removing favorite:", err);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(favorites.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayedFavorites = favorites.slice(startIdx, startIdx + itemsPerPage);

  return (
    <Layout className={styles.layout}>
      <Header />
      <Content className={styles.content}>
        <div className={styles.container}>
          {/* Header Section */}
          <div className={styles.headerSection}>
            <h1 className={styles.pageTitle}>
              <HeartFilled className={styles.icon} />
              Sách Yêu Thích
            </h1>
            <p className={styles.subtitle}>
              Bộ sưu tập các cuốn sách mà bạn yêu thích
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert
              message="Lỗi"
              description={error}
              type="error"
              showIcon
              closable
              onClose={() => setError(null)}
              className={styles.errorAlert}
            />
          )}

          {/* Loading State */}
          {loading ? (
            <div className={styles.loadingContainer}>
              <Spin size="large" tip="Đang tải danh sách yêu thích..." />
            </div>
          ) : favorites.length === 0 ? (
            // Empty State
            <div className={styles.emptyContainer}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Danh sách yêu thích của bạn trống"
              >
                <Button
                  type="primary"
                  onClick={() => (window.location.href = "/")}
                >
                  Khám Phá Sách
                </Button>
              </Empty>
            </div>
          ) : (
            // Books Grid
            <>
              <div className={styles.gridContainer}>
                <Row gutter={[16, 24]}>
                  {displayedFavorites.map((book) => (
                    <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
                      <BookCard
                        book={book}
                        onRemoveFavorite={handleRemoveFavorite}
                      />
                    </Col>
                  ))}
                </Row>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={styles.paginationContainer}>
                  <Pagination
                    current={currentPage}
                    total={favorites.length}
                    pageSize={itemsPerPage}
                    onChange={(page) => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    showSizeChanger={false}
                    locale={{
                      items_per_page: "/ trang",
                      jump_to: "Đến trang",
                      jump_to_confirm: "xác nhận",
                      page: "trang",
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </Content>
    </Layout>
  );
}
