import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.code !== 0) {
      return NextResponse.json({ error: data.msg || 'Failed to fetch video' }, { status: 400 });
    }

    return NextResponse.json(data.data);
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
