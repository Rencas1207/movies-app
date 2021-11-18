import React from 'react';

import { useParams } from 'react-router-dom';

import { PageHeader } from '../components/PageHeader/PageHeader';

import { category as cate } from '../api/tmdbApi';
import { MovieGrid } from '../components/MovieGrid/MovieGrid';

import { Helmet } from 'react-helmet-async';

import logo from '../assets/logo-movies.png';

const Catalog = () => {
  const { category, keyword } = useParams();

  return (
    <>
      <Helmet>
        <link rel="icon" href={logo} />
        <title>
          Movies App -{' '}
          {category === cate.movie
            ? keyword === undefined
              ? 'Search of Movies'
              : `Results of ${keyword}`
            : keyword === undefined
            ? 'Search of TV Series'
            : `Results of ${keyword}`}
        </title>
      </Helmet>
      <PageHeader>
        {category === cate.movie ? 'Movies' : 'TV Series'}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
