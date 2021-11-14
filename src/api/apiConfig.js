const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '22f04d437e4ae626e8b3b7fd11c90e41',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
