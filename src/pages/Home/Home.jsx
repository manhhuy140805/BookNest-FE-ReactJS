import { useState, useEffect } from "react";
import Header from "../../components/layout/Header";
import HeroSection from "./components/HeroSection";
import SessionExpiredModal from "../../components/common/SessionExpiredModal";
import { isTokenExpired } from "../../utils/tokenUtils";

export default function Home() {
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user");

    // Only check expiry when user data exists (was previously logged in)
    if (token && savedUser && isTokenExpired(token)) {
      setShowExpiredModal(true);
    }
  }, []);

  return (
    <div>
      <Header />
      <HeroSection />

      {showExpiredModal && (
        <SessionExpiredModal onClose={() => setShowExpiredModal(false)} />
      )}
    </div>
  );
}
