import React from 'react';

import bg from '../../assets/footer-bg.jpg';
// import logo from '../../assets/tmovie.png';

import './PageHeader.scss';

export const PageHeader = (props) => {
  return (
    <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
      <h2>{props.children}</h2>
    </div>
  );
};
