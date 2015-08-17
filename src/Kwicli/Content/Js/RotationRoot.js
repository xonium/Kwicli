import React from 'react';
import Rotation from 'react-rotation';

const data = [
  '/images/ASP-NET-Banners-01.png',
  '/images/ASP-NET-Banners-02.png',
  '/images/Banner-01-Azure.png',
  '/images/Banner-02-VS.png'
];

React.render(<Rotation data={data} />, document.querySelector('.rotationContainer'));