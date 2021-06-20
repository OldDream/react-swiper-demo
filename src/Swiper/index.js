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
    <SwiperSlide className="swiper-slide" key={index}>
      <div>
        <img src={imgs[`pg${index}`]} alt="" />
      </div>
    </SwiperSlide>
  );
}

const SwiperWrapper = () => {
  return (
    <Swiper
      resistanceRatio={0}
      watchSlidesProgress={true}
      className="swiper-wrapper"
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      onInit={(swiper) => {
        const slides = swiper.slides;
        for (let i = 0; i < slides.length; i++) {
          const slide = slides.eq(i);
          slide.css('zIndex', 100 - i); //设置slide的z-index层级
        }
      }}
      onResize={(swiper) => {
        swiper.update();
      }}
      onSetTranslate={(swiper) => {
        console.log('onSetTranslate')
        // 手动设置wrapper的位移
        const slides = swiper.slides;
        let offsetAfter = swiper.width * 0.95; //每个slide的位移值
        for (let i = 0; i < slides.length; i++) {
          let slide = slides.eq(i);
          let progress = slides[i].progress;
          if (progress <= 0) {
            //右边slide位移
            slide.transform(
              'translate3d(' +
                progress * offsetAfter +
                'px, 0, 0) scale(' +
                (1 - Math.abs(progress) / 20) +
                ')'
            );
            slide.css('opacity', progress + 3); //最右边slide透明
          }
          if (progress > 0) {
            slide.transform('rotate(' + -progress * 5 + 'deg)'); //左边slide旋转
            slide.css('opacity', 1 - progress); //左边slide透明
          }
        }
      }}
      onSetTransition={(swiper, transition) => {
        console.log('onSetTransition')
        for (let i = 0; i < swiper.slides.length; i++) {
          // .eq(index)   返回当前选中的元素中的指定序号的元素
          // https://www.swiper.com.cn/usage/dom7/index.html
          let slide = swiper.slides.eq(i);
          slide.transition(transition);
        }
      }}
    >
      {slidesArr}
    </Swiper>
  );
};

export default SwiperWrapper;
