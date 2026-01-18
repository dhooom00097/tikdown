import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const filename = searchParams.get('filename') || 'video.mp4';

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        // Fetch the actual video file
        // cache: 'no-store' ensures we don't use internal fetch cache
        const response = await fetch(url, { cache: 'no-store' });

        if (!response.ok) throw new Error('Failed to fetch video');

        const headers = new Headers(response.headers);
        headers.set('Content-Disposition', `attachment; filename="${filename}"`);
        headers.set('Content-Type', response.headers.get('Content-Type') || 'video/mp4');

        // Aggressive caching prevention for the browser/CDN
        headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
        headers.set('Pragma', 'no-cache');
        headers.set('Expires', '0');

        return new NextResponse(response.body, {
            status: 200,
            headers: headers,
        });
    } catch (error) {
        console.error('Proxy download failed:', error);
        return NextResponse.json({ error: 'Failed to download video' }, { status: 500 });
    }
}
