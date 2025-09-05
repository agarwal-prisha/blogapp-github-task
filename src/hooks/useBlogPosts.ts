import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../types/database';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles!left (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (title: string, content: string, authorId: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert([{ title, content, author_id: authorId }]);

      if (error) throw error;
      await fetchPosts(); // Refresh posts
      return { error: null };
    } catch (error) {
      console.error('Error creating post:', error);
      return { error: 'Failed to create post' };
    }
  };

  const updatePost = async (id: string, title: string, content: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ title, content })
        .eq('id', id);

      if (error) throw error;
      await fetchPosts(); // Refresh posts
      return { error: null };
    } catch (error) {
      console.error('Error updating post:', error);
      return { error: 'Failed to update post' };
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPosts(); // Refresh posts
      return { error: null };
    } catch (error) {
      console.error('Error deleting post:', error);
      return { error: 'Failed to delete post' };
    }
  };

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts,
  };
}