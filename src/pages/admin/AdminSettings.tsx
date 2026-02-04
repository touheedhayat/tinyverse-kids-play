import { motion } from "framer-motion";
import { Save, Store, Mail, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminSettings = () => {
  return (
    <AdminLayout title="Settings" subtitle="Manage your store configuration">
      <div className="grid gap-6 max-w-2xl">
        {/* Store Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Store className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <CardTitle className="font-serif font-medium">Store Information</CardTitle>
                  <CardDescription className="font-sans">Basic details about your store</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-sans text-sm">Store Name</Label>
                <Input defaultValue="TinyVerse" className="font-sans" />
              </div>
              <div className="space-y-2">
                <Label className="font-sans text-sm">Tagline</Label>
                <Input defaultValue="Premium Kids Fashion" className="font-sans" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <CardTitle className="font-serif font-medium">Contact Details</CardTitle>
                  <CardDescription className="font-sans">How customers can reach you</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-sans text-sm">Phone Number</Label>
                <Input defaultValue="+92 300 1234567" className="font-sans" />
              </div>
              <div className="space-y-2">
                <Label className="font-sans text-sm">WhatsApp Number</Label>
                <Input defaultValue="+92 300 1234567" className="font-sans" />
              </div>
              <div className="space-y-2">
                <Label className="font-sans text-sm">Email Address</Label>
                <Input defaultValue="hello@tinyverse.pk" className="font-sans" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social & Website */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary">
                  <Globe className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <CardTitle className="font-serif font-medium">Online Presence</CardTitle>
                  <CardDescription className="font-sans">Your social media and website links</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-sans text-sm">Website URL</Label>
                <Input defaultValue="https://tinyverse.pk" className="font-sans" />
              </div>
              <div className="space-y-2">
                <Label className="font-sans text-sm">Instagram Handle</Label>
                <Input defaultValue="@tinyverse.pk" className="font-sans" />
              </div>
              <div className="space-y-2">
                <Label className="font-sans text-sm">Facebook Page</Label>
                <Input defaultValue="facebook.com/tinyverse.pk" className="font-sans" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="my-2" />

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button className="gap-2 font-sans">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;