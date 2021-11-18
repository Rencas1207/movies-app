import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import tmdbApi, {
  category as CategoryApi,
  movieType,
  tvType,
} from '../../api/tmdbApi';
import Button, { OutlineButton } from '../Button/Button';
import { Input } from '../Input/Input';
import { Loading } from '../Loading/Loading';
import MovieCard from '../MovieCard/MovieCard';

import './MovieGrid.scss';

export const MovieGrid = ({ category }) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPage, setTotalPage] = useState(0);

  const [loading, setLoading] = useState(false);

  const { keyword } = useParams();

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    const getList = async () => {
      // setTimeout(async () => {
      let response = null;

      if (keyword === undefined) {
        const params = {};

        switch (category) {
          case CategoryApi.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;

          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(category, { params });
      }

      setItems(response.results);
      setTotalPage(response.total_pages);
      setLoading(false);
      // }, [10000]);
    };
    getList();
  }, [category, keyword]);

  const loadMore = async () => {
    let response = null;
    // setLoading(true);

    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };

      switch (category) {
        case CategoryApi.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;

        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.search(category, { params });
    }
    setItems([...items, ...response.results]);

    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={category} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {loading &&
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => (
            <div className="loading" key={n}>
              <Loading />
            </div>
          ))}
        {!loading &&
          items.map((item, i) => (
            <MovieCard category={category} item={item} key={i} />
          ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = ({ category, keyword }) => {
  const history = useHistory();

  const [keywordSearch, setKeywordSearch] = useState(keyword ? keyword : '');

  const goToSearch = useCallback(() => {
    if (keywordSearch.trim().length > 0) {
      history.push(`/${CategoryApi[category]}/search/${keywordSearch}`);
    }
    setKeywordSearch('');
  }, [keywordSearch, category, history]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
        setKeywordSearch('');
      }
    };
    document.addEventListener('keyup', enterEvent);
    return () => {
      document.removeEventListener('keyup', enterEvent);
    };
  }, [keywordSearch, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder={
          category === 'movie' ? 'Search movie...' : 'Search tv series...'
        }
        value={keywordSearch}
        onChange={(e) => setKeywordSearch(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};
