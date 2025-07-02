import React, { useContext, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import { Link } from 'react-router-dom'
import TrendingCard from '../../components/Trending/trending'
import TrendingCarousel from '../../components/Trending/TrendingCarousel'
import HeroSection from '../../components/heroSection/HeroSection'
import Mens from '../../components/gender/mens'
import FeaturedCollections from '../../components/home/FeaturedCollections'
import ShopByCategory from '../../components/home/ShopByCategory'
import BrandStory from '../../components/home/BrandStory'
import NewsletterSubscription from '../../components/newsletter/NewsletterSubscription'
import IconicSupimaTees from '../../components/spotlight/IconicSupimaTees'
import StylesInSpotlight from '../../components/spotlight/StylesInSpotlight'

function Home() {
  const heroRef = useRef(null)
  const productCardRef = useRef(null)
  const TrendingcardRef = useRef(null)
  const trackRef = useRef(null)

  // useEffect(() => {
  //   // gsap.from(heroRef.current, { opacity: 100, y: -50, duration: 1 , delay: 0.5 })
  //   // gsap.from(productCardRef.current, { opacity: 100, x: -50, duration: 1, delay: 0.5 })
  //   // gsap.from(trackRef.current, { opacity: 0, y: 50, duration: 1, delay: 1 })
  // }, [])

  return (
    <Layout>
      <div ref={heroRef}>
        <HeroSection />
      </div>

      <StylesInSpotlight />
      <div ref={productCardRef}>
        <ProductCard />
      </div>
      {/* <ShopByCategory /> */}
      <div ref={TrendingcardRef}>
        {/* <TrendingCard /> */}
      </div>
      <div className="flex justify-center  mb-4">
        <Link to={'/allproducts'}>
          <button className='bg-gray-900 text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors'>See more</button>
        </Link>
      </div>

      {/* ICONIC SUPIMA TEES ARE BACK */}
      {/* <IconicSupimaTees /> */}

      {/* STYLES IN SPOTLIGHT */}
      {/* <StylesInSpotlight /> */}

      {/* SHOP FOR (reuse ShopByCategory for now) */}
      <ShopByCategory />
      <BrandStory />

      {/* Newsletter Subscription */}
      <NewsletterSubscription />
    </Layout>
  )
}

export default Home