import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  try {
    // Get the photo ID from the query parameters
    const query = getQuery(event);
    const photoId = query.id;

    if (!photoId) {
      createError({
        statusCode: 400,
        message: 'Photo ID is required',
      });
    }

    // Validate the photoId to prevent directory traversal attacks
    if (typeof photoId !== 'string' || photoId.includes('/') || photoId.includes('\\')) {
      createError({
        statusCode: 400,
        message: 'Invalid photo ID',
      });
    }

    // Construct the file path
    const filename = `${photoId}.jpg`;
    const photosDir = join(process.cwd(), 'src', 'public', 'photos');
    const filePath = join(photosDir, filename);

    // Check if the file exists
    try {
      const stats = await stat(filePath);
      if (!stats.isFile()) {
        createError({
          statusCode: 404,
          message: 'Photo not found',
        });
      }
    } catch (error) {
      createError({
        statusCode: 404,
        message: 'Photo not found',
      });
    }

    // Set the appropriate content type
    setResponseHeader(event, 'Content-Type', 'image/jpeg');
    
    // Stream the file as the response
    return sendStream(event, createReadStream(filePath));
  } catch (error) {
    console.error('Error fetching photo:', error);
    throw error;
  }
});