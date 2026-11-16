import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return</span>
      </button>
    </div>
  );
};

export default BackButton;
