import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';

import fs from 'node:fs/promises';
import path from 'node:path';

export const saveFileToUploadDir = async (file) => {
  const oldPath = path.join(TEMP_UPLOAD_DIR, file.filename);
  const newPath = path.join(UPLOAD_DIR, file.filename);
  await fs.rename(oldPath, newPath);

  return file.filename;
};
