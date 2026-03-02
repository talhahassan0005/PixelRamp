import fs from 'fs';
import path from 'path';

export function loadKnowledgeBase(): string {
  const knowledgeBasePath = path.join(process.cwd(), 'public', 'knowledge-base', 'company-info.md');
  
  try {
    const content = fs.readFileSync(knowledgeBasePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Failed to load knowledge base:', error);
    return '';
  }
}
