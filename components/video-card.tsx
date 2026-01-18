'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Music, Video, User } from 'lucide-react';
import { Button } from './ui/button';

interface VideoData {
    id: string;
    title: string;
    cover: string;
    play: string;     // No watermark video
    music: string;    // Audio
    author: {
        nickname: string;
        avatar: string;
    };
}

interface VideoCardProps {
    data: VideoData;
}

export function VideoCard({ data }: VideoCardProps) {
    const handleDownload = (url: string, filename: string) => {
        // Use the proxy route to force download with headers
        const downloadUrl = `/api/proxy-download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;

        // Create a temporary link and click it
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = filename; // Backup for browsers that respect this anchor attribute
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-card border border-white/10 rounded-xl overflow-hidden shadow-2xl"
        >
            <div className="relative aspect-[9/16] w-full bg-black/50">
                <img
                    src={data.cover}
                    alt={data.title}
                    className="w-full h-full object-contain"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center gap-3">
                        <img src={data.author.avatar} alt={data.author.nickname} className="w-10 h-10 rounded-full border-2 border-primary" />
                        <span className="font-semibold text-white">{data.author.nickname}</span>
                    </div>
                    <p className="text-sm text-gray-200 mt-2 line-clamp-2">{data.title}</p>
                </div>
            </div>

            <div className="p-6 space-y-4 bg-zinc-900/50 backdrop-blur-sm">
                <Button
                    className="w-full gap-2"
                    variant="premium"
                    onClick={() => handleDownload(data.play, `tiktok-${data.id}.mp4`)}
                >
                    <Video size={18} />
                    تحميل بدون علامة مائية
                </Button>
                <Button
                    className="w-full gap-2"
                    variant="secondary"
                    onClick={() => handleDownload(data.music, `tiktok-audio-${data.id}.mp3`)}
                >
                    <Music size={18} />
                    تحميل الصوت (MP3)
                </Button>
            </div>
        </motion.div>
    );
}
