export const extractImageUrls = (description: string) => {
  const imgRegex = /<img[^>]+src="(https:\/\/cdn-images-1.medium.com\/[^"]+\.png)"[^>]*>/g
  const matches = description?.match(imgRegex)
  const imageUrls: string[] = []

  if (matches) {
    matches.forEach((match) => {
      const urlMatch = match.match(/src="(https:\/\/cdn-images-1.medium.com\/[^"]+\.png)"/)
      if (urlMatch) {
        imageUrls.push(urlMatch[1])
      }
    })
  }

  return imageUrls
}
