import React from 'react';

import {withRouter} from 'react-router-dom';

import './menu-item.styles.scss';

// we pass Router props: history and match, to allow this component to navigate
// to the HATS page from where ever we are


const MenuItem = ( {title, imageUrl, size, history, linkUrl, match} ) => ( 
  <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
    <div 
      className='background-image'     
      style={
        {backgroundImage: `url(${imageUrl})`}
      }
    />
    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>Shop</span>
    </div>
  </div>
);

// 'withRouter' will give MenuItem with all the router props
export default withRouter(MenuItem);