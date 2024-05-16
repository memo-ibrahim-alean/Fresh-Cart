import React from 'react';
import Proudcts from '../Proudcts/Proudcts';
import Categories from '../Categories/Categories';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
  return (
    <div>
      <MainSlider />
      <Categories />
      <Proudcts />
    </div>
  )
}
