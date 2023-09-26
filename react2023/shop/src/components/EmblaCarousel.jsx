import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export const EmblaCarousel = () => {
  const [emblaRef] = useEmblaCarousel()

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide"><img src={'https://codingapple1.github.io/shop/shoes1.jpg'} width="80%" /></div>
        <div className="embla__slide"><img src={'https://codingapple1.github.io/shop/shoes2.jpg'} width="80%" /></div>
        <div className="embla__slide"><img src={'https://codingapple1.github.io/shop/shoes3.jpg'} width="80%" /></div>
      </div>
    </div>
  )
}
