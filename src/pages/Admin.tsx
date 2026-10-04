import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import BrandMark from "@/components/BrandMark";
import AdminLogin from "@/components/admin/AdminLogin";
import BookingsBoard from "@/components/admin/BookingsBoard";
import { bookingsRepository } from "@/lib/bookings";

const SESSION_KEY = "remielectric-admin";

const readSession = () => {
  try {
    return sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
};

const Admin = () => {
  const [user, setUser] = useState<string | null>(readSession);

  const login = (email: string) => {
    try {
      sessionStorage.setItem(SESSION_KEY, email);
    } catch {
      // Private mode: stay logged in for this page view only
    }
    setUser(email);
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
    setUser(null);
  };

  return (
    <>
      <SEO title="Admin - REMIELECTRIC" description="Admin panel" noindex={true} />

      {!user ? (
        <AdminLogin isDemo={bookingsRepository.isDemo} onLogin={login} />
      ) : (
        <div className="min-h-screen bg-muted/50">
          <header className="bg-ink text-white">
            <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <BrandMark tone="dark" showTagline={false} />
                <span className="hidden sm:inline rounded-full bg-signal text-ink text-xs font-bold uppercase tracking-wider px-3 py-1">
                  Admin
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden md:inline text-sm text-white/60 mr-2 truncate max-w-56">
                  {user}
                </span>
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to="/">
                    <ExternalLink /> <span className="hidden sm:inline">Sajt</span>
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/10 hover:text-white"
                  onClick={logout}
                >
                  <LogOut /> <span className="hidden sm:inline">Odjavi se</span>
                </Button>
              </div>
            </div>
          </header>

          {bookingsRepository.isDemo && (
            <div className="bg-signal/25 border-b border-signal">
              <p className="container mx-auto px-4 py-2.5 text-sm">
                <strong>Demo režim:</strong> prikazani su primer podaci. Pravi termini će se
                pojaviti kada se forma za zakazivanje poveže sa bazom.
              </p>
            </div>
          )}

          <main className="container mx-auto px-4 py-8 md:py-10">
            <h1 className="font-display font-extrabold uppercase text-4xl md:text-5xl leading-none mb-8">
              Zakazani termini
            </h1>
            <BookingsBoard />
          </main>
        </div>
      )}
    </>
  );
};

export default Admin;
