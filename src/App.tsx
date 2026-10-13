import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from "react";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { RequireAdmin } from "./components/admin/RequireAdmin";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AuthProvider } from "./context/AuthContext";
import { About } from "./components/sections/About";
import { Experience } from "./components/sections/Experience";
import { Hero } from "./components/sections/Hero";
import { Philosophy } from "./components/sections/Philosophy";
import { SeoLocalStrip } from "./components/sections/SeoLocalStrip";
import { Services } from "./components/sections/Services";
import { Visit } from "./components/sections/Visit";
import { LashLiftPromo } from "./components/sections/LashLiftPromo";
import { PackagesSection } from "./components/packages/PackagesSection";
import { useReveal } from "./hooks/useReveal";
import { TreatmentsPage } from "./pages/TreatmentsPage";
import { BlogListPage } from "./pages/BlogListPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";

const AdminBlogListPage = lazy(() =>
  import("./pages/admin/AdminBlogListPage").then((m) => ({
    default: m.AdminBlogListPage,
  })),
);
const BlogEditorPage = lazy(() =>
  import("./pages/admin/BlogEditorPage").then((m) => ({
    default: m.BlogEditorPage,
  })),
);

function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <LashLiftPromo />
      <PackagesSection />
      <SeoLocalStrip />
      <Philosophy />
      <About />
      <Experience />
      <Visit />
    </main>
  );
}

function Shell() {
  const mainRef = useReveal();

  return (
    <div
      ref={mainRef}
      id="top"
      className="max-w-[100vw] overflow-x-clip bg-surface text-text selection:bg-icicle"
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treatments" element={<TreatmentsPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/blog"
          element={
            <RequireAdmin>
              <AdminLayout>
                <Suspense
                  fallback={
                    <p className="text-[13px] uppercase tracking-[0.18em] text-text-soft">
                      Loading studio…
                    </p>
                  }
                >
                  <AdminBlogListPage />
                </Suspense>
              </AdminLayout>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/blog/new"
          element={
            <RequireAdmin>
              <AdminLayout>
                <Suspense
                  fallback={
                    <p className="text-[13px] uppercase tracking-[0.18em] text-text-soft">
                      Loading editor…
                    </p>
                  }
                >
                  <BlogEditorPage />
                </Suspense>
              </AdminLayout>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/blog/:id/edit"
          element={
            <RequireAdmin>
              <AdminLayout>
                <Suspense
                  fallback={
                    <p className="text-[13px] uppercase tracking-[0.18em] text-text-soft">
                      Loading editor…
                    </p>
                  }
                >
                  <BlogEditorPage />
                </Suspense>
              </AdminLayout>
            </RequireAdmin>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Shell />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}
