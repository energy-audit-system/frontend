import "./Footer.scss";

export default function Footer() {
  return (
    <><footer className="footer">
          <div className="footer__container">
              {/* Левая колонка */}
              <div className="footer__col footer__brand">
                  <h2 className="footer__logo">ENERGOSTATUS</h2>

                  <div className="footer__socials">
                      <a href="#">✈</a>
                      <a href="#">📷</a>
                      <a href="#">📘</a>
                  </div>
              </div>

              {/* Меню */}
              <div className="footer__col">
                  <h4>Меню</h4>
                  <a href="#">Главная</a>
                  <a href="#">Продукты</a>
                  <a href="#">Наши работы</a>
              </div>

              {/* Информация */}
              <div className="footer__col">
                  <h4>Информация</h4>
                  <a href="#">О нас</a>
                  <a href="#">Контакты</a>
              </div>

              {/* Контакты */}
              <div className="footer__col footer__contacts">
                  <div>✉ energostatus.uz@gmail.com</div>
                  <div>📍 Узбекистан, Ташкент, ул. Алишера Навои, 9</div>
                  <div>📞 +998 77 101 99 90</div>
                  <div>📞 +998 99 101 99 90</div>
              </div>
          </div>


      </footer>
      <div className="footer__bottom">EnergoStatus все права защищены</div>
      </>
  );
}
