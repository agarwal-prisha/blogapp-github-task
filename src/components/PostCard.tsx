import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Edit, Trash2 } from 'lucide-react';
import type { BlogPost } from '../types/database';
import { useAuth } from '../contexts/AuthContext';

interface PostCardProps {
  post: BlogPost;
  onDelete: (id: string) => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  const { user } = useAuth();
  const isAuthor = user?.id === post.author_id;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getSnippet = (content: string, maxLength = 150) => {
    const plainText = content.replace(/[#*`]/g, '').trim();
    return plainText.length > maxLength 
      ? plainText.substring(0, maxLength) + '...' 
      : plainText;
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      onDelete(post.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <Link to={`/post/${post.id}`} className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
              {post.title}
            </h2>
          </Link>
          
          {isAuthor && (
            <div className="flex space-x-2 ml-4">
              <Link
                to={`/edit/${post.id}`}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                title="Edit post"
              >
                <Edit className="h-4 w-4" />
              </Link>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Delete post"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        
        <Link to={`/post/${post.id}`}>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {getSnippet(post.content)}
          </p>
        </Link>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{post.profiles?.full_name || post.profiles?.email || 'Unknown Author'}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.created_at)}</span>
            </div>
          </div>
          
          <Link
            to={`/post/${post.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
}