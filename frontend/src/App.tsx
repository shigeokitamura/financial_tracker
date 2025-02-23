import { AuthProvider } from "./providers/auth"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./utils/ThemeContext";
import VitePage from "./pages/VitePage"
import TestPage from "./pages/TestPage"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import TransactionsPage from "./pages/TransactionsPage";

import "./css/style.css";
import "./charts/ChartjsConfig";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <div>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ThemeProvider>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/debug" element={<TestPage />} />
                <Route path="/vite" element={<VitePage />} />
              </Routes>
              </ThemeProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </div>
  )
}

export default App;
