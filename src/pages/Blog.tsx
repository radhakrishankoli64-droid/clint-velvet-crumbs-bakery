import React from 'react';
import { MOCK_BLOGS } from '../data/mockData';
import { Clock, User } from 'lucide-react';

export const Blog: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[#D4AF37] font-semibold uppercase tracking-widest text-xs">
          The Baking Atelier Journal
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-[#F3E5AB]">
          Pastry Insights & Recipes
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_BLOGS.map(blog => (
          <article
            key={blog.id}
            className="rounded-3xl bg-white dark:bg-[#201815] border border-[#D4AF37]/20 overflow-hidden shadow-md space-y-4 p-6"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full aspect-16/9 object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="flex items-center gap-4 text-xs text-stone-400">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                {blog.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                {blog.readTime}
              </span>
            </div>
            <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-[#F3E5AB]">
              {blog.title}
            </h2>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {blog.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};
