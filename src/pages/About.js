import React from 'react';
import Layout from '../components/Layout/Layout';
import GoBackButton from '../components/GoBackButton';

const About = () => {
    return (
        <Layout title={"About - Tulip Panda"}>
       <div className="container">
       <div className="row">
            <div className="d-flex align-items-center">
                        <div className="col-auto">
                            <GoBackButton />
                        </div>
                    </div>
            </div>
       </div>
       <section className="container my-5">
      <h2 className="p-3 mt-3 text-center">About Us</h2>
      <p className="lead text-center">
        🍴 Bringing the delicious taste of <strong>Tulip Garden Restaurant</strong> right to your doorstep — hot, fresh, and fast.
      </p>
      <div className="col-md-5">
                    <img src="/images/about.png" alt="about" style={{ width: "100%" }} />
                </div>
              
      <div className="row mt-4">
        <div className="col-md-6">
          <h4>Who We Are</h4>
          <p>
            <strong>Tulip Panda</strong> is Trishal’s trusted online food delivery service, connecting you with your favorite meals from the renowned <strong>Tulip Garden Restaurant</strong>. Whether it’s lunch, dinner, or a late-night craving — we’ve got you covered.
          </p>
        </div>

        <div className="col-md-6">
          <h4>Why Choose Us?</h4>
          <ul className="list-unstyled">
            <li>✅ Authentic food, made fresh to order</li>
            <li>✅ Fast and reliable delivery across Trishal</li>
            <li>✅ Hygienic packaging and safe food handling</li>
            <li>✅ Easy-to-use online ordering</li>
            <li>✅ Friendly customer support</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="fw-bold">
          Experience restaurant-quality food at home with <span className="text-success">Tulip Panda</span> – where flavor meets convenience.
        </p>
      </div>
    </section>
        </Layout>
    );
};

export default About;