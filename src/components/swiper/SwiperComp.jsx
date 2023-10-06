import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const SwiperComp = ({ children, background = "bg-black" }) => {
  return (
    <div
      className={`mt-16 mb-8 text-white ${background} lg:mt-0 swiper-container bg-opacity-80`}
    >
      <Swiper
        breakpoints={{
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 2,
          },
        }}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={1}
        direction={"horizontal"}
        pagination={{
          type: "fraction",
        }}
        freeMode={true}
        navigation={true}
        modules={[Pagination, Navigation, Scrollbar, A11y]}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperComp;
