import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, BookOpen } from 'lucide-react';
import { PostCard } from '../components/PostCard';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useAuth } from '../contexts/AuthContext';

export function HomePage() {
  const { posts, loading, deletePost } = useBlogPosts();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to BlogSpace
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A modern platform for sharing ideas, stories, and insights. Join our community of writers and readers.
        </p>
        
        {user ? (
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <PenTool className="h-5 w-5" />
            <span>Write Your First Post</span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <BookOpen className="h-5 w-5" />
            <span>Join the Community</span>
          </Link>
        )}
      </div>

      {/* Posts Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
          {posts.length > 0 && (
            <span className="text-gray-500">{posts.length} post{posts.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-6">Be the first to share your thoughts with the community!</p>
            {user && (
              <Link
                to="/create"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <PenTool className="h-4 w-4" />
                <span>Create First Post</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onDelete={deletePost}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}