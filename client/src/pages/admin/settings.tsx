import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, User, Bell, Shield, Database, Mail, Globe, Save, Key, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/layout/admin-layout";
import { ProtectedAdminRoute } from "@/components/admin/protected-route";
import { useAdminAuth } from "@/hooks/use-admin-auth";

export default function AdminSettings() {
  const { toast } = useToast();
  const { adminUser } = useAdminAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  // Form states
  const [profileData, setProfileData] = useState({
    username: adminUser?.username || "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [siteSettings, setSiteSettings] = useState({
    siteName: "Prime Trans Group",
    siteDescription: "Canada's workforce solutions provider",
    contactEmail: "jobs@primetransgroup.ca",
    contactPhone: "249-444-0004",
    address: "7050 Bramalea Rd Unit 14A, Mississauga, ON L5S 1T1",
    businessHours: "Mon-Fri 9am-5pm, Sat & Sun CLOSED",
  });

  const [notifications, setNotifications] = useState({
    emailNewApplications: true,
    emailNewJobPosts: true,
    emailBlogComments: false,
    emailWeeklySummary: true,
    pushNotifications: true,
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    jobAutoApproval: false,
    applicationDeadline: "30",
    maxFileSize: "5",
    allowedFileTypes: "pdf,doc,docx",
  });

  const handleProfileSave = () => {
    // Validate passwords match if changing password
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirmation don't match.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Profile updated",
      description: "Your profile settings have been saved successfully.",
    });
  };

  const handleSiteSettingsSave = () => {
    toast({
      title: "Site settings updated",
      description: "Website settings have been saved successfully.",
    });
  };

  const handleNotificationsSave = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved.",
    });
  };

  const handleSystemSettingsSave = () => {
    toast({
      title: "System settings updated",
      description: "System configuration has been saved successfully.",
    });
  };

  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-2">Manage your admin preferences and site configuration.</p>
          </div>

          {/* Settings Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" data-testid="tab-profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="site" data-testid="tab-site">
                <Globe className="h-4 w-4 mr-2" />
                Site Settings
              </TabsTrigger>
              <TabsTrigger value="notifications" data-testid="tab-notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="system" data-testid="tab-system">
                <Database className="h-4 w-4 mr-2" />
                System
              </TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Admin Profile
                  </CardTitle>
                  <CardDescription>Manage your admin account details and security.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={profileData.username}
                        onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                        data-testid="input-username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="admin@primetransgroup.ca"
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPassword ? "text" : "password"}
                            value={profileData.currentPassword}
                            onChange={(e) => setProfileData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            data-testid="input-current-password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          value={profileData.newPassword}
                          onChange={(e) => setProfileData(prev => ({ ...prev, newPassword: e.target.value }))}
                          data-testid="input-new-password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={profileData.confirmPassword}
                          onChange={(e) => setProfileData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          data-testid="input-confirm-password"
                        />
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleProfileSave} data-testid="button-save-profile">
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Site Settings */}
            <TabsContent value="site" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Website Configuration
                  </CardTitle>
                  <CardDescription>Configure your website's basic information and contact details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        value={siteSettings.siteName}
                        onChange={(e) => setSiteSettings(prev => ({ ...prev, siteName: e.target.value }))}
                        data-testid="input-site-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteDescription">Site Description</Label>
                      <Textarea
                        id="siteDescription"
                        value={siteSettings.siteDescription}
                        onChange={(e) => setSiteSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                        rows={3}
                        data-testid="textarea-site-description"
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={siteSettings.contactEmail}
                          onChange={(e) => setSiteSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                          data-testid="input-contact-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Contact Phone</Label>
                        <Input
                          id="contactPhone"
                          value={siteSettings.contactPhone}
                          onChange={(e) => setSiteSettings(prev => ({ ...prev, contactPhone: e.target.value }))}
                          data-testid="input-contact-phone"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Business Address</Label>
                      <Input
                        id="address"
                        value={siteSettings.address}
                        onChange={(e) => setSiteSettings(prev => ({ ...prev, address: e.target.value }))}
                        data-testid="input-address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessHours">Business Hours</Label>
                      <Input
                        id="businessHours"
                        value={siteSettings.businessHours}
                        onChange={(e) => setSiteSettings(prev => ({ ...prev, businessHours: e.target.value }))}
                        data-testid="input-business-hours"
                      />
                    </div>
                  </div>

                  <Button onClick={handleSiteSettingsSave} data-testid="button-save-site-settings">
                    <Save className="h-4 w-4 mr-2" />
                    Save Site Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Configure how and when you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="emailNewApplications">New Job Applications</Label>
                        <p className="text-sm text-muted-foreground">Get notified when someone applies for a job</p>
                      </div>
                      <Switch
                        id="emailNewApplications"
                        checked={notifications.emailNewApplications}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailNewApplications: checked }))}
                        data-testid="switch-email-applications"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="emailNewJobPosts">New Job Posts</Label>
                        <p className="text-sm text-muted-foreground">Get notified when new jobs are posted</p>
                      </div>
                      <Switch
                        id="emailNewJobPosts"
                        checked={notifications.emailNewJobPosts}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailNewJobPosts: checked }))}
                        data-testid="switch-email-jobs"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="emailBlogComments">Blog Comments</Label>
                        <p className="text-sm text-muted-foreground">Get notified about blog post comments</p>
                      </div>
                      <Switch
                        id="emailBlogComments"
                        checked={notifications.emailBlogComments}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailBlogComments: checked }))}
                        data-testid="switch-email-comments"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="emailWeeklySummary">Weekly Summary</Label>
                        <p className="text-sm text-muted-foreground">Receive weekly activity summary</p>
                      </div>
                      <Switch
                        id="emailWeeklySummary"
                        checked={notifications.emailWeeklySummary}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailWeeklySummary: checked }))}
                        data-testid="switch-email-summary"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="pushNotifications">Browser Notifications</Label>
                        <p className="text-sm text-muted-foreground">Show notifications in your browser</p>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, pushNotifications: checked }))}
                        data-testid="switch-push-notifications"
                      />
                    </div>
                  </div>

                  <Button onClick={handleNotificationsSave} data-testid="button-save-notifications">
                    <Save className="h-4 w-4 mr-2" />
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Settings */}
            <TabsContent value="system" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    System Configuration
                  </CardTitle>
                  <CardDescription>Advanced system settings and configurations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">Put the website in maintenance mode</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          id="maintenanceMode"
                          checked={systemSettings.maintenanceMode}
                          onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                          data-testid="switch-maintenance-mode"
                        />
                        {systemSettings.maintenanceMode && (
                          <Badge variant="destructive">ACTIVE</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="jobAutoApproval">Auto-approve Job Posts</Label>
                        <p className="text-sm text-muted-foreground">Automatically approve new job postings</p>
                      </div>
                      <Switch
                        id="jobAutoApproval"
                        checked={systemSettings.jobAutoApproval}
                        onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, jobAutoApproval: checked }))}
                        data-testid="switch-auto-approval"
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="applicationDeadline">Application Deadline (days)</Label>
                        <Select
                          value={systemSettings.applicationDeadline}
                          onValueChange={(value) => setSystemSettings(prev => ({ ...prev, applicationDeadline: value }))}
                        >
                          <SelectTrigger data-testid="select-application-deadline">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                        <Select
                          value={systemSettings.maxFileSize}
                          onValueChange={(value) => setSystemSettings(prev => ({ ...prev, maxFileSize: value }))}
                        >
                          <SelectTrigger data-testid="select-max-file-size">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2 MB</SelectItem>
                            <SelectItem value="5">5 MB</SelectItem>
                            <SelectItem value="10">10 MB</SelectItem>
                            <SelectItem value="20">20 MB</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allowedFileTypes">Allowed File Types</Label>
                      <Input
                        id="allowedFileTypes"
                        value={systemSettings.allowedFileTypes}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, allowedFileTypes: e.target.value }))}
                        placeholder="pdf,doc,docx"
                        data-testid="input-allowed-file-types"
                      />
                      <p className="text-xs text-muted-foreground">Comma-separated list of allowed file extensions</p>
                    </div>
                  </div>

                  <Button onClick={handleSystemSettingsSave} data-testid="button-save-system-settings">
                    <Save className="h-4 w-4 mr-2" />
                    Save System Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
}