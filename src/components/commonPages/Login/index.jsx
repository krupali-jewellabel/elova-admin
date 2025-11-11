"use client";
import { Card, CardContent } from "@/components/common/ui/cards/card";
import React from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="grid lg:grid-cols-2 grow h-screen">
      <div
        className="lg:rounded-xl lg:border lg:border-gray-200 lg:m-5 order-1  bg-top xxl:bg-center xl:bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/images/login/signin-bg.png')",
        }}
      >
        <div className="flex flex-col p-8 lg:p-16 gap-4">
          <div>
            <img
              src={"/app/elova-jewel.png"}
              alt="logo"
              className="xl:w-[300px] w-[230px]"
            />
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold text-gray-900">
              Welcome to Jewel Label Admin
            </h3>
            <div className="text-base font-medium text-gray-600">
              Your complete jewelry business infrastructure. <br />
              Manage products, orders, vendors, and more — <br />
              all in one place.
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center p-8 lg:p-10 order-2">
        <Card className="w-full max-w-[400px]">
          <CardContent className="p-6">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
