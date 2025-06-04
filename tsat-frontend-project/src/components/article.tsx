'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

const Article = ({ content }: { content: any }) => {
  const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;

  const editor = useEditor({
    extensions: [StarterKit],
    content: parsedContent,
    editable: false,
  });

  if (!editor) return null;

  return (
    <div className="article-container px-6 container mx-auto py-8 content-wrapper">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Article;
