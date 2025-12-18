import "../styles/page.scss";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import image1 from "../image/121212.png";

export default function One() {
const aboutRef = useScrollAnimation();
const missionRef = useScrollAnimation(); // второй секшен

return (
<>
  {/* ===== О НАС ===== */}
  <section className="About">
    <div className="About_container hidden" ref={aboutRef}>
      <h2 className="about__title">О нас</h2>

      <p>
        Мы — команда профессионалов в сфере энергоаудита и энергоэффективных решений, помогающая бизнесу и организациям
        снижать энергопотребление, оптимизировать затраты и повышать эффективность эксплуатации объектов.
      </p>

      <p>
        Наша компания проводит комплексные энергетические обследования зданий, промышленных предприятий и инженерных
        систем с использованием современных методик и измерительного оборудования. Мы анализируем фактическое
        потребление энергоресурсов, выявляем потери и разрабатываем практические рекомендации по их устранению.
      </p>

      <p>
        Наша цель — сделать энергопотребление прозрачным, управляемым и экономически выгодным. Мы не просто выявляем
        проблемы, а предлагаем конкретные решения, направленные на снижение расходов, повышение надёжности систем и
        соответствие действующим нормативам.
      </p>

      <p>
        Мы работаем в тесном взаимодействии с заказчиком на всех этапах — от первичного анализа до внедрения
        рекомендаций и последующего контроля результатов. Такой подход позволяет достигать измеримого эффекта и
        долгосрочной экономии.
      </p>

      <p>
        Энергоаудит с нами — это инвестиция в устойчивость, безопасность и эффективность вашего бизнеса.
      </p>
    </div>
  </section>


  <section className="About">
    <div className="Mission_container hidden" ref={missionRef}>
      <h2 className="about__title">Наши услуги</h2>
<p>dfasfsretg dsgerstg dstg erygh dfyh 5ryh dfghr5 hdfdfgdf dfg df hrty dfgdfgeryt tdyhf dghd eryt eryhd hd hr5yretgdfgedryhgfdf rtehdf g drtdf ger gfdg ergfdg rhdgdfh gdfzg erd gdfgdfgerdg g e4rtgfd ge4 gfsdgswwrw g 5rety eg  ye46t fsdfghr gh r6du gh </p>
      <div className="services">
        <div className="service-card">
    <img src={image1} alt="Прогноз энергопотребления" />
    <span className="service-about">Прогноз энергопотребления промышленных предприятий</span>
  </div>
        <div className="service-card">
    <img src={image1} alt="Прогноз энергопотребления" />
    <span className="service-about">Прогноз энергопотребления промышленных предприятий</span>
  </div>        <div className="service-card">
    <img src={image1} alt="Прогноз энергопотребления" />
    <span className="service-about">Прогноз энергопотребления промышленных предприятий</span>
  </div>        <div className="service-card">
    <img src={image1} alt="Прогноз энергопотребления" />
    <span className="service-about">Прогноз энергопотребления промышленных предприятий</span>
  </div>        <div className="service-card">
    <img src={image1} alt="Прогноз энергопотребления" />
    <span className="service-about">Прогноз энергопотребления промышленных предприятий</span>
  </div>        <div className="service-card">
    <img src={image1} alt="Прогноз энергопотребления" />
    <span className="service-about">Прогноз энергопотребления промышленных предприятий</span>
  </div>        <div className="service-card">
    <img src={image1} alt="Прогноз энергопотребления" />
    <span className="service-about">Прогноз энергопотребления промышленных предприятий</span>
  </div>        <div className="service-card">
    <img src={image1} alt="Прогноз энергопотребления" />
    <span className="service-about">Прогноз энергопотребления промышленных предприятий</span>
  </div>
      </div>
    </div>
  </section>
</>
);
}