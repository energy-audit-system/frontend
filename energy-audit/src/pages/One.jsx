import { useEffect, useRef } from "react";
import "../styles/page.scss";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
export default function One() {
  const aboutRef = useRef(null);
  const titleRef = useScrollAnimation();
  const textRef = useScrollAnimation();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      },
      {
        threshold: 0.2, // 20% блока видно
      }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="About">
      <div className="About_container hidden" ref={aboutRef}>
        <h2 className="about__title">О нас</h2>
      <p>
        Мы — команда профессионалов в сфере энергоаудита и энергоэффективных решений, помогающая бизнесу и организациям снижать энергопотребление, оптимизировать затраты и повышать эффективность эксплуатации объектов.
      </p>

      <p>
        Наша компания проводит комплексные энергетические обследования зданий, промышленных предприятий и инженерных систем с использованием современных методик и измерительного оборудования. Мы анализируем фактическое потребление энергоресурсов, выявляем потери и разрабатываем практические рекомендации по их устранению.
      </p>

      <p>
        Наша цель — сделать энергопотребление прозрачным, управляемым и экономически выгодным. Мы не просто выявляем проблемы, а предлагаем конкретные решения, направленные на снижение расходов, повышение надёжности систем и соответствие действующим нормативам.
      </p>

      <p>
        Мы работаем в тесном взаимодействии с заказчиком на всех этапах — от первичного анализа до внедрения рекомендаций и последующего контроля результатов. Такой подход позволяет достигать измеримого эффекта и долгосрочной экономии.
      </p>

      <p>
        Энергоаудит с нами — это инвестиция в устойчивость, безопасность и эффективность вашего бизнеса.
      </p>
      
      </div>
    </section>
  );
}
