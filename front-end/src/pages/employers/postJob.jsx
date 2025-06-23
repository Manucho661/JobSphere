import React from 'react';
import PostJobForm from '../components/employers/PostJobForm';

const PostJob = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
      <PostJobForm />
    </div>
  );
};

export default PostJob;
