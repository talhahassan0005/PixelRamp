const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

function readEnvVar(name) {
  try {
    const content = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
    const re = new RegExp('^' + name + '=(.*)$', 'm');
    const m = content.match(re);
    if (!m) return null;
    let v = m[1].trim();
    if ((v.startsWith("\"") && v.endsWith("\"")) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    return v;
  } catch (e) {
    return null;
  }
}

(async () => {
  const uri = readEnvVar('MONGODB_URI');
  if (!uri) {
    console.error('MONGODB_URI not found in .env.local');
    process.exit(2);
  }

  console.log('Testing MongoDB connection to:', uri.replace(/(mongodb\+srv:\/\/[^:]+:)[^@]+@/, '$1***@'));

  const client = new MongoClient(uri);
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Connected — OK');
    await client.close();
    process.exit(0);
  } catch (err) {
    console.error('Connection error:', err && err.message ? err.message : err);
    if (err && err.stack) console.error(err.stack);
    process.exit(1);
  }
})();