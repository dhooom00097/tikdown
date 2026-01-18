import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Add random parameter to bypass any potential caching on external API side
    const cacheBuster = Math.random().toString(36).substring(7);
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1&_=${cacheBuster}`;

    console.log(`Fetching: ${apiUrl}`); // Debug log

    const response = await fetch(apiUrl, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const data = await response.json();

    if (data.code !== 0) {
      console.error('TikWM Error:', data);
      return NextResponse.json({ error: data.msg || 'Failed to fetch video' }, { status: 400 });
    }

    return NextResponse.json(data.data);
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
