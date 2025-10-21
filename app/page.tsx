import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-2xl mx-auto px-8 text-center">
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-slate-900 rounded-2xl">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          Terminology
        </h1>
        <p className="text-xl text-slate-600 mb-12">
          Manage your glossaries and terms in one place
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="text-lg px-8 py-6">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
