import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';
import { createWriteStream } from 'fs';
import { MultiPartData } from 'h3';

export async function writeFile(photoFile: MultiPartData) {
  const photosDir = await getOrCreatePhotosDir();

  // Save the file
  const filePath = join(photosDir, photoFile.filename!);

  // Ensure directory exists
  await mkdir(dirname(filePath), { recursive: true });

  // Write the file
  const writeStream = createWriteStream(filePath);
  writeStream.write(photoFile.data);
  await new Promise((resolve) => {
    writeStream.end(resolve);
  });
}

async function getOrCreatePhotosDir() {
  const photosDir = join(process.cwd(), 'src', 'public', 'photos');
  await mkdir(photosDir, { recursive: true });
  return photosDir;
}
