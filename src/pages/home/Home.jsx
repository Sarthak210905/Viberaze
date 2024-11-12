import React, { useContext, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'
import SliderComponent from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import { Link } from 'react-router-dom'
import TrendingCard from '../../components/Trending/trending'
import HeroSection from '../../components/heroSection/HeroSection'
import Mens from '../../components/gender/mens'



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
      <div >
        <HeroSection />
      </div >
     {/* <div>

        <Mens />
     </div> */}

      <div ref={productCardRef}>
        <ProductCard />
      </div>
      <div ref={TrendingcardRef}>
        <TrendingCard />
      </div>
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={'/allproducts'}>
          <button className=' bg-gray-300 px-5 py-2 rounded-xl'>See more</button>
        </Link>
      </div>
      <div ref={trackRef}>
        <Track />
      </div>
      {/* <Testimonial /> */}
    </Layout>
  )
}

export default Home