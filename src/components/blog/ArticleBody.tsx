import React from 'react';
import type { CmsArticleBlock } from '../../lib/cms';

/**
 * Renders the blocks the panel's editor produces.
 *
 * Inline formatting is markdown in the stored text, not HTML, because the
 * editor writes plain text on purpose. Only three marks are supported, and the
 * conversion is done by splitting rather than by injecting HTML, so nothing a
 * writer types can become markup.
 */

const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

const renderInline = (text: string): React.ReactNode[] =>
  text.split(INLINE).filter(Boolean).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.9em] text-slate-800">
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      // Only http(s) and site-relative links are followed; anything else, such
      // as a javascript: URL typed into the editor, renders as plain text.
      const safe = /^(https?:\/\/|\/)/i.test(href);
      return safe ? (
        <a key={i} href={href} className="text-orange-main underline hover:no-underline">
          {label}
        </a>
      ) : (
        <span key={i}>{part}</span>
      );
    }
    return <span key={i}>{part}</span>;
  });

type Props = {
  blocks: CmsArticleBlock[];
  /** Block image paths already localised by the build. */
  images: Record<string, string>;
};

const ArticleBody: React.FC<Props> = ({ blocks, images }) => {
  const out: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];
    const text = block.data.text ?? '';

    // Consecutive list items become one list, which is what the markup needs
    // even though the editor stores them one block at a time.
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      const type = block.type;
      const items: string[] = [];
      while (i < blocks.length && blocks[i].type === type) {
        items.push(blocks[i].data.text ?? '');
        i += 1;
      }
      const List = type === 'numbered_list_item' ? 'ol' : 'ul';
      out.push(
        <List
          key={`list-${i}`}
          className={`my-4 space-y-1.5 pl-6 text-slate-700 ${
            type === 'numbered_list_item' ? 'list-decimal' : 'list-disc'
          }`}
        >
          {items.map((item, n) => (
            <li key={n}>{renderInline(item)}</li>
          ))}
        </List>,
      );
      continue;
    }

    switch (block.type) {
      case 'heading':
        out.push(
          block.data.level === 3 ? (
            <h3 key={i} className="mt-8 mb-2 text-xl font-bold text-slate-900 md:text-2xl">
              {renderInline(text)}
            </h3>
          ) : (
            <h2 key={i} className="mt-10 mb-3 text-2xl font-bold text-slate-900 md:text-3xl">
              {renderInline(text)}
            </h2>
          ),
        );
        break;

      case 'quote':
        out.push(
          <blockquote
            key={i}
            className="my-6 border-l-4 border-orange-main pl-4 text-lg italic text-slate-700"
          >
            {renderInline(text)}
          </blockquote>,
        );
        break;

      case 'callout':
        out.push(
          <div key={i} className="my-6 flex gap-3 rounded-xl bg-orange-50 p-4">
            <span className="text-xl leading-7">{block.data.icon ?? '💡'}</span>
            <p className="text-slate-800">{renderInline(text)}</p>
          </div>,
        );
        break;

      case 'code':
        out.push(
          <pre key={i} className="my-6 overflow-x-auto rounded-xl bg-slate-900 p-4">
            <code className="font-mono text-sm text-slate-100">{text}</code>
          </pre>,
        );
        break;

      case 'divider':
        out.push(<hr key={i} className="my-10 border-slate-200" />);
        break;

      case 'image': {
        const src = images[block.data.url ?? ''] ?? block.data.url;
        if (!src) break;
        out.push(
          <figure key={i} className="my-8">
            <img
              src={src}
              alt={block.data.alt ?? block.data.caption ?? ''}
              loading="lazy"
              className="w-full rounded-xl"
            />
            {block.data.caption && (
              <figcaption className="mt-2 text-center text-sm text-slate-500">
                {block.data.caption}
              </figcaption>
            )}
          </figure>,
        );
        break;
      }

      default:
        if (text.trim()) {
          out.push(
            <p key={i} className="my-4 leading-relaxed text-slate-700">
              {renderInline(text)}
            </p>,
          );
        }
    }

    i += 1;
  }

  return <>{out}</>;
};

export default ArticleBody;
