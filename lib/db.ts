import clientPromise from './mongodb';

export async function getDatabase() {
  const client = await clientPromise;
  return client.db('devagency');
}

export const collections = {
  users: 'users',
  projects: 'projects',
  leads: 'leads',
  chatHistory: 'chat_history',
  admins: 'admins',
};
