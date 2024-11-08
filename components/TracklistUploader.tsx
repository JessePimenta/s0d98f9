// Update the handleFileUpload function
const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  // ... existing validation code ...

  try {
    const tracks = await processTracklistImage(uploadedFile, artistName);
    if (tracks.length > 0) {
      onTracksExtracted(tracks);
      // Don't store in localStorage here
    }
  } catch (err) {
    console.error('OCR Error:', err);
    setError('Failed to process tracklist image');
  }
};

// Update the handleRemove function
const handleRemove = () => {
  if (file) {
    URL.revokeObjectURL(file.url);
  }
  setFile(null);
  // Clear related storage
  localStorage.removeItem('tracklistImage');
  localStorage.removeItem('trackList');
  onTracksExtracted([]);
};