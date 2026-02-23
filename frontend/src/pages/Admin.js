import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { LogOut, Plus, Pencil, Trash2, Users, FolderKanban, FileText, Image, MapPin, Briefcase, Megaphone, Mail, Settings as SettingsIcon, ArrowLeft, Newspaper, UserCircle, Upload, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LOGO_URL = "https://customer-assets.emergentagent.com/job_bha-collective/artifacts/0ijxjfll_image.png";

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/admin/login`, { email, password });
      localStorage.setItem("admin_token", res.data.token);
      onLogin(res.data.token);
      toast.success("Logged in successfully");
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border border-slate-200 shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="h-16 w-16 mx-auto rounded-full bg-[#0F172A] overflow-hidden flex items-center justify-center">
              <img src={LOGO_URL} alt="Texas BHA" className="object-contain mix-blend-screen" style={{ width: '280%', height: '280%', marginTop: '15%' }} />
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A] mt-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Admin Panel</h1>
            <p className="text-slate-500 text-sm mt-1">Sign in to manage Texas BHA content</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4" data-testid="admin-login-form">
            <div>
              <Label className="text-sm font-medium text-slate-700">Email</Label>
              <Input data-testid="admin-email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@texasbha.org" className="mt-1.5 bg-slate-50" required />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Password</Label>
              <Input data-testid="admin-password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" className="mt-1.5 bg-slate-50" required />
            </div>
            <Button data-testid="admin-login-btn" type="submit" disabled={loading} className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full font-semibold">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="text-xs text-slate-400 mt-4 text-center">
            Default: admin@texasbha.org / TexasBHA2024!
          </p>
          <Link to="/" className="block text-center mt-4">
            <Button variant="ghost" size="sm" className="text-slate-500 text-xs">
              <ArrowLeft className="mr-1 h-3 w-3" /> Back to Website
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

// Image Upload Component
function ImageUploadField({ value, onChange, label }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || "");
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreview(value || "");
  }, [value]);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp', 'image/heic', 'image/heif'];
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|heic|heif)$/i)) {
      toast.error("Please select a valid image file (JPG, PNG, GIF, WebP, SVG, etc.)");
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      const fullUrl = `${API.replace('/api', '')}${res.data.url}`;
      setPreview(fullUrl);
      onChange(fullUrl);
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.detail || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <Label className="text-sm font-medium text-slate-700">{label}</Label>
      <div className="mt-1.5">
        {preview ? (
          <div className="relative inline-block">
            <img 
              src={preview} 
              alt="Preview" 
              className="h-32 w-32 object-cover rounded-lg border border-slate-200"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/128?text=Image";
              }}
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div 
            onClick={() => !uploading && fileInputRef.current?.click()}
            className={`w-full h-32 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-all ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {uploading ? (
              <>
                <Loader2 className="h-8 w-8 text-slate-400 animate-spin" />
                <span className="text-sm text-slate-500">Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8 text-slate-400" />
                <span className="text-sm text-slate-500">Click to upload image</span>
                <span className="text-xs text-slate-400">JPG, PNG, GIF, WebP, SVG (max 10MB)</span>
              </>
            )}
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.heic,.heif"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}

function CrudSection({ title, resource, fields, token, icon: Icon }) {
  const [items, setItems] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});
  const headers = { Authorization: `Bearer ${token}` };

  const fetchItems = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/${resource}`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [resource]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openNew = () => {
    setEditing(null);
    const defaults = {};
    fields.forEach(f => { defaults[f.key] = f.defaultValue || ""; });
    setFormData(defaults);
    setDialogOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    const data = {};
    fields.forEach(f => {
      data[f.key] = Array.isArray(item[f.key]) ? item[f.key].join(", ") : (item[f.key] || "");
    });
    setFormData(data);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      const payload = {};
      fields.forEach(f => {
        if (f.type === "array") {
          payload[f.key] = formData[f.key] ? formData[f.key].split(",").map(s => s.trim()).filter(Boolean) : [];
        } else if (f.type === "number") {
          payload[f.key] = Number(formData[f.key]) || 0;
        } else if (f.type === "boolean") {
          payload[f.key] = formData[f.key] === "true" || formData[f.key] === true;
        } else {
          payload[f.key] = formData[f.key] || "";
        }
      });

      if (editing) {
        await axios.put(`${API}/admin/${resource}/${editing.id}`, payload, { headers });
        toast.success(`${title} updated`);
      } else {
        await axios.post(`${API}/admin/${resource}`, payload, { headers });
        toast.success(`${title} created`);
      }
      setDialogOpen(false);
      fetchItems();
    } catch (err) {
      toast.error("Operation failed");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${API}/admin/${resource}/${id}`, { headers });
      toast.success("Deleted successfully");
      fetchItems();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-[#0F172A]" />
          <h2 className="text-xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{title}s</h2>
          <Badge variant="secondary" className="text-xs">{items.length}</Badge>
        </div>
        <Button data-testid={`add-${resource}-btn`} onClick={openNew} size="sm" className="bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full text-xs font-semibold">
          <Plus className="h-3.5 w-3.5 mr-1" /> Add New
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={item.id || idx} data-testid={`${resource}-item-${idx}`} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-sm transition-shadow">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#0F172A] text-sm truncate">{item.name || item.title}</p>
              <p className="text-slate-400 text-xs truncate mt-0.5">{item.description || item.summary || item.content || ""}</p>
            </div>
            <div className="flex items-center gap-2 ml-4 shrink-0">
              <Button data-testid={`edit-${resource}-${idx}`} variant="ghost" size="icon" onClick={() => openEdit(item)} className="h-8 w-8">
                <Pencil className="h-3.5 w-3.5 text-slate-500" />
              </Button>
              <Button data-testid={`delete-${resource}-${idx}`} variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="h-8 w-8">
                <Trash2 className="h-3.5 w-3.5 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-slate-400 text-sm text-center py-8">No items yet. Click "Add New" to create one.</p>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Manrope, sans-serif' }}>{editing ? `Edit ${title}` : `New ${title}`}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {fields.map(f => (
              <div key={f.key}>
                {f.type === "image" ? (
                  <ImageUploadField
                    label={f.label}
                    value={formData[f.key] || ""}
                    onChange={(url) => setFormData({ ...formData, [f.key]: url })}
                  />
                ) : f.type === "textarea" ? (
                  <>
                    <Label className="text-sm font-medium text-slate-700">{f.label}</Label>
                    <Textarea
                      data-testid={`form-${f.key}`}
                      value={formData[f.key] || ""}
                      onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                      className="mt-1.5 bg-slate-50"
                      rows={3}
                    />
                  </>
                ) : f.type === "select" ? (
                  <>
                    <Label className="text-sm font-medium text-slate-700">{f.label}</Label>
                    <Select value={formData[f.key] || ""} onValueChange={v => setFormData({ ...formData, [f.key]: v })}>
                      <SelectTrigger className="mt-1.5 bg-slate-50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {f.options?.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </>
                ) : (
                  <>
                    <Label className="text-sm font-medium text-slate-700">{f.label}</Label>
                    <Input
                      data-testid={`form-${f.key}`}
                      type={f.type === "number" ? "number" : "text"}
                      value={formData[f.key] || ""}
                      onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                      className="mt-1.5 bg-slate-50"
                      placeholder={f.placeholder || ""}
                    />
                  </>
                )}
                {f.hint && <p className="text-xs text-slate-400 mt-1">{f.hint}</p>}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="rounded-full text-sm">Cancel</Button>
            <Button data-testid="form-save-btn" onClick={handleSave} className="bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full text-sm font-semibold">
              {editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ContactsView({ token }) {
  const [contacts, setContacts] = useState([]);
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get(`${API}/admin/contacts`, { headers }).then(r => setContacts(r.data)).catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this submission?")) return;
    try {
      await axios.delete(`${API}/admin/contacts/${id}`, { headers });
      setContacts(contacts.filter(c => c.id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Mail className="h-5 w-5 text-[#0F172A]" />
        <h2 className="text-xl font-bold text-[#0F172A]" style={{ fontFamily: 'Manrope, sans-serif' }}>Contact Submissions</h2>
        <Badge variant="secondary" className="text-xs">{contacts.length}</Badge>
      </div>
      <div className="space-y-3">
        {contacts.map((c, idx) => (
          <div key={c.id || idx} data-testid={`contact-item-${idx}`} className="p-4 bg-white border border-slate-100 rounded-xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-[#0F172A] text-sm">{c.name}</p>
                  <Badge variant="outline" className="text-xs">{c.inquiry_type}</Badge>
                </div>
                <p className="text-slate-400 text-xs mt-0.5">{c.email} {c.subject && `- ${c.subject}`}</p>
                <p className="text-slate-600 text-sm mt-2">{c.message}</p>
                <p className="text-slate-300 text-xs mt-2">{new Date(c.created_at).toLocaleString()}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)} className="h-8 w-8 shrink-0">
                <Trash2 className="h-3.5 w-3.5 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
        {contacts.length === 0 && <p className="text-slate-400 text-sm text-center py-8">No contact submissions yet.</p>}
      </div>
    </div>
  );
}

// Field definitions for each resource
const committeeFields = [
  { key: "name", label: "Name", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "mission", label: "Mission", type: "textarea" },
  { key: "leadership", label: "Leadership", type: "array", hint: "Comma-separated names" },
  { key: "photo_url", label: "Photo", type: "image" },
  { key: "order", label: "Display Order", type: "number", defaultValue: "0" },
];

const projectFields = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "image_url", label: "Project Image", type: "image" },
  { key: "status", label: "Status", type: "select", options: ["ongoing", "completed"] },
  { key: "outcome", label: "Outcome/Impact", type: "textarea" },
  { key: "tags", label: "Tags", type: "array", hint: "Comma-separated tags" },
];

const policyFields = [
  { key: "title", label: "Title", type: "text" },
  { key: "summary", label: "Summary", type: "textarea" },
  { key: "status", label: "Status", type: "select", options: ["Active Research", "Data Collection", "Policy Brief Published", "In Progress"] },
  { key: "category", label: "Category", type: "text" },
  { key: "tags", label: "Tags", type: "array", hint: "Comma-separated" },
];

const galleryFields = [
  { key: "title", label: "Title", type: "text" },
  { key: "image_url", label: "Image", type: "image" },
  { key: "category", label: "Category", type: "select", options: ["Events", "Meetings", "Socials", "Conferences"] },
  { key: "date", label: "Date", type: "text", placeholder: "YYYY-MM-DD" },
];

const chapterFields = [
  { key: "name", label: "Chapter Name", type: "text" },
  { key: "university", label: "University", type: "text" },
  { key: "location", label: "Location", type: "text" },
  { key: "founding_date", label: "Founding Date", type: "text", placeholder: "YYYY-MM-DD" },
  { key: "leadership", label: "Leadership", type: "array", hint: "Comma-separated" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "signup_link", label: "Sign-up Link", type: "text" },
];

const opportunityFields = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "type", label: "Type", type: "select", options: ["philanthropy", "internship", "volunteer", "sponsorship", "competition", "professional_development", "general"] },
  { key: "cta_text", label: "CTA Button Text", type: "text", defaultValue: "Learn More" },
  { key: "cta_link", label: "CTA Link", type: "text" },
];

const announcementFields = [
  { key: "title", label: "Title", type: "text" },
  { key: "content", label: "Content", type: "textarea" },
  { key: "active", label: "Active", type: "select", options: ["true", "false"] },
];

const consultingFields = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "icon", label: "Icon", type: "select", options: ["target", "settings", "bar-chart", "shield", "cpu", "search"] },
];

const newsletterFields = [
  { key: "title", label: "Title", type: "text" },
  { key: "date", label: "Date", type: "text", placeholder: "YYYY-MM-DD" },
  { key: "preview", label: "Preview Text", type: "textarea" },
  { key: "link", label: "Link/Download URL", type: "text" },
];

const teamFields = [
  { key: "name", label: "Name", type: "text" },
  { key: "role", label: "Role/Title", type: "text" },
  { key: "category", label: "Category", type: "select", options: ["Executive Board", "Committee Leads"] },
  { key: "bio", label: "Bio", type: "textarea" },
  { key: "photo_url", label: "Photo", type: "image" },
  { key: "order", label: "Display Order", type: "number", defaultValue: "0" },
];

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("admin_token"));

  useEffect(() => {
    if (token) {
      axios.get(`${API}/admin/verify`, { headers: { Authorization: `Bearer ${token}` } })
        .catch(() => {
          localStorage.removeItem("admin_token");
          setToken(null);
        });
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    toast.success("Logged out");
  };

  if (!token) return <AdminLogin onLogin={setToken} />;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#0F172A] overflow-hidden flex items-center justify-center">
              <img src={LOGO_URL} alt="Texas BHA" className="object-contain mix-blend-screen" style={{ width: '280%', height: '280%', marginTop: '15%' }} />
            </div>
            <span className="font-bold text-[#0F172A] text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Texas BHA <span className="text-slate-400 font-normal">Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" data-testid="admin-back-to-site">
              <Button variant="ghost" size="sm" className="text-slate-500 text-xs">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Site
              </Button>
            </Link>
            <Button data-testid="admin-logout-btn" variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:text-red-600 text-xs">
              <LogOut className="h-3.5 w-3.5 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="admin-dashboard">
        <h1 className="text-2xl font-bold text-[#0F172A] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Content Management</h1>
        <Tabs defaultValue="committees" className="w-full">
          <TabsList className="flex flex-wrap gap-1 bg-white border border-slate-200 p-1 rounded-xl mb-8 h-auto">
            <TabsTrigger value="committees" data-testid="tab-committees" className="text-xs rounded-lg"><Users className="h-3.5 w-3.5 mr-1" />Committees</TabsTrigger>
            <TabsTrigger value="projects" data-testid="tab-projects" className="text-xs rounded-lg"><FolderKanban className="h-3.5 w-3.5 mr-1" />Projects</TabsTrigger>
            <TabsTrigger value="policies" data-testid="tab-policies" className="text-xs rounded-lg"><FileText className="h-3.5 w-3.5 mr-1" />Policies</TabsTrigger>
            <TabsTrigger value="gallery" data-testid="tab-gallery" className="text-xs rounded-lg"><Image className="h-3.5 w-3.5 mr-1" />Gallery</TabsTrigger>
            <TabsTrigger value="chapters" data-testid="tab-chapters" className="text-xs rounded-lg"><MapPin className="h-3.5 w-3.5 mr-1" />Chapters</TabsTrigger>
            <TabsTrigger value="opportunities" data-testid="tab-opportunities" className="text-xs rounded-lg"><Briefcase className="h-3.5 w-3.5 mr-1" />Opportunities</TabsTrigger>
            <TabsTrigger value="announcements" data-testid="tab-announcements" className="text-xs rounded-lg"><Megaphone className="h-3.5 w-3.5 mr-1" />Announcements</TabsTrigger>
            <TabsTrigger value="consulting" data-testid="tab-consulting" className="text-xs rounded-lg"><SettingsIcon className="h-3.5 w-3.5 mr-1" />Services</TabsTrigger>
            <TabsTrigger value="newsletters" data-testid="tab-newsletters" className="text-xs rounded-lg"><Newspaper className="h-3.5 w-3.5 mr-1" />Newsletters</TabsTrigger>
            <TabsTrigger value="team" data-testid="tab-team" className="text-xs rounded-lg"><UserCircle className="h-3.5 w-3.5 mr-1" />Team</TabsTrigger>
            <TabsTrigger value="contacts" data-testid="tab-contacts" className="text-xs rounded-lg"><Mail className="h-3.5 w-3.5 mr-1" />Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="committees"><CrudSection title="Committee" resource="committees" fields={committeeFields} token={token} icon={Users} /></TabsContent>
          <TabsContent value="projects"><CrudSection title="Project" resource="projects" fields={projectFields} token={token} icon={FolderKanban} /></TabsContent>
          <TabsContent value="policies"><CrudSection title="Policy" resource="policies" fields={policyFields} token={token} icon={FileText} /></TabsContent>
          <TabsContent value="gallery"><CrudSection title="Gallery Item" resource="gallery" fields={galleryFields} token={token} icon={Image} /></TabsContent>
          <TabsContent value="chapters"><CrudSection title="Chapter" resource="chapters" fields={chapterFields} token={token} icon={MapPin} /></TabsContent>
          <TabsContent value="opportunities"><CrudSection title="Opportunity" resource="opportunities" fields={opportunityFields} token={token} icon={Briefcase} /></TabsContent>
          <TabsContent value="announcements"><CrudSection title="Announcement" resource="announcements" fields={announcementFields} token={token} icon={Megaphone} /></TabsContent>
          <TabsContent value="consulting"><CrudSection title="Consulting Service" resource="consulting-services" fields={consultingFields} token={token} icon={SettingsIcon} /></TabsContent>
          <TabsContent value="newsletters"><CrudSection title="Newsletter" resource="newsletters" fields={newsletterFields} token={token} icon={Newspaper} /></TabsContent>
          <TabsContent value="team"><CrudSection title="Team Member" resource="team" fields={teamFields} token={token} icon={UserCircle} /></TabsContent>
          <TabsContent value="contacts"><ContactsView token={token} /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
