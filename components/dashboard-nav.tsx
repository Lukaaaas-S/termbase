import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function DashboardNav() {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
            <BookOpen className="w-6 h-6" />
            <span>Terminology</span>
          </Link>

          <div className="flex items-center gap-8">
            <button className="text-slate-600 hover:text-slate-900 transition-colors">
              Glossaries
            </button>
            <button className="text-slate-600 hover:text-slate-900 transition-colors">
              Terms
            </button>
            <button className="text-slate-600 hover:text-slate-900 transition-colors">
              Export
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
