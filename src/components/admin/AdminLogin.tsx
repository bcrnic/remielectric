import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BrandMark from "@/components/BrandMark";

interface AdminLoginProps {
  isDemo: boolean;
  onLogin: (email: string) => void;
}

const AdminLogin = ({ isDemo, onLogin }: AdminLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo mode: no real auth yet, any credentials open the panel.
    // Replace with supabase.auth.signInWithPassword once Supabase is connected.
    onLogin(email);
  };

  return (
    <div className="min-h-screen bg-ink-deep flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <BrandMark badgeOnly badgeClassName="h-36 md:h-40" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-xl p-8 shadow-xl space-y-5"
          aria-labelledby="admin-login-title"
        >
          <div>
            <h1 id="admin-login-title" className="font-display font-extrabold uppercase text-4xl">
              Admin prijava
            </h1>
            <p className="text-muted-foreground mt-1">Pregled i upravljanje zakazanim terminima.</p>
          </div>

          {isDemo && (
            <p className="rounded-lg bg-signal/20 border border-signal px-4 py-3 text-sm">
              Demo režim: prijava još nije povezana. Unesite bilo koji email i lozinku da vidite
              panel sa primer podacima.
            </p>
          )}

          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="daniel@remielectric.rs"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Lozinka</Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" variant="electric" className="w-full h-12">
            Prijavi se
          </Button>
        </form>
        <p className="text-center mt-6">
          <Link to="/" className="text-white/60 hover:text-signal text-sm transition-colors">
            ← Nazad na sajt
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
