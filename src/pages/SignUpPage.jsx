import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
import Button from "../components/button/Button";
import ButtonGoogle from "../components/button/ButtonGoogle";
import { Checkbox } from "../components/checkbox";
import FormGroup from "../components/common/FormGroup";
import { IconEyeToggle } from "../components/icon";
import { Input } from "../components/input";
import { Label } from "../components/label";
import useToggleValue from "../hooks/useToggleValue";
import LayoutAuthentication from "../layouts/LayoutAuthentication";
import { authRegister } from "../store/auth/auth-slice";

const schema = yup.object({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignUpPage = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const dispatch = useDispatch();
  const handleSignUp = (data) => {
    dispatch(authRegister(data));
    console.log("sign up");
  };
  const { value: acceptTerm, handleToggleValue: handleToggleTerm } =
    useToggleValue();
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();

  return (
    <LayoutAuthentication heading="Sign Up">
      <p className="mb-6 text-xs font-normal text-center lg:text-sm text-text3 lg:mb-8">
        Already have an account?{" "}
        <Link to="/sign-in" className="font-medium underline text-green">
          Sign in
        </Link>
      </p>
      <ButtonGoogle></ButtonGoogle>
      <p className="mb-4 text-xs font-normal text-center lg:text-sm lg:mb-8 text-text2 dark:text-white">
        Or sign up with email
      </p>

      <form onSubmit={handleSubmit(handleSignUp)}>
        <FormGroup>
          <Label htmlFor="firstname"> First Name *</Label>
          <Input
            text="text-white"
            control={control}
            name="firstname"
            placeholder="Van A"
            error={errors.firstname?.message}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastname"> Last Name *</Label>
          <Input
            text="text-white"
            control={control}
            name="lastname"
            placeholder="Nguyen"
            error={errors.name?.message}
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email"> Email *</Label>
          <Input
            text="text-white"
            control={control}
            type="email"
            name="email"
            placeholder="example@gmail.com"
            error={errors.email?.message}
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password"> Password *</Label>
          <Input
            text="text-white"
            control={control}
            type={`${showPassword ? "text" : "password"}`} // show password
            name="password"
            placeholder="Create a password"
            error={errors.password?.message}
          >
            <IconEyeToggle
              open={showPassword}
              onClick={handleTogglePassword}
            ></IconEyeToggle>
          </Input>
        </FormGroup>
        <div className="flex items-start mb-5 gap-x-5">
          <Checkbox name="term" checked={acceptTerm} onClick={handleToggleTerm}>
            <p className="flex-1 text-xs lg:text-sm text-text2 dark:text-text3">
              I agree to the{" "}
              <span className="underline text-green">Terms of Use </span>
              and have read and understand the{" "}
              <span className="underline text-green"> Privacy policy.</span>
            </p>
          </Checkbox>
        </div>

        <Button className="w-full" kind="primary" type="submit">
          Create my account
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignUpPage;
