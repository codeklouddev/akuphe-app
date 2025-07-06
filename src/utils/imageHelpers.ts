export function convertGoogleDriveUrl(url: string): string {
  // Check if it's a Google Drive URL
  if (!url.includes('drive.google.com')) {
    return url
  }

  // Extract the file ID from various Google Drive URL formats
  let fileId: string | null = null

  // Format: https://drive.google.com/file/d/{fileId}/view?usp=sharing
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileMatch) {
    fileId = fileMatch[1]
  }

  // Format: https://drive.google.com/open?id={fileId}
  const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (openMatch) {
    fileId = openMatch[1]
  }

  // Format: https://drive.google.com/uc?id={fileId}
  const ucMatch = url.match(/\/uc\?.*id=([a-zA-Z0-9_-]+)/)
  if (ucMatch) {
    fileId = ucMatch[1]
  }

  // If we found a file ID, return the direct image URL
  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`
  }

  // If no file ID found, return original URL
  return url
}

export function isValidImageUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}