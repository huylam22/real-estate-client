import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.scss";
import "react-quill/dist/quill.snow.css";

import { Input, TextArea } from "../../components/input";
import { Label } from "../../components/label";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { instance } from "../../api/axios";
import FormGroup from "../../components/common/FormGroup";
import FormRow from "../../components/common/FormRow";
import React, { useEffect, useState } from "react";

import Button from "../../components/button/Button";
import { Dropdown } from "../../components/dropdown";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const legalStatus = ["Owner", "Agent", "Co-Owned"];
const landDirection = ["North", "South", "East", "West"];
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
const PropertyEdit = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { handleSubmit, control, setValue, reset, watch } = useForm();
  const getDropdownLabel = (name, defaultValue = "") => {
    const value = watch(name) || defaultValue;
    return value;
  };

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

  const handleAddNewCampaign = async (values) => {
    delete values["province"];
    delete values["district"];
    try {
      const response = await axiosPrivate.post(
        `api/v1/properties/update/${provinceId}/${districtId}/${auth.user.id}`,
        values
      );
      // console.log(response);
      toast.success("Edit property successfully");
      if (response.status === 201) {
        navigate(`/add-property/${response.data.id}`);
      }
      reset({});
    } catch (error) {
      toast.error("error");
    }
  };

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
      <form onSubmit={handleSubmit(handleAddNewCampaign)}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="propertyPostingStatus">
              Property Posting Title *
            </Label>
            <Input
              control={control}
              name="propertyPostingStatus"
              placeholder="Write a title for your property"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="propertyPrice">Price *</Label>
            <Input
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
              control={control}
              name="propertyAddressNumber"
              placeholder="Address Number: 1, 2, 3"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="propertyAddressStreet">Street *</Label>
            <Input
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
              control={control}
              name="propertyBedrooms"
              placeholder="Bedroom Amount: 1, 2, 3"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="propertyBathrooms">Bathroom(s) *</Label>
            <Input
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
              control={control}
              name="propertyLength"
              placeholder="Length in meter: 100.00"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="propertyWidth">Width (m) *</Label>
            <Input
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
              control={control}
              name="propertyArea"
              placeholder="Area in meter square: 100.00"
            ></Input>
          </FormGroup>
        </FormRow>
        <FormGroup>
          <Label htmlFor="propertyDescription">Short Description *</Label>
          <TextArea
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
          </FormGroup>
          <FormGroup>
            <Label htmlFor="propertyFloorUnits">Property Floor Units *</Label>
            <Input
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
            <Label htmlFor="province">Province*</Label>
            <Dropdown>
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
            <Dropdown>
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
            List your property
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyEdit;
