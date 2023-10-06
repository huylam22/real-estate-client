import React from "react";
import {
  faLocationArrow,
  faPhone,
  faMessage,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { backgroundImage } from "../../constants/global";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hamster from "../../components/loading/hamster/hamster";
import Title from "./parts/Title";

const Introduction = () => {
  return (
    <section className="relative">
      <div className="flex items-center justify-center h-screen -translate-y-36 -z-10">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          drag
          className="cursor-pointer absolute lg:top-1/4 top-2/3 max-w-[350px] p-5 border-[3px] shadow-md shadow-gray-400 bg-lite right-10 border-green z-50"
        >
          <h1 className="mb-2 font-mono text-xl font-semibold text-primary balanced">
            Huy Lam
          </h1>

          <p className="font-mono text-xs text-secondary">
            Thrilled to share my amazing experience with Home Production! 🏡
            Every listing feels like a dream waiting to be explored. 🌟 If
            you're in search of your dream home, Home Production is where your
            journey begins. #HomeSweetHome #DreamHomeFound
          </p>
        </motion.div>

        <div className="hidden lg:block">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            drag
            className="absolute cursor-pointer top-96 max-w-[350px] p-5 border-[3px] shadow-md shadow-gray-400 bg-lite left-10 border-sky-500 z-50"
          >
            <h1 className="mb-2 font-mono text-xl font-semibold text-primary balanced">
              Huy Lam
            </h1>
            <p className="font-mono text-xs text-secondary">
              Thrilled to share my amazing experience with Home Production! 🏡
              Every listing feels like a dream waiting to be explored. 🌟 If
              you're in search of your dream home, Home Production is where your
              journey begins. #HomeSweetHome #DreamHomeFound
            </p>
          </motion.div>
        </div>

        <motion.div
          className="absolute z-10 cursor-pointer top-1/3"
          whileTap={{ scale: 1.1 }}
          drag
          dragConstraints={{
            top: -50,
            left: -50,
            right: 50,
            bottom: 50,
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <FontAwesomeIcon
              icon={faHouse}
              className="mr-3 w-7 h-7 border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]  px-8 py-3 text-white bg-green border rounded-full"
            />
            <Title></Title>
          </div>
        </motion.div>

        <motion.div
          className="absolute text-white max-w-[800px]  cursor-pointer"
          drag
          dragConstraints={{
            top: -50,
            left: -50,
            right: 50,
            bottom: 50,
          }}
        >
          <div className="flex flex-col items-center justify-center gap-x-5 lg:flex lg:flex-row">
            <Hamster></Hamster>
            <h1 className="z-10 p-2 max-w-[600px] text-4xl font-medium leading-relaxed text-center lg:text-6xl"></h1>
          </div>
        </motion.div>
        <div
          className="w-full h-full bg-black bg-no-repeat bg-cover bg-blend-soft-light lg:bg-cover -z-10 lg:custom-border bg-opacity-30"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        ></div>

        <div className="absolute z-10 flex flex-col p-2 lg:flex lg:flex-row lg:p-0 gap-y-3 bottom-36 lg:gap-x-36">
          <div className="flex items-center gap-5 text-xl">
            <FontAwesomeIcon icon={faLocationArrow} className="text-white" />
            <h3 className="font-medium text-white">
              300 Nguyen Van A, Quan 1, Tp. HCM
            </h3>
          </div>
          <div className="flex items-center gap-5 text-xl cursor-pointer">
            <FontAwesomeIcon icon={faPhone} className="text-white" />
            <a href="tel:+84-76-123-4567" className="font-medium text-white">
              (076) 123 4567
            </a>
          </div>
          <div className="flex items-center gap-5 text-xl">
            <FontAwesomeIcon icon={faMessage} className="text-white" />
            <h3 className="font-medium text-white">realesate@realestate.com</h3>
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        <NavLink
          className="absolute px-10 py-4 font-bold bg-white border rounded-full -translate-y-36 text-primary border-secondary border-opacity-40"
          to="/properties"
        >
          Find the best property
        </NavLink>
      </div>
    </section>
  );
};

export default Introduction;
