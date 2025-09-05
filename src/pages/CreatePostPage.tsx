import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PostForm } from '../components/PostForm';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useAuth } from '../contexts/AuthContext';

export function CreatePostPage() {
  const navigate = useNavigate();
  const { createPost } = useBlogPosts();
  const { user } = useAuth();

  const handleSubmit = async (title: string, content: string) => {
    if (!user) {
      return { error: 'You must be logged in to create a post' };
    }

    const { error } = await createPost(title, content, user.id);
    
    if (!error) {
      navigate('/');
    }
    
    return { error };
  };

  return (
    <PostForm 
      onSubmit={handleSubmit}
      isEditing={false}
    />
  );
}