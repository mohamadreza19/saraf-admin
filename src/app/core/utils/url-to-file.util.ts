export async function urlToFile(url: string): Promise<File> {
  // Fetch the file content from the URL
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch the file');
  }

  // Get the file's MIME type from the Content-Type header
  const mimeType = response.headers.get('Content-Type') || 'application/octet-stream';

  // Get the file content as a Blob
  const blob = await response.blob();

  // Try to extract the file name from the URL (the last part of the URL)
  const fileNameFromUrl = getFileNameFromUrl(url);

  // Create a File object from the Blob with the MIME type
  const file = new File([blob], fileNameFromUrl, { type: mimeType });

  return file;
}

// Helper function to extract the file name from a URL
function getFileNameFromUrl(url: string): string {
  const urlParts = url.split('/');
  let fileName = urlParts[urlParts.length - 1];

  // If there's a query string or fragment, remove it
  const queryIndex = fileName.indexOf('?');
  if (queryIndex !== -1) {
    fileName = fileName.substring(0, queryIndex);
  }

  // If no file name can be extracted from the URL, fallback to a default name
  if (!fileName) {
    fileName = 'downloaded-file';
  }

  return fileName;
}
