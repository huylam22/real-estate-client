import React, { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FormRow from "../../components/common/FormRow";
import FormGroup from "../../components/common/FormGroup";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import Button from "../../components/button/Button";

const UserInfoInput = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { handleSubmit, control, setValue, reset, watch, register } = useForm();
  useEffect(() => {
    setValue("firstname", auth.user.firstname);
    setValue("lastname", auth.user.lastname);
  }, []);
  const handleEditProfile = (values) => {
    console.log("edit profile", values);
  };
  return (
    <div className="mx-auto w-full dark:bg-darkSecondary bg-whiteSoft max-w-[800px] mt-10 border dark:border-white border-primary p-6 rounded-2xl">
      <div className="text-center">
        <h1 className="py-4 font-bold  px-14 text-text2 bg-text4 dark:bg-softDark dark:text-white bg-opacity-5 rounded-xl text-[25px] inline-block mb-10">
          Your Profile Info 📌
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleEditProfile)}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="firstname">First Name*</Label>
            <Input
              disabled
              register={"firstname"}
              control={control}
              name="firstname"
              placeholder="First Name: Van A"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastname">Last Name *</Label>
            <Input
              disabled
              register={"lastname"}
              control={control}
              name="lastname"
              placeholder="Last Name: Nguyen"
            ></Input>
          </FormGroup>
        </FormRow>
        <div className="mt-10 text-center">
          <Button
            disabled
            type="submit"
            kind="primary"
            className="lg:w-[200px] w-full mx-auto"
          >
            Submit Your New Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserInfoInput;
