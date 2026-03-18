import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CollectionsPage from "./pages/CollectionsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AIAdvisorPage from "./pages/AIAdvisorPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [viewedProduct, setViewedProduct] = useState(null);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const handleViewProduct = (product) => {
    setViewedProduct(product);
    setPage("product");
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const renderPage = () => {
    switch (page) {
      case "home":        return <HomePage setPage={setPage} onAddToCart={handleAddToCart} onViewProduct={handleViewProduct} />;
      case "collections": return <CollectionsPage onAddToCart={handleAddToCart} onViewProduct={handleViewProduct} />;
      case "product":     return <ProductDetailPage product={viewedProduct} onAddToCart={handleAddToCart} setPage={setPage} />;
      case "ai":          return <AIAdvisorPage />;
      case "cart":        return <CartPage cart={cart} onRemove={handleRemoveFromCart} />;
      case "about":       return <AboutPage />;
      case "contact":     return <ContactPage />;
      default:            return <HomePage setPage={setPage} onAddToCart={handleAddToCart} onViewProduct={handleViewProduct} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Navbar page={page} setPage={setPage} cartCount={cartCount} />
      <main className="flex-1">{renderPage()}</main>
      <Footer setPage={setPage} />
    </div>
  );
}