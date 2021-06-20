// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import './style.scss';

import pg1 from './imgs/pg1.png';
import pg2 from './imgs/pg2.png';
import pg3 from './imgs/pg3.png';
import pg4 from './imgs/pg4.png';

const imgs = {
  pg1,
  pg2,
  pg3,
  pg4,
};
const slidesArr = [];

for (let index = 1; index <= 4; index++) {
  slidesArr.push(
    <SwiperSlide>
      <img src={imgs[`pg${index}`]} alt="" />
    </SwiperSlide>
  );
}

const SwiperWrapper = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      onSlidePrev={() => console.log('slide onSlidePrev')}
    >
      {slidesArr}
    </Swiper>
  );
};

export default SwiperWrapper;
