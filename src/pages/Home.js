import React from 'react';
import { Link } from 'react-router-dom';
import { category, movieType, tvType } from '../api/tmdbApi';
import { OutlineButton } from '../components/Button/Button';
import { HeroSlide } from '../components/Hero-slide/HeroSlide';
import MovieList from '../components/MovieList/MovieList';

const Home = () => {
  return (
    <>
      <HeroSlide />
      <div className="container">
        {/* Section Movie Popular */}
        <section className="section mb-2">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </section>

        {/* Section Movie Top Rated */}
        <section className="section mb-2">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </section>

        {/* Section Tv Popular */}
        <section className="section mb-2">
          <div className="section__header mb-2">
            <h2>Trending TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </section>

        {/* Section Tv Top Rated */}
        <section className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </section>
      </div>
    </>
  );
};

export default Home;
