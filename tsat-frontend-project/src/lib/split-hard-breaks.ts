import { JSONContent } from "@tiptap/react";

function splitHardBreaksToParagraphs(doc: JSONContent): JSONContent {
  if (doc.type !== "doc" || !doc.content) return doc;

  const newContent: JSONContent[] = [];

  doc.content.forEach((node) => {
    if (node.type === "paragraph" && node.content) {
      let buffer: JSONContent[] = [];

      node.content.forEach((child) => {
        if (child.type === "hardBreak") {
          if (buffer.length) {
            newContent.push({
              type: "paragraph",
              attrs: node.attrs || {},
              content: [...buffer],
            });
            buffer = [];
          }
        } else {
          buffer.push(child);
        }
      });

      if (buffer.length) {
        newContent.push({
          type: "paragraph",
          attrs: node.attrs || {},
          content: [...buffer],
        });
      }
    } else {
      newContent.push(node); // ไม่ใช่ paragraph → ไม่แตะ
    }
  });

  return {
    ...doc,
    content: newContent,
  };
}

export default splitHardBreaksToParagraphs;
