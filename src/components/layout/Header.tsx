import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky text-surface top-0 z-50 w-full border-b border-border/50 bg-header/50 backdrop-blur-xl supports-backdrop-filter:bg-header">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link
          to="/"
          className="flex items-center gap-3 group transition-all duration-300"
          title="Eye Test Validator And Converter To ContactLens"
        >
          <div className="relative size-10 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all shadow-sm">
            <img
              src="/logo.png"
              alt="OSM Logo"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight bg-linear-to-r from-surface to-indigo-500 bg-clip-text text-transparent">
              OSM Beta
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:block">
              Eye Test Validator
            </span>
          </div>
        </Link>

        {/* Title / Tagline (Responsive) */}
        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          <span className="text-xs font-medium text-secondary-foreground/80">
            Validator & Converter
          </span>
        </div>
      </div>
    </header>
  );
}
