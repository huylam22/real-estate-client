import React from "react";

const OurStory = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center lg:relative -translate-y-10 lg:p-7 p-4">
        <span className="lg:absolute bg-red-400 rounded-lg w-5 h-1 lg:-translate-y-72 -translate-y-10"></span>
        <h1 className="absolute dark:text-white text-center font-bold lg:text-[200px] text-[120px] opacity-[3%] -z-10 lg:-translate-y-2/4 -translate-y-2/3">
          Our Story
        </h1>
        <span className="mb-5 dark:text-white rounded-full bg-green-200 py-2 px-5 text-green-600 font-bold">
          {" "}
          OUR STORY
        </span>
        <h1 className="text-primary text-4xl mb-10 text-center dark:text-graySoft">
          We Will Find the Best Option
        </h1>
        <div className="w-full max-w-[700px] mb-20 text-center lg:text-left">
          <p className="text-primary text-sm leading-relaxed dark:text-strock">
            Real estate is "property consisting of land and the buildings on it,
            along with its natural resources such as crops, minerals or water,
            immovable property of this nature; an interest vested in this (also)
            an item of real property, (more generally) buildings or housing in
            general.
          </p>
        </div>
        <div className="lg:flex lg:flex-row flex flex-col gap-y-2 lg:gap-x-10 text-center">
          <div className="flex flex-col px-[80px] bg-secondary bg-opacity-5 dark:bg-graySoft py-10 rounded-lg">
            <h3 className="text-primary font-semibold text-3xl mb-5">
              15 Years
            </h3>
            <p className="text-primary font-light text-sm">In Business</p>
          </div>
          <div className="flex flex-col bg-secondary bg-opacity-5 dark:bg-graySoft  px-[80px] py-10 rounded-lg">
            <h3 className="text-primary font-semibold text-3xl mb-5">
              $1 Billion
            </h3>
            <p className="text-primary font-light text-sm">Property Brokered</p>
          </div>
          <div className="flex flex-col bg-secondary bg-opacity-5 px-[80px] dark:bg-graySoft py-10 rounded-lg">
            <h3 className="text-primary font-semibold text-3xl mb-5">10,000</h3>
            <p className="text-primary font-light text-sm">Transactions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
