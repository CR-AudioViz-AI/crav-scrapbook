// app/api/scrapbooks/[id]/route.ts
// Single scrapbook CRUD operations

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch scrapbook with all related data
    const { data: scrapbook, error } = await supabase
      .from('scrapbooks')
      .select(`
        *,
        pages:scrapbook_pages(
          *,
          elements:scrapbook_elements(*)
        ),
        collaborators:scrapbook_collaborators(
          *,
          user:auth.users(email, raw_user_meta_data)
        ),
        comments:scrapbook_comments(
          *,
          user:auth.users(email, raw_user_meta_data)
        )
      `)
      .eq('id', params.id)
      .order('page_order', { foreignTable: 'scrapbook_pages', ascending: true })
      .order('z_index', { foreignTable: 'scrapbook_pages.scrapbook_elements', ascending: true })
      .single();

    if (error) throw error;

    // Check access
    const isOwner = user?.id === scrapbook.user_id;
    const isCollaborator = scrapbook.collaborators?.some((c: any) => c.user_id === user?.id);
    const isPublic = scrapbook.is_public;

    if (!isOwner && !isCollaborator && !isPublic) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Increment view count for non-owners
    if (!isOwner) {
      await supabase.rpc('increment_view_count', { scrapbook_uuid: params.id });
    }

    // Check if user has liked
    let hasLiked = false;
    if (user) {
      const { data: like } = await supabase
        .from('scrapbook_likes')
        .select('id')
        .eq('scrapbook_id', params.id)
        .eq('user_id', user.id)
        .single();
      hasLiked = !!like;
    }

    return NextResponse.json({
      ...scrapbook,
      isOwner,
      isCollaborator,
      hasLiked,
      canEdit: isOwner || scrapbook.collaborators?.some((c: any) => c.user_id === user?.id && c.role === 'editor')
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, isPublic, tags, coverImage } = body;

    const { data: scrapbook, error } = await supabase
      .from('scrapbooks')
      .update({
        title,
        description,
        is_public: isPublic,
        tags,
        cover_image: coverImage,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ scrapbook });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('scrapbooks')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
