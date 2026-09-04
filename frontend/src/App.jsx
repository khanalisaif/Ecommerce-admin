import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import WishlistPage from './pages/WishlistPage'
import AccountPage from './pages/AccountPage'
import SearchPage from './pages/SearchPage'
import AddressPage from './pages/AddressPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import CategoryPage from './pages/CategoryPage'
import FaqPage from './pages/FaqPage'
import InfoPage from './pages/InfoPage'
import { ShopProvider, useShop } from './context/ShopContext'
import Toast from './components/Toast'
import AIChatBot from './components/AIChatBot'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute'

function AppContent() {
  const { isChatOpen, setIsChatOpen } = useShop()

  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/info/:slug" element={<InfoPage />} />

        {/* Hidden admin panel — not linked anywhere in the site's navigation */}
        <Route path="/page/admin" element={<AdminLoginPage />} />
        <Route
          path="/page/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
      <AIChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  )
}
