import { createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { printFile } from '~/server/utils/cups';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    // Parse multipart form data
    const formData = await readMultipartFormData(event);

    if (!formData || formData.length === 0) {
      return {
        success: false,
        error: 'No file uploaded',
      };
    }

    const photoFile = formData.find(part => part.name === 'photo');

    if (!photoFile || !photoFile.filename) {
      return {
        success: false,
        error: 'No photo found in request',
      };
    }

    // Create photos directory if it doesn't exist
    const photosDir = join(process.cwd(), 'src', 'public', 'photos');
    await mkdir(photosDir, { recursive: true });

    // Save the file
    const filePath = join(photosDir, photoFile.filename);

    // Ensure directory exists
    await mkdir(dirname(filePath), { recursive: true });

    // Write the file
    const writeStream = createWriteStream(filePath);
    writeStream.write(photoFile.data);
    await new Promise((resolve) => {
      writeStream.end(resolve);
    });

    // Print the photo using cups api
    await printFile(filePath)

    // Return success with the URL to access the photo
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error saving photo:', error);
    return {
      success: false,
      error: 'Failed to save photo',
    };
  }
});