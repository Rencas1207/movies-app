import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './MovieList.scss';

import { Swiper, SwiperSlide } from 'swiper/react';

import tmdbApi, { category as CategoryApi } from '../../api/tmdbApi';

import { MovieCard } from '../MovieCard/MovieCard';
import { Loading } from '../Loading/Loading';

const MovieList = ({ type, category, id }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getList = async () => {
      // setTimeout(async () => {
      let response = null;
      const params = {};

      if (type !== 'similar') {
        switch (category) {
          case CategoryApi.movie:
            response = await tmdbApi.getMoviesList(type, { params });
            break;

          default:
            response = await tmdbApi.getTvList(type, { params });
        }
      } else {
        response = await tmdbApi.similar(category, id);
      }
      setItems(response.results);
      setLoading(false);
      // }, [10000]);
    };
    getList();
  }, [category, type, id]);
  // console.log(items);
  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {loading &&
          [0].map((n) => (
            <div className="loading" key={n}>
              <Loading />
            </div>
          ))}

        {!loading &&
          items.map((item, i) => (
            <SwiperSlide key={i}>
              <MovieCard item={item} category={category} loading={loading} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
