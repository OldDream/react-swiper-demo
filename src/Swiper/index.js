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
  pg5: pg1,
  pg6: pg2,
  pg7: pg3,
  pg8: pg4,
};

console.log();
const slidesArr = [];

for (let index = 1; index <= Object.getOwnPropertyNames(imgs).length; index++) {
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
      loop={true}
      loopedSlides={4}  // 设置下一个loop所需预览数目
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
        // console.log('onSetTranslate');
        // 手动设置wrapper的位移
        const slides = swiper.slides;
        let offsetAfter = swiper.width * 1; //每个slide的位移值
        // console.log('offsetAfter:' + offsetAfter);
        for (let i = 0; i < slides.length; i++) {
          let slide = slides.eq(i);
          let progress = slides[i].progress;
          if (progress <= 0) {
            //右边slide位移
            slide.transform(
              'translate3d(' +
                progress * offsetAfter +
                'px, ' +
                progress * -10 +
                'px, 0) scale(' +
                (1 - Math.abs(progress) / 10) +
                ')'
            );
            slide.css('opacity', progress + 4); //最右边slide透明
          }
          if (progress > 0) {
            slide.transform(``); //左边slide旋转
            // slide.css('opacity', 1 - progress); //左边slide透明
          }
        }
      }}
      onSetTransition={(swiper, transition) => {
        console.log('onSetTransition---');
        for (let i = 0; i < swiper.slides.length; i++) {
          // .eq(index)   返回当前选中的元素中的指定序号的元素
          // https://www.swiper.com.cn/usage/dom7/index.html
          let slide = swiper.slides.eq(i);
          console.log('transition:' + transition);
          slide.transition(transition); // 设置 transition-duration
        }
      }}
      onSlideNextTransitionStart={(swiper) => {
        console.log(
          'slideChangeTransitionStart----从当前slide开始过渡到另一个slide时执行'
        );
        console.log(swiper.slides.length);
        for (let i = 0; i < swiper.slides.length; i++) {
          // .eq(index)   返回当前选中的元素中的指定序号的元素
          // https://www.swiper.com.cn/usage/dom7/index.html
          let slide = swiper.slides.eq(i);
          let progress = swiper.slides[i].progress;
          console.log(progress);
          if (progress === 1) { // progress：1，代表被划走的那一个
            console.log('命中一次！')
            console.log(swiper.width)
            // slide.transform(
            //   `translate3d(${swiper.width}px,  ${swiper.height}px, -100px) scale(0.6)`
            // );
            // console.log(`translate3d(-${slide.width}px,  -${slide.height}px, -100px) scale(0.6)`)
            slide.css('opacity', 0); //最右边slide透明
            break; // loop模式下会命中多次！
          }
        }
      }}
      onSlideChangeTransitionEnd={(swiper) => {
        console.log('onSlideChangeTransitionEnd----过渡动画结束');
      }}
    >
      {slidesArr}
    </Swiper>
  );
};

export default SwiperWrapper;
