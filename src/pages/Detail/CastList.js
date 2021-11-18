import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';
import { Loading } from '../../components/Loading/Loading';

export const CastList = ({ id }) => {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getCredits = async () => {
      // setTimeout(async () => {
      const res = await tmdbApi.credits(category, id);
      setCasts(res.cast.slice(0, 6));
      setLoading(false);
      // }, 5000);
    };
    getCredits();
  }, [category, id]);

  return (
    <div className="casts">
      {loading && [0, 1, 2, 3, 4, 5].map((n) => <Loading key={n} />)}
      {!loading &&
        casts.map((item, i) => (
          <div key={i} className="casts__item">
            <div
              className="casts__item__img"
              style={{
                backgroundImage: `url(${apiConfig.w500Image(
                  item.profile_path
                )})`,
              }}
            ></div>
            <p className="casts__item__name">{item.name}</p>
          </div>
        ))}
    </div>
  );
};
