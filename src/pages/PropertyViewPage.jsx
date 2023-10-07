import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import { propertyAPI } from "../api/propertyApi";
import ModalImage from "../components/modal/ModalImage";
import SwiperComp from "../components/swiper/SwiperComp";
import LayoutHome from "../layouts/LayoutHome";
import PropertyCard from "../modules/Property/PropertyCard";
import PropertyCardLoading from "../modules/Property/PropertyCardLoading";
import PropertyInfo from "../modules/Property/view/PropertyInfo";
import PropertyInfoLoading from "../modules/Property/view/PropertyInfoLoading";
import UserCard from "../modules/user/parts/UserCard";

const PropertyViewPage = () => {
  const [loading, setLoading] = useState(true);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [clickedIndex, setClickedIndex] = React.useState(null);
  const [data, setData] = useState();
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const handleNavigatet = () => {
    navigate(`/properties`);
  };
  const onClose = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    async function getPropertyDetail() {
      try {
        const res = await axios.get(propertyAPI.getPropertyDetail(propertyId));
        // console.log(res);
        setData(res.data);
        setLoading(false);

        if (res.data) {
          const similarRes = await axios.get(
            propertyAPI.getProperties(res.data.propertyLandType)
          );
          // console.log(similarRes.data);
          setSimilarProperties(similarRes.data.content);
        }
      } catch (error) {
        console.log(error);
        navigate("/404");
      }
    }
    getPropertyDetail();
  }, []);
  if (loading) {
    return (
      <LayoutHome>
        <PropertyInfoLoading></PropertyInfoLoading>
      </LayoutHome>
    ); // Replace LoadingIndicator with your loading UI component
  }

  if (!data) return null;

  const { propertyCoverPaths } = data;
  const { user } = data;

  return (
    <LayoutHome>
      <SwiperComp>
        {propertyCoverPaths?.length > 0 &&
          propertyCoverPaths.map((item, idx) => {
            return (
              <SwiperSlide key={idx}>
                <div className="w-full h-[300px] max-w-[800px] mx-auto">
                  <img
                    className="object-cover w-full h-full rounded-lg shadow-lg cursor-pointer"
                    src={propertyAPI.propertyImage(item)}
                    onClick={(e) => {
                      setOpenModal(true);
                      setClickedIndex(idx);
                    }}
                  />
                </div>
              </SwiperSlide>
            );
          })}
      </SwiperComp>

      <section className="p-5 lg:p-0">
        <div className="justify-center gap-10 lg:flex">
          <PropertyInfo data={data}></PropertyInfo>
          <div className="">
            <div
              className="bottom-0 mx-auto lg:sticky top-24"
              style={{ alignSelf: "flex-start", position: "-webkit-sticky" }}
            >
              <UserCard item={user}></UserCard>
            </div>
          </div>
        </div>
      </section>

      <div className="py-2 bg-slate-200 dark:bg-slate-800 bg-opacity-80">
        <section className="">
          <h3
            className="mx-10 mt-10 text-2xl font-semibold cursor-pointer text-secondary dark:text-white hover:text-green hover:underline"
            onClick={handleNavigatet}
          >
            Similar Properties
          </h3>
          {loading && (
            <div className="flex flex-col gap-2 lg:grid animat lg:grid-cols-4 lg:gap-x-4 lg:gap-y-6">
              {[...Array(4)].map((_, index) => (
                <PropertyCardLoading key={index} />
              ))}
            </div>
          )}
          <div className="p-5">
            <div className="">
              <SwiperComp background="bg-transparent">
                {similarProperties?.length > 0 &&
                  similarProperties.map((item, index) => (
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
      </div>
      <ModalImage isOpen={openModal} onClose={onClose}>
        <img
          className="object-fill w-full h-full rounded-lg"
          src={propertyAPI.propertyImage(propertyCoverPaths[clickedIndex])}
        />
      </ModalImage>
    </LayoutHome>
  );
};
export default PropertyViewPage;
