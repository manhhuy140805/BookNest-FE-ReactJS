import { ConfigProvider, App as AntdApp } from "antd";
import AppRoutes from "./routes/AppRouter";
import { AntdThemeConfig } from "./config/antd-theme";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <ConfigProvider theme={AntdThemeConfig}>
      <AntdApp>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
