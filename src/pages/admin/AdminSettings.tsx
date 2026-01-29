import { Link } from "react-router-dom";
import { Package, ShoppingCart, TrendingUp, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminSettings = () => (
  <div className="min-h-screen bg-muted/30">
    <header className="bg-card border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-fredoka font-bold">TinyVerse Admin</h1>
        <Link to="/"><Button variant="outline">View Store</Button></Link>
      </div>
    </header>

    <div className="flex">
      <aside className="w-64 bg-card border-r min-h-[calc(100vh-73px)] p-4">
        <nav className="space-y-2">
          {[
            { href: "/admin", label: "Dashboard", icon: TrendingUp },
            { href: "/admin/products", label: "Products", icon: Package },
            { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
            { href: "/admin/settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <Link key={item.href} to={item.href}>
              <Button variant={item.href === "/admin/settings" ? "secondary" : "ghost"} className="w-full justify-start gap-2">
                <item.icon className="w-4 h-4" />{item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-6">Store Settings</h2>
        <Card>
          <CardHeader><CardTitle>Store Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Store Name</Label><Input defaultValue="TinyVerse" /></div>
            <div><Label>Phone Number</Label><Input defaultValue="+92 300 1234567" /></div>
            <div><Label>WhatsApp Number</Label><Input defaultValue="+92 300 1234567" /></div>
            <div><Label>Email</Label><Input defaultValue="hello@tinyverse.pk" /></div>
            <Button>Save Settings</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  </div>
);

export default AdminSettings;
