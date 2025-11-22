import React from "react";
import { useAuth } from "../../store/auth";
import "./Services.css";

function Services() {
  const { services } = useAuth();

  const hasServices = services && services.length > 0;

  return (
    <main>
      <section className="services-wrapper">
        <h1 className="service-heading">
          Our <span className="highlight">Services</span>
        </h1>
        <p className="service-subtitle">
          Explore the solutions we offer to help you build secure and scalable web applications.
        </p>

        {!hasServices ? (
          <p className="no-services-text">
            No services available at the moment. Please check back later.
          </p>
        ) : (
          <section className="section-services">
            {services.map((eachItem) => {
              const { service, description, price, provider, _id } = eachItem;

              return (
                <div key={_id} className="service-card-wrapper">
                  <div className="card">
                    <div className="tilt">
                      <div className="img">
                        <img
                          src="https://images.unsplash.com/photo-1544237526-cae15a57ed1e?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85"
                          alt={service}
                        />
                      </div>
                    </div>

                    <div className="info">
                      <h2 className="title">{service}</h2>
                      <p className="desc">{description}</p>

                      <div className="bottom">
                        <div className="price">
                          <span className="new">{price}</span>
                        </div>
                      </div>

                      <div className="meta">
                        <p className="provider">By {provider}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </section>
    </main>
  );
}

export default Services;
