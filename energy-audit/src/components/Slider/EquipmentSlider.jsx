import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./EquipmentSlider.scss";

export default function EquipmentSlider({ slides }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
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
      {slides.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="equipment-card">
            <img src={item.image} alt={item.title} />
            <h5>{item.title}</h5>
            <p>{item.text}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
