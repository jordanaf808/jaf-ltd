import React from 'react';

import Directory from '../../components/directory/directory.component';

// import './homepage.styles.scss';
// replaced stylesheet with 'styled component'
import { HomePageContainer } from './homepage.styles';

const HomePage = () => (
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
);

export default HomePage;
