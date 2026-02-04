import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings, 
  Store,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TinyVerseLogo from "@/components/TinyVerseLogo";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

const AdminLayout = ({ children, title, subtitle }: AdminLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        className="bg-card border-b border-border px-6 py-4 sticky top-0 z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TinyVerseLogo size="sm" />
            <span className="text-muted-foreground text-sm font-sans">Admin</span>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2 font-sans">
              <Store className="w-4 h-4" />
              View Store
            </Button>
          </Link>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside 
          className="w-64 bg-card border-r border-border min-h-[calc(100vh-65px)] p-4 hidden md:block"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <nav className="space-y-1">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <Link to={item.href}>
                    <Button 
                      variant={isActive ? "secondary" : "ghost"} 
                      className={`w-full justify-start gap-3 font-sans transition-all duration-200 ${
                        isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                      {isActive && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="mb-6">
              <h1 className="text-2xl font-serif font-medium text-foreground">{title}</h1>
              {subtitle && (
                <p className="text-muted-foreground text-sm font-sans mt-1">{subtitle}</p>
              )}
            </div>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;