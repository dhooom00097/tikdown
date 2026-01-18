'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { VideoCard } from '@/components/video-card';
import { Search, Sparkles } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      // Add timestamp to prevent browser caching of the POST request
      const res = await fetch(`/api/download?t=${Date.now()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to fetch');
      }

      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4 md:p-24 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="z-10 w-full max-w-2xl flex flex-col items-center gap-8 text-center">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 backdrop-blur-md">
            <Sparkles size={14} />
            <span>تحميل بدون حقوق وبجودة عالية</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            تحميل <span className="gradient-text">تيك توك</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            قم بلصق رابط فيديو تيك توك في الأسفل لتحميله بجودة عالية وبدون علامة مائية. سريع، مجاني، وبتصميم رائع.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full relative flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search size={18} />
            </div>
            <Input
              placeholder="الصق رابط تيك توك هنا..."
              className="pr-10 pl-4 h-14 bg-white/5 border-white/10 text-lg rounded-xl focus-visible:ring-purple-500 text-right"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
            />
          </div>
          <Button
            size="lg"
            className="h-14 px-8 rounded-xl font-bold text-md"
            variant="premium"
            onClick={handleFetch}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                جاري التحميل...
              </div>
            ) : (
              "تحميل"
            )}
          </Button>
        </motion.div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-400 bg-red-950/30 px-4 py-2 rounded-lg border border-red-900/50"
            >
              {error}
            </motion.div>
          )}

          {data && (
            <motion.div
              key={data?.id || "result"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex justify-center mt-8"
            >
              <VideoCard data={data} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      <footer className="absolute bottom-4 text-white/50 text-sm font-medium">
        <p dir="rtl">
          صنع بكل <span className="text-red-500">❤️</span> بواسطة عبدالرحمن
        </p>
      </footer>
    </main>
  );
}
