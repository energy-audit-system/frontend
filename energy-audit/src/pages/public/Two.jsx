import "../../styles/page.scss";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { NavLink } from "react-router-dom";
import dom from "../../image/1313.png";

const MAIN_SERVICES = [
  {
    title: "Техническое обследование",
    text:
      "Проводим комплексную оценку технического состояния зданий и сооружений. Выявляем скрытые дефекты, оцениваем несущую способность конструкций и даем рекомендации по дальнейшей эксплуатации или реконструкции.",
    bullets: [
      "Обследование несущих конструкций",
      "Диагностика инженерных систем",
      "Оценка фундаментов и оснований",
    ],
  },
  {
    title: "Проектирование",
    text:
      "Разрабатываем проектную документацию любой сложности с применением современных BIM-технологий. Создаем функциональные и эстетичные решения, полностью соответствующие требованиям заказчика и нормативам.",
    bullets: [
      "Архитектурное проектирование",
      "Конструктивные решения",
      "Инженерные системы (ВК, ОВ, ЭОМ)",
    ],
  },
  {
    title: "Разработка документации",
    text:
      "Подготавливаем полный комплект проектной и рабочей документации в соответствии с действующими нормами и стандартами. Обеспечиваем прохождение экспертизы и получение необходимых согласований.",
    bullets: [
      "Рабочая документация",
      "Смета и технико-экономическое обоснование",
      "Согласование с надзорными органами",
    ],
  },
  {
    title: "Авторский надзор",
    text:
      "Осуществляем контроль за соответствием строительства проектной документации. Наши специалисты присутствуют на объекте, обеспечивая качественную реализацию всех проектных решений и оперативное решение возникающих вопросов.",
    bullets: [
      "Контроль соответствия проекту",
      "Внесение изменений при необходимости",
      "Консультации на всех этапах строительства",
    ],
  },
];

const EXTRA_SERVICES = [
  {
    title: "Генеральный подряд",
    text:
      'Полное управление строительством "под ключ" — от начала работ до сдачи объекта с гарантией качества и соблюдением сроков.',
  },
  {
    title: "Реконструкция и реставрация",
    text:
      "Модернизация существующих зданий с сохранением архитектурной ценности и улучшением эксплуатационных характеристик.",
  },
  {
    title: "Строительный контроль",
    text:
      "Независимая экспертиза качества строительно-монтажных работ на всех этапах реализации проекта.",
  },
  {
    title: "BIM-моделирование",
    text:
      "Создание информационных 3D-моделей зданий для эффективного управления проектом и минимизации ошибок.",
  },
  {
    title: "Сметное дело",
    text:
      "Профессиональный расчет стоимости строительства с детальной проработкой всех статей затрат.",
  },
  {
    title: "Консультации экспертов",
    text:
      "Экспертная поддержка на всех этапах реализации проекта от опытных инженеров и архитекторов.",
  },
];

const OBJECT_TYPES = [
  {
    title: "Жилые комплексы",
    text:
      "Проектирование и строительство современных жилых зданий с развитой инфраструктурой.",
    bullets: ["Многоквартирные дома", "Таунхаусы и коттеджи", "Элитное жилье"],
  },
  {
    title: "Коммерческие объекты",
    text:
      "Создание функциональных пространств для бизнеса и торговли любого формата.",
    bullets: ["Офисные центры", "Торговые комплексы", "Отели и гостиницы"],
  },
  {
    title: "Промышленные объекты",
    text:
      "Проектирование производственных и складских комплексов с учетом специфики бизнеса.",
    bullets: ["Производственные цеха", "Складские комплексы", "Логистические центры"],
  },
];

function FadeUp({ children, className = "" }) {
  const ref = useScrollAnimation();
  return (
    <div ref={ref} className={`fade-up ${className}`}>
      {children}
    </div>
  );
}

export default function Two() {
  const heroRef = useScrollAnimation();

  return (
    <div className="page services-page">
      {/* HERO */}
      <section className="services-hero fade-up" ref={heroRef}>
        <div className="services-hero__inner">
          <div className="services-hero__text">
            <h1 className="about__title__service">Полный цикл строительных услуг</h1>
            <p className="services-hero__desc">
              От концепции до реализации — мы предоставляем комплексные решения для строительства жилых,
              коммерческих и промышленных объектов. Наш опыт и профессионализм гарантируют качество на каждом этапе.
            </p>

            <div className="services-hero__actions">
              <a className="btn-report" href="#services-list">Посмотреть услуги</a>
              <NavLink className="btn-report btn-report--ghost" to="/#contact">
                Связаться с нами
              </NavLink>
            </div>
          </div>

          <div className="services-hero__media" aria-hidden="true">
            <img className="services-hero__media-box" src={dom} alt="Дом" />
          </div>
        </div>
      </section>

      {/* MAIN SERVICES */}
      <section className="About" id="services-list">
        <FadeUp>
          <div className="text-report">Что мы предлагаем</div>
          <h2 className="services-subtitle">Комплекс профессиональных услуг</h2>
        </FadeUp>

        <div className="services-list">
          {MAIN_SERVICES.map((s) => (
            <FadeUp key={s.title}>
              <article className="service-row">
                <div className="service-row__left">
                  <h3 className="service-row__title">{s.title}</h3>
                  <p className="service-row__text">{s.text}</p>

                  <ul className="service-row__bullets">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>

                  <button className="btn-report">Заказать услугу</button>
                </div>

                {/* ✅ вместо пустого места — твоя картинка */}
                <div className="service-row__right" aria-hidden="true">
                  <img className="service-row__img" src={dom} alt="" />
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* EXTRA SERVICES */}
      <section className="About">
        <FadeUp>
          <div className="text-report">Дополнительные услуги</div>
          <h2 className="services-subtitle">Расширенный спектр возможностей</h2>
        </FadeUp>

        <div className="services">
          {EXTRA_SERVICES.map((s) => (
            <FadeUp key={s.title}>
              <div className="service-card">
                <div className="service-icon">
                  {/* Иконку добавишь сам */}
                  <span className="service-icon__dot" />
                </div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-about service-text">{s.text}</p>
                <button className="btn-report btn-report--small">Подробнее</button>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* OBJECT TYPES */}
      <section className="About">
        <FadeUp>
          <div className="text-report">Типы объектов</div>
          <h2 className="services-subtitle">Реализуем проекты любой сложности</h2>
        </FadeUp>

        <div className="objects">
          {OBJECT_TYPES.map((o) => (
            <FadeUp key={o.title}>
              <div className="object-card">
                {/* ✅ вместо пустого блока — картинка */}
                <img className="object-card__media" src={dom} alt="" />

                <div className="object-card__body">
                  <div className="object-card__title">{o.title}</div>
                  <div className="object-card__text">{o.text}</div>
                  <ul className="object-card__bullets">
                    {o.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <button className="btn-report btn-report--small">Примеры проектов</button>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}
