import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./EquipmentSlider.scss";

export default function EquipmentSlider({ slides }) {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={24}
      pagination={{ clickable: true }}
      grabCursor
      speed={600}
      breakpoints={{
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="equipment-card">
            <img src={slide.image} alt={slide.title} />
            <h5>{slide.title}</h5>
            <p>{slide.text}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
