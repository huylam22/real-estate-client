import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";
import "./date-picker.scss";

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { instance } from "../../api/axios";
import { propertyAPI } from "../../api/propertyApi";
import Button from "../../components/button/Button";
import FormGroup from "../../components/common/FormGroup";
import FormRow from "../../components/common/FormRow";
import { Dropdown } from "../../components/dropdown";
import { Input, TextArea } from "../../components/input";
import { Label } from "../../components/label";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const legalStatus = [
  "HĐ Mua bán",
  "Sổ hồng",
  "Sổ đỏ",
  "Giấy chứng nhận quyền sử dụng đất",
  "Giấy phép xây dựng",
  "Giấy phép kinh doanh",
  "Giấy tờ khác",
];

const landDirection = [
  "North",
  "Northeast",
  "East",
  "Southeast",
  "South",
  "Southwest",
  "West",
  "Northwest",
];

const landType = [
  "Apartment",
  "House",
  "Villa",
  "Land",
  "Office",
  "Shop",
  "Warehouse",
  "Factory",
  "Hotel",
  "Resort",
  "Other",
];

const schema = yup.object({
  propertyPostingStatus: yup.string().required("Posting Title is required"),
  propertyPrice: yup
    .number()
    .typeError("Price must be a valid number")
    .required("Price is required"),
  propertyAddressNumber: yup.string().required("Address Number is required"),
  propertyAddressStreet: yup.string().required("Address Street is required"),
  propertyBedrooms: yup
    .number()
    .integer("Bedrooms must be an integer")
    .typeError("Bedrooms must be a valid number")
    .required("Bedrooms is required"),
  propertyBathrooms: yup
    .number()
    .integer("Bathroom(s) must be an integer")
    .typeError("Bathroom(s) must be a valid number")
    .required("Bathroom(s) is required"),
  propertyLength: yup
    .number()
    .typeError("Length must be a valid number")
    .required("Length is required"),
  propertyWidth: yup
    .number()
    .typeError("Width must be a valid number")
    .required("Width is required"),
  propertyArea: yup
    .number()
    .typeError("Area must be a valid number")
    .required("Area is required"),
  propertyDescription: yup.string().required("Description is required"),
  propertyLandLegalStatus: yup.string().required("Legal Status is required"),

  propertyLandDirection: yup.string().required("Land Direction is required"),
  propertyLandType: yup.string().required("Land Type is required"),
});
const PropertyEdit = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const getDropdownLabel = (name, defaultValue = "") => {
    const value = watch(name) || defaultValue;
    return value;
  };
  const { propertyId } = useParams();

  const getDropdownLabelRegions = (name, defaultValue = "") => {
    const value = watch(name) || defaultValue;
    return value;
  };
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [provinceId, setProvinceId] = useState(0);
  const [propertyLandType, setPropertyLandType] = useState("");
  const [districtId, setDistrictId] = useState(0);
  const [placeholderOption, setPlaceholderOption] = useState("Select");

  const handleEditPropety = async (values) => {
    delete values["province"];
    delete values["district"];
    console.log(propertyId);
    try {
      const response = await axiosPrivate.put(
        `api/v1/property/update/${propertyId}`,
        values
      );
      // console.log(response);
      toast.success("Edit property successfully");
      if (response.status === 200) {
        navigate(`/add-property/images/${response.data.id}`);
      }
      reset({});
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    async function getPropertyDetail() {
      try {
        const res = await axios.get(propertyAPI.getPropertyDetail(propertyId));
        setValue("propertyPostingStatus", res.data.propertyPostingStatus);
        setValue("propertyPrice", res.data.propertyPrice);
        setValue("propertyAddressNumber", res.data.propertyAddressNumber);
        setValue("propertyAddressStreet", res.data.propertyAddressStreet);
        setValue("propertyBedrooms", res.data.propertyBedrooms);
        setValue("propertyBathrooms", res.data.propertyBathrooms);
        setValue("propertyLength", res.data.propertyLength);
        setValue("propertyWidth", res.data.propertyWidth);
        setValue("propertyArea", res.data.propertyArea);
        setValue("propertyDescription", res.data.propertyDescription);
        setValue("propertyLandLegalStatus", res.data.propertyLandLegalStatus);
        setValue("propertyLandDirection", res.data.propertyLandDirection);
        setValue("propertyLandType", res.data.propertyLandType);
        setValue("propertyFloorUnits", res.data.propertyFloorUnits);
        setValue("province", res.data.provinceName);
        setValue("district", res.data.districtName);
        setProvinceId(res.data.provinceId);
      } catch (error) {
        console.log(error);
        navigate("/404");
      }
    }
    getPropertyDetail();
  }, []);

  const handleSelectDropdownOption = (name, value) => {
    setValue(name, value);
    setPlaceholderOption(value);
  };
  const handleSelectProvinceDropdownOption = (name, value, id) => {
    setValue(name, value);
    setPlaceholderOption(value);
    setProvinceId(id);
  };

  const handleSelectDistrictDropdownOption = (name, value, id) => {
    setValue(name, value);
    setPlaceholderOption(value);
    setDistrictId(id);
  };

  useEffect(() => {
    async function fetchRegions() {
      try {
        if (auth.accessToken === "") return;
        const response = await instance.get("api/v1/provinces");
        setProvinces(response.data);
        if (provinceId === 0) return;
        const districts = await instance.get(
          `api/v1/districts/details/province/${provinceId}`
        );
        setDistricts(districts.data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchRegions();
  }, [provinceId]);

  return (
    <div className="bg-white dark:bg-inherit rounded-xl py-10 px-[66px]">
      <div className="text-center">
        <h1 className="py-4 font-bold  px-14 text-text2 bg-text4 dark:bg-softDark dark:text-white bg-opacity-5 rounded-xl text-[25px] inline-block mb-10">
          Edit Your Property 🏠🏡
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleEditPropety)}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="propertyPostingStatus">
              Property Posting Title *
            </Label>

            <Input
              error={errors.propertyPostingStatus?.message}
              register={"propertyPostingStatus"}
              control={control}
              name="propertyPostingStatus"
              placeholder="Write a title for your property"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="propertyPrice">Price *</Label>
            <Input
              error={errors.propertyPrice?.message}
              register={"propertyPrice"}
              control={control}
              name="propertyPrice"
              placeholder="VND 0.00 tỷ"
            ></Input>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label htmlFor="propertyAddressNumber">Address Number *</Label>
            <Input
              error={errors.propertyAddressNumber?.message}
              register={"propertyAddressNumber"}
              control={control}
              name="propertyAddressNumber"
              placeholder="Address Number: 1, 2, 3"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="propertyAddressStreet">Street *</Label>
            <Input
              error={errors.propertyAddressStreet?.message}
              control={control}
              name="propertyAddressStreet"
              placeholder="Street: Nguyen Van Linh"
            ></Input>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label htmlFor="propertyBedrooms">Bedroom(s) *</Label>
            <Input
              error={errors.propertyBedrooms?.message}
              control={control}
              name="propertyBedrooms"
              placeholder="Bedroom Amount: 1, 2, 3"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="propertyBathrooms">Bathroom(s) *</Label>
            <Input
              error={errors.propertyBathrooms?.message}
              register={"propertyBathrooms"}
              control={control}
              name="propertyBathrooms"
              placeholder="Bathroom Amount: 1, 2, 3"
            ></Input>
          </FormGroup>
        </FormRow>
        <FormRow grid="grid-cols-3">
          <FormGroup>
            <Label htmlFor="propertyLength">Length (m) *</Label>
            <Input
              error={errors.propertyLength?.message}
              register={"propertyLength"}
              control={control}
              name="propertyLength"
              placeholder="Length in meter: 100.00"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="propertyWidth">Width (m) *</Label>
            <Input
              error={errors.propertyWidth?.message}
              ergister={"propertyWidth"}
              control={control}
              name="propertyWidth"
              placeholder="Length in meter: 100.00"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="propertyArea">
              Area (m<sup>2</sup>) *
            </Label>
            <Input
              error={errors.propertyArea?.message}
              register={"propertyArea"}
              control={control}
              name="propertyArea"
              placeholder="Area in meter square: 100.00"
            ></Input>
          </FormGroup>
        </FormRow>
        <FormGroup>
          <Label htmlFor="propertyDescription">Short Description *</Label>
          <TextArea
            error={errors.propertyDescription?.message}
            register={"propertyDescription"}
            name="propertyDescription"
            placeholder="Write a short description for your listing"
            control={control}
          ></TextArea>
          <p className="text-sm text-left text-text3">
            Recommend includes area utilities, interior, and description of the
            property users understand more about the listing
          </p>
        </FormGroup>
        <FormRow>
          <FormGroup>
            <Label htmlFor="propertyLandLegalStatus">Legal Status *</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={getDropdownLabel(
                  "propertyLandLegalStatus",
                  "Select your property legal status"
                )}
              ></Dropdown.Select>
              <Dropdown.List>
                {legalStatus &&
                  legalStatus.map((item, idx) => (
                    <Dropdown.Option
                      key={idx}
                      onClick={() =>
                        handleSelectDropdownOption(
                          "propertyLandLegalStatus",
                          item
                        )
                      }
                    >
                      {item}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            <span className="text-sm text-error">
              {errors.propertyLandLegalStatus?.message}
            </span>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="propertyLandLegalStatus">Land Direction *</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={getDropdownLabel(
                  "propertyLandDirection",
                  "Select your property land direction"
                )}
              ></Dropdown.Select>
              <Dropdown.List>
                {landDirection &&
                  landDirection.map((item, idx) => (
                    <Dropdown.Option
                      key={idx}
                      onClick={() =>
                        handleSelectDropdownOption(
                          "propertyLandDirection",
                          item
                        )
                      }
                    >
                      {item}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            <span className="text-sm text-error">
              {errors.propertyLandDirection?.message}
            </span>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label htmlFor="propertyLandType">Property Type *</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={getDropdownLabel(
                  "propertyLandType",
                  "Select your property land type"
                )}
              ></Dropdown.Select>
              <Dropdown.List>
                {landType &&
                  landType.map((item, idx) => (
                    <Dropdown.Option
                      key={idx}
                      onClick={() => {
                        handleSelectDropdownOption("propertyLandType", item);
                        setPropertyLandType(item);
                      }}
                    >
                      {item}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            <span className="text-sm text-error">
              {errors.propertyLandType?.message}
            </span>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="propertyFloorUnits">Property Floor Units </Label>
            <Input
              register={"propertyFloorUnits"}
              control={control}
              name="propertyFloorUnits"
              placeholder={"Property Floor Units: 1, 2, 3"}
            ></Input>
            <p className="text-sm text-left text-text3">
              If your property is a house, please enter the number of floors
              (ground floor + floors). If your property is an apartment, please
              enter the number of floors of the apartment building
            </p>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="province">Province *</Label>
            <p className="text-sm text-left text-error">
              Province is unable to update at the moment*
            </p>
            <Dropdown className="pointer-events-none">
              <Dropdown.Select
                placeholder={getDropdownLabelRegions(
                  "province",
                  "Select Province"
                )}
              ></Dropdown.Select>
              <Dropdown.List>
                {provinces.length > 0 &&
                  provinces.map((item) => (
                    <Dropdown.Option
                      key={item?.id}
                      onClick={() =>
                        handleSelectProvinceDropdownOption(
                          "province",
                          item?.provinceName,
                          item?.id
                        )
                      }
                    >
                      {item?.provinceName}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="district">District *</Label>
            <p className="text-sm text-left text-error">
              District is unable to update at the moment*
            </p>
            <Dropdown className="pointer-events-none">
              <Dropdown.Select
                placeholder={getDropdownLabelRegions(
                  "district",
                  "Select District"
                )}
              ></Dropdown.Select>
              <Dropdown.List>
                {districts &&
                  districts.map((item, idx) => (
                    <Dropdown.Option
                      key={idx}
                      onClick={() =>
                        handleSelectDistrictDropdownOption(
                          "district",
                          item.districtName,
                          item.id
                        )
                      }
                    >
                      {item.districtName}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          </FormGroup>
        </FormRow>

        <div className="mt-10 text-center">
          <Button
            type="submit"
            kind="primary"
            className="lg:w-[200px] w-full mx-auto"
          >
            Edit your property
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyEdit;
