import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve the data file path relative to this utils module so it works
// regardless of where the server is started from.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', 'data', 'data.json');

export async function writeData(data) {
  // Atomic-style write: always overwrite the entire file content in one go.
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(DATA_FILE, json, 'utf-8');
}

export async function readData() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If the file does not exist yet, initialize it with an empty array.
      await writeData([]);
      return [];
    }
    throw err;
  }
}

