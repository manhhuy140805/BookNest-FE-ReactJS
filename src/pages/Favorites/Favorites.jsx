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
} from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import Header from "../../components/layout/Header";
import FavoriteCard from "./components/FavoriteCard";
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
      // TODO: Replace with actual API call
      // const response = await api.get('/user/favoriteBooks');
      // setFavorites(response.data);

      // Mock data for now
      setFavorites([]);
    } catch (err) {
      setError(err.message || "Không thể tải danh sách yêu thích");
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (bookId) => {
    try {
      // TODO: Replace with actual API call
      // await api.delete(`/user/favorite/remove/${bookId}`);

      // Update local state
      setFavorites(favorites.filter((book) => book.id !== bookId));
    } catch (err) {
      setError("Không thể xóa sách khỏi danh sách yêu thích");
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
                      <FavoriteCard
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
