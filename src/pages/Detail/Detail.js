import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';
import { Loading } from '../../components/Loading/Loading';
import MovieList from '../../components/MovieList/MovieList';
import { CastList } from './CastList';

import './Detail.scss';
import { VideoList } from './VideoList';

import logo from '../../assets/LogoMovies.svg';

const Detail = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);

  const [loading, setLoading] = useState(false);

  window.scrollTo(0, 0);
  useEffect(() => {
    setLoading(true);
    const getDetail = async () => {
      // setTimeout(async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      setLoading(false);
      // }, [5000]);
    };
    getDetail();
  }, [category, id]);

  // console.log(item);

  return (
    <main>
      {loading && (
        <>
          <Helmet>
            <link rel="icon" href={logo} />
            <title>Cargando...</title>
          </Helmet>
          <div className="loading">
            <Loading />
          </div>
        </>
      )}
      {!loading && item && (
        <>
          <Helmet>
            {/* <link rel="icon" href={logo} /> */}
            <title>Rencas Movies App - {item.title || item.name}</title>
          </Helmet>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>

          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.backdrop_path || item.poster_path
                  )})`,
                }}
              ></div>
            </div>

            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span className="genres__item" key={i}>
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="sectin__header">
                  <h2>Casts</h2>
                </div>
                {/* Cast list */}
                <CastList id={item.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Detail;
