import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, HeartOutlined, SearchOutlined, UserOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { Badge, Avatar, Dropdown, Drawer } from 'antd';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const getAvatarUrl = () => {
    if (!user) return null;
    return user.avatar || user.avatarUrl || user.profilePicture || user.picture || user.image || null;
  };

  const getUserName = () => {
    if (!user) return '';
    return user.fullName || user.name || user.displayName || user.email || 'User';
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Thông tin cá nhân',
      icon: <UserOutlined />,
      onClick: () => {
        navigate('/profile');
        setMobileMenuOpen(false);
      }
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      onClick: () => {
        logout();
        setMobileMenuOpen(false);
      },
      danger: true
    }
  ];

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <img src="/images/logo-2.png" alt="Boimela" style={styles.logoImg} />

        </Link>

        {/* Desktop Navigation */}
        <nav style={styles.nav} className="header-nav">
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/shop" style={styles.navLink}>Shop</Link>
          <Link to="/pages" style={styles.navLink}>Pages</Link>
          <Link to="/blog" style={styles.navLink}>Blog</Link>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
        </nav>

        {/* Desktop Search & Icons */}
        <div style={styles.rightSection} className="header-right">
          <div style={styles.searchBox} className="header-search">
            <input
              type="text"
              placeholder="Search for Products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            <SearchOutlined style={styles.searchIcon} />
          </div>

          <div style={styles.icons}>
            <Badge count={0}>
              <HeartOutlined style={styles.icon} />
            </Badge>
            <Badge count={0}>
              <ShoppingCartOutlined style={styles.icon} />
            </Badge>
          </div>

          {user ? (
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <div style={styles.userSection}>
                <Avatar 
                  src={getAvatarUrl()} 
                  icon={<UserOutlined />}
                  style={styles.avatar}
                  size={40}
                />
                <span style={styles.userName}>{getUserName()}</span>
              </div>
            </Dropdown>
          ) : (
            <button onClick={handleLoginClick} style={styles.loginButton}>
              <UserOutlined style={styles.loginIcon} />
              Đăng nhập
            </button>
          )}
        </div>

        {/* Mobile Icons & Menu Button */}
        <div style={styles.mobileRight} className="mobile-right">
          <Badge count={0}>
            <HeartOutlined style={styles.icon} />
          </Badge>
          <Badge count={0}>
            <ShoppingCartOutlined style={styles.icon} />
          </Badge>
          <button style={styles.mobileMenuButton} className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
            <MenuOutlined style={styles.menuIcon} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        styles={{ body: { padding: '24px 16px' } }}
      >
        <div style={styles.mobileMenu}>
          {user ? (
            <div style={styles.mobileUserSection}>
              <Avatar 
                src={getAvatarUrl()} 
                icon={<UserOutlined />}
                size={60}
              />
              <span style={styles.mobileUserName}>{getUserName()}</span>
            </div>
          ) : (
            <button onClick={handleLoginClick} style={styles.mobileLoginButton}>
              <UserOutlined style={styles.loginIcon} />
              Đăng nhập
            </button>
          )}

          <div style={styles.mobileSearchBox}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.mobileSearchInput}
            />
            <SearchOutlined style={styles.searchIcon} />
          </div>

          <nav style={styles.mobileNav}>
            <Link to="/" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/shop" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Shop</Link>
            <Link to="/pages" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Pages</Link>
            <Link to="/blog" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link to="/contact" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </nav>

          {user && (
            <div style={styles.mobileUserActions}>
              <button style={styles.mobileActionButton} onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}>
                <UserOutlined /> Thông tin cá nhân
              </button>
              <button style={{...styles.mobileActionButton, color: '#ff4d4f'}} onClick={() => { logout(); setMobileMenuOpen(false); }}>
                <LogoutOutlined /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </Drawer>

      <style>{`
        @media (max-width: 1024px) {
          .header-search {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .header-nav {
            display: none !important;
          }
          .header-right {
            display: none !important;
          }
          .mobile-right {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#fff',
    padding: '16px 0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    color: '#1a1a2e',
    flexShrink: 0
  },
  logoImg: {
    width: '140px',
    height: '40px'
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '700'
  },
  nav: {
    display: 'flex',
    gap: '32px',
    flex: 1
  },
  navLink: {
    color: '#1a1a2e',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'color 0.3s',
    whiteSpace: 'nowrap'
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  searchBox: {
    position: 'relative',
    width: '240px'
  },
  searchInput: {
    width: '100%',
    padding: '10px 40px 10px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none'
  },
  searchIcon: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: '#666',
    cursor: 'pointer'
  },
  icons: {
    display: 'flex',
    gap: '16px'
  },
  icon: {
    fontSize: '22px',
    color: '#1a1a2e',
    cursor: 'pointer'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '6px 12px',
    borderRadius: '8px',
    transition: 'background-color 0.3s'
  },
  avatar: {
    border: '2px solid #ff6b6b',
    cursor: 'pointer'
  },
  userName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1a1a2e',
    maxWidth: '120px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  loginButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap'
  },
  loginIcon: {
    fontSize: '16px'
  },
  mobileRight: {
    display: 'none',
    alignItems: 'center',
    gap: '16px'
  },
  mobileMenuButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer'
  },
  menuIcon: {
    fontSize: '24px',
    color: '#1a1a2e'
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  mobileUserSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '20px 0',
    borderBottom: '1px solid #e0e0e0'
  },
  mobileUserName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a2e'
  },
  mobileLoginButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    width: '100%'
  },
  mobileSearchBox: {
    position: 'relative',
    width: '100%'
  },
  mobileSearchInput: {
    width: '100%',
    padding: '12px 40px 12px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none'
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0'
  },
  mobileNavLink: {
    color: '#1a1a2e',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '16px 0',
    borderBottom: '1px solid #f0f0f0',
    transition: 'color 0.3s'
  },
  mobileUserActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '12px'
  },
  mobileActionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    color: '#1a1a2e',
    transition: 'all 0.3s'
  }
};
