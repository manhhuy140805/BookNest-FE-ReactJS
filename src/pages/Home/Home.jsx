import { useAuth } from "../../hooks/useAuth";

export default function Home() {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the BookNest E-Book Platform!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
