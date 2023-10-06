import React from "react";
import { useForm } from "react-hook-form";
import LayoutAuthentication from "../layouts/LayoutAuthentication";
import ButtonGoogle from "../components/button/ButtonGoogle";
import { Link } from "react-router-dom";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { IconEyeToggle } from "../components/icon";
import FormGroup from "../components/common/FormGroup";
import useToggleValue from "../hooks/useToggleValue";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../components/button/Button";
import { useDispatch } from "react-redux";
import { authLogin } from "../store/auth/auth-slice";

const schema = yup.object({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignInPage = () => {
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
  const handleSignIn = (data) => {
    dispatch(authLogin(data));
  };

  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();

  return (
    <LayoutAuthentication heading="Welcome back!">
      <p className="mb-6 text-xs font-normal text-center lg:text-sm text-text3 lg:mb-8">
        Don't have an account?{" "}
        <Link to="/sign-up" className="font-medium underline text-green">
          Sign Up
        </Link>
      </p>
      <ButtonGoogle text="Sign in with Google"></ButtonGoogle>
      <p className="mb-4 text-xs font-normal text-center lg:text-sm lg:mb-8 text-text2 dark:text-white">
        Or sign in with email
      </p>

      <form onSubmit={handleSubmit(handleSignIn)}>
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

        <Button className="w-full" kind="primary" type="submit">
          Login
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignInPage;
