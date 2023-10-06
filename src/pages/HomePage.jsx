import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";
import { SwiperSlide } from "swiper/react";
import { propertyAPI } from "../api/propertyApi";
import SwiperComp from "../components/swiper/SwiperComp";
import LayoutHome from "../layouts/LayoutHome";
import PropertyCard from "../modules/Property/PropertyCard";
import PropertyCardLoading from "../modules/Property/PropertyCardLoading";
import Introduction from "../modules/home/Introduction";
import OurStory from "../modules/home/OurStory";

const landType = ["All", "Apartment", "House"];

const HomePage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [properties, setProperties] = React.useState();
  const [category, setCategory] = React.useState("All");
  useEffect(() => {
    async function fetchProperties() {
      try {
        if (category === "All") {
          const res = await axios.get(propertyAPI.getProperties());
          const { data } = res;
          setProperties(data);
          setIsLoading(false);
          return;
        }
        const res = await axios.get(propertyAPI.getProperties(category));
        const { data } = res;
        // console.log(data);
        setProperties(data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchProperties();
  }, [category]);
  return (
    <LayoutHome>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Introduction></Introduction>
        <OurStory></OurStory>
        <section className="text-center max-w-[1440px] mx-auto">
          <span className="px-5 py-2 font-bold text-green-600 bg-green-200 rounded-full dark:text-white">
            BROWSE BY CATEGORY
          </span>
          <div className="flex items-center justify-center py-3 px-4  mx-auto mt-6 text-white rounded-full w-fit gap-x-12 bg-green">
            {landType.map((item, index) => (
              <motion.div
                key={index}
                className="cursor-pointer "
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
              >
                <Highlighter
                  highlightClassName="text-white text-lg bg-transparent border-none shadow-lg px-6 py-[15px] animate-bounce font-bold rounded-lg"
                  searchWords={[category]}
                  autoEscape={true}
                  textToHighlight={item}
                  onClick={() => {
                    setCategory(item);
                  }}
                >
                  {item}
                </Highlighter>
              </motion.div>
            ))}
          </div>
          {isLoading && (
            <div className="flex flex-col gap-2 lg:grid animat lg:grid-cols-4 lg:gap-x-4 lg:gap-y-6">
              {[...Array(4)].map((_, index) => (
                <PropertyCardLoading key={index} />
              ))}
            </div>
          )}
          <div className="p-5">
            <div className="">
              <SwiperComp background="bg-transparent">
                {properties?.content.length > 0 &&
                  properties.content.map((item, index) => (
                    <SwiperSlide key={item.id}>
                      <PropertyCard
                        key={item.id}
                        item={item}
                        style={{ zIndex: index === 1 ? 1 : "auto" }}
                      ></PropertyCard>
                    </SwiperSlide>
                  ))}
              </SwiperComp>
            </div>
          </div>
        </section>
      </motion.div>
    </LayoutHome>
  );
};

export default HomePage;
