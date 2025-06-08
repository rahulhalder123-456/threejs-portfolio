import React from 'react';
import { clientReviews } from '../constants/index.js';

const Clients = () => {
  return (
    <section className="c-space my-20" id='clients'>
      <h3 className="head-text">Hear from My Clients</h3>
      <div className="client-container">
        {clientReviews
          .filter(item => item && item.review && item.name && item.img && item.position)
          .map(({ id, name, img, position, review }) => (
            <div key={id} className="client-review">
              <p className="text-white font-light">{review}</p>
              <div className="client-content">
                <div className={"flex gap-3"}>
                  <img src={img} alt={name} className="w-12 h-12 rounded-full" />
                  <div className="flex flex-col">
                    <p className="font-semibold text-white-800">{name}</p>
                    <p className="text-sm text-white-500 md:text-base">{position}</p>
                  </div>
                </div>
                <div className="flex self-end gap-2 items-center mt-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <img key={i} src="/assets/star.png" alt="star" className="w-5 h-5" />
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Clients;
