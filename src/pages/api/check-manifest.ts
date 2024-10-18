import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const manifestPath = path.join(process.cwd(), 'public', 'tonconnect-manifest.json');
  
  if (fs.existsSync(manifestPath)) {
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    res.status(200).json({ exists: true, content: JSON.parse(manifestContent) });
  } else {
    res.status(404).json({ exists: false, error: 'Manifest file not found' });
  }
}
