import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostForm } from '../components/PostForm';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../types/database';

export function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updatePost } = useBlogPosts();
  const { user } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const fetchPost = async (postId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          profiles (
            full_name,
            email
          )
        `)
        .eq('id', postId)
        .single();

      if (error) throw error;
      
      // Check if user is the author
      if (user?.id !== data.author_id) {
        navigate('/');
        return;
      }
      
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (title: string, content: string) => {
    if (!post) {
      return { error: 'Post not found' };
    }

    const { error } = await updatePost(post.id, title, content);
    
    if (!error) {
      navigate(`/post/${post.id}`);
    }
    
    return { error };
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-10 bg-gray-200 rounded mb-6"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <PostForm 
      initialTitle={post.title}
      initialContent={post.content}
      onSubmit={handleSubmit}
      isEditing={true}
    />
  );
}