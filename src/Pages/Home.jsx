import React from 'react'
import HeroSection from '../Components/HeroSection'
import FeatureArtical from '../Components/FeatureArtical'
import BrowseByCategory from '../Components/BrowseByCategory'
import NewsLetter from '../Components/NewsLetter'
import LatestArticle from '../Components/LatestArticle'

function Home() {
  return (
    <div>
      <HeroSection/>
      <FeatureArtical/>
      <BrowseByCategory/>
      <NewsLetter/>
      <LatestArticle/>
    </div>
  )
}

export default Home