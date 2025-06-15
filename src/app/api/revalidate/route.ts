import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  const path = request.nextUrl.searchParams.get('path');

  if (!tag && !path) {
    return new Response(
      JSON.stringify({ error: 'Missing tag or path parameter' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  if (tag) {
    revalidateTag(tag);
  }
  if (path) {
    revalidatePath(path);
  }

  return new Response(
    JSON.stringify({
      message: `Revalidated for${tag ? ' tag: ' + tag : ''}${path ? ' path: ' + path : ''} performed successfully`,
      revalidated: true,
      now: Date.now(),
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
}
