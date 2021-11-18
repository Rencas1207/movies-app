import axiosClient from './axiosClient';

export const category = {
  movie: 'movie',
  tv: 'tv',
};

export const movieType = {
  upcoming: 'upcoming', // Proximo: https://api.themoviedb.org/3/movie/upcoming?api_key=22f04d437e4ae626e8b3b7fd11c90e41
  popular: 'popular', // Popular: https://api.themoviedb.org/3/movie/popular?api_key=22f04d437e4ae626e8b3b7fd11c90e41
  top_rated: 'top_rated', // Más valorados: https://api.themoviedb.org/3/movie/top_rated?api_key=22f04d437e4ae626e8b3b7fd11c90e41
};

export const tvType = {
  popular: 'popular', // Proximo: https://api.themoviedb.org/3/tv/popular?api_key=22f04d437e4ae626e8b3b7fd11c90e41
  top_rated: 'top_rated', // Popular: https://api.themoviedb.org/3/tv/top_rated?api_key=22f04d437e4ae626e8b3b7fd11c90e41
  on_the_air: 'on_the_air', // En el aire: https://api.themoviedb.org/3/tv/on_the_air?api_key=22f04d437e4ae626e8b3b7fd11c90e41
};

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = 'movie/' + movieType[type];
    return axiosClient.get(url, params);
  },
  getTvList: (type, params) => {
    const url = 'tv/' + tvType[type];
    return axiosClient.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + '/' + id + '/videos';
    return axiosClient.get(url, { params: {} });
  },
  search: (cate, params) => {
    const url = 'search/' + category[cate];
    return axiosClient.get(url, params);
  },
  detail: (cate, id, params) => {
    const url = category[cate] + '/' + id;
    return axiosClient.get(url, params);
  },
  credits: (cate, id) => {
    const url = category[cate] + '/' + id + '/credits';
    return axiosClient.get(url, { params: {} });
  },
  similar: (cate, id) => {
    const url = category[cate] + '/' + id + '/similar';
    return axiosClient.get(url, { params: {} });
  },
};

export default tmdbApi;
