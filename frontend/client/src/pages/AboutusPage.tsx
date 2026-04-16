import line from "../assets/minus-horizontal-straight-line.png";
import Subscription from "../pages/SubscriptionPage";

const AboutusPage: React.FC = () => {
  return (
    <>
      <section className="about-container mt-5">
        <div className="about-head d-flex justify-content-center">
          <h2>
            <span style={{ color: "#383838", fontWeight: "bold" }}>ABOUT</span>{" "}
            US
          </h2>
          <img src={line} alt="" width={40} height={40} className="mx-2" />
        </div>
        <div className="container mt-5">
          <div className="about-content row g-5">
            <div className="about-img col-3"></div>
            <div className="about-text col-8 mx-4">
              <p>
                Welcome to Forever, your premier destination for fashion and
                lifestyle products. Founded with a passion for style and
                quality, we have been serving fashion enthusiasts for years,
                offering a curated selection of clothing, accessories, and more.
              </p>
              <br />
              <br />
              <p>
                Our commitment to excellence drives everything we do, from
                sourcing the finest materials to delivering exceptional customer
                experiences. We believe that fashion should be accessible,
                affordable, and empowering for everyone.
              </p>

              <p style={{ fontWeight: "bold" }}>Our Mission</p>

              <p>
                At Forever, our mission is to inspire confidence and
                self-expression through fashion. We strive to provide
                high-quality products that reflect the latest trends while
                maintaining timeless appeal, ensuring our customers look and
                feel their best every day.
              </p>
            </div>
          </div>

          <div className="choose-us mt-5">
            <div className="d-flex">
              <h3>
                <span style={{ color: "#383838" }}>WHY </span>CHOOSE US
              </h3>
              <img className="mx-2" src={line} alt="" width={40} height={40} />
            </div>

            <div className="cards row mt-4">
              <div className="quality col-4 p-5">
                <div className="quality-wrapper">
                  <p style={{ fontWeight: "bold" }}>Quality Assurance</p>
                  <p>
                    We maintain rigorous quality control standards throughout
                    our supply chain, ensuring every product meets our high
                    expectations for durability, comfort, and style.
                  </p>
                </div>
              </div>
              <div className="quality col-4 p-5">
                <div className="quality-wrapper">
                  <p style={{ fontWeight: "bold" }}>Convenience</p>
                  <p>
                    Shop with ease through our user-friendly website and mobile
                    app, featuring fast shipping, easy returns, and secure
                    payment options available 24/7.
                  </p>
                </div>
              </div>
              <div className="quality col-4 p-5">
                <div className="quality-wrapper">
                  <p style={{ fontWeight: "bold" }}>
                    Exceptional Customer Service
                  </p>
                  <p>
                    Our dedicated support team is here to assist you with any
                    questions or concerns, providing personalized service to
                    ensure your shopping experience is always positive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Subscription />
    </>
  );
};

export default AboutusPage;
