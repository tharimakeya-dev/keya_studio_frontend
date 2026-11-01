/**
 * Uploads an image file to ImgBB and returns the hosted image URL
 * @param {File} file 
 * @returns {Promise<string>} Hosted image URL
 */
export async function uploadImageToImgBB(file) {
  if (!file) {
    throw new Error('No image file selected.');
  }

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || '4f4dad1c8edf0e218d86fe3b0bc6655e';
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data?.error?.message || 'Failed to upload image to ImgBB.');
  }

  return data.data.url || data.data.display_url;
}

export default uploadImageToImgBB;
