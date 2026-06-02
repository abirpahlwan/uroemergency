import React from 'react'

type LexicalNode = {
  type: string
  version: number
  [key: string]: unknown
}

type TextNode = LexicalNode & {
  text: string
  format: number
}

type ElementNode = LexicalNode & {
  children: LexicalNode[]
  tag?: string
  listType?: 'bullet' | 'number' | 'check'
}

type LinkNode = ElementNode & {
  fields?: { url?: string }
  url?: string
}

const BOLD = 1
const ITALIC = 2
const STRIKETHROUGH = 4
const UNDERLINE = 8
const CODE = 16

function serializeText(node: TextNode): React.ReactNode {
  let el: React.ReactNode = node.text
  if (!el) return null
  if (node.format & CODE) el = <code className="rounded bg-muted px-1 py-0.5 text-xs font-mono">{el}</code>
  if (node.format & BOLD) el = <strong>{el}</strong>
  if (node.format & ITALIC) el = <em>{el}</em>
  if (node.format & UNDERLINE) el = <u>{el}</u>
  if (node.format & STRIKETHROUGH) el = <s>{el}</s>
  return el
}

function serializeNode(node: LexicalNode, index: number): React.ReactNode {
  switch (node.type) {
    case 'text':
      return <React.Fragment key={index}>{serializeText(node as TextNode)}</React.Fragment>
    case 'linebreak':
      return <br key={index} />
    case 'paragraph': {
      const children = (node as ElementNode).children?.map((c, i) => serializeNode(c, i))
      return <p key={index} className="mb-2 last:mb-0 leading-relaxed">{children}</p>
    }
    case 'heading': {
      const el = node as ElementNode
      const tag = (el.tag as string) || 'h2'
      const sizeMap: Record<string, string> = { h1: 'text-xl', h2: 'text-lg', h3: 'text-base' }
      const className = `${sizeMap[tag] ?? 'text-base'} font-semibold mt-4 mb-2`
      return React.createElement(tag, { key: index, className }, el.children?.map((c, i) => serializeNode(c, i)))
    }
    case 'list': {
      const el = node as ElementNode
      const children = el.children?.map((c, i) => serializeNode(c, i))
      return el.listType === 'number'
        ? <ol key={index} className="mb-2 list-decimal pl-5">{children}</ol>
        : <ul key={index} className="mb-2 list-disc pl-5">{children}</ul>
    }
    case 'listitem': {
      const children = (node as ElementNode).children?.map((c, i) => serializeNode(c, i))
      return <li key={index} className="mb-1 leading-relaxed">{children}</li>
    }
    case 'link': {
      const el = node as LinkNode
      const url = el.fields?.url || el.url || '#'
      const children = el.children?.map((c, i) => serializeNode(c, i))
      return <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-80">{children}</a>
    }
    case 'quote': {
      const children = (node as ElementNode).children?.map((c, i) => serializeNode(c, i))
      return <blockquote key={index} className="border-l-2 border-border pl-3 text-muted-foreground">{children}</blockquote>
    }
    default: {
      if ('children' in node) {
        const children = (node as ElementNode).children?.map((c, i) => serializeNode(c, i))
        return <React.Fragment key={index}>{children}</React.Fragment>
      }
      return null
    }
  }
}

type RichTextData = {
  root: ElementNode
  [key: string]: unknown
} | null | undefined

export function RichTextRenderer({ data }: { data: RichTextData }) {
  if (!data?.root?.children) return null
  return (
    <div className="text-sm text-foreground/90">
      {data.root.children.map((node, i) => serializeNode(node, i))}
    </div>
  )
}
