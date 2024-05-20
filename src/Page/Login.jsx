import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

import Cookies from "js-cookie";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/user/login", {
        userName,
        password,
      });
      const result = res;

      if (result.data.message === "passwordCorrected") {
        console.log(res.data);
        const token = res.data.token;
        const expirationTime = new Date(new Date().getTime() + 60 * 60 * 1000);
        Cookies.set("token", token, { expires: expirationTime });
        alert("Амжилттай нэвтрэлээ");
        window.location.href = "/dashboard";
      } else if (result.data.message === "passwordInCorrect") {
        alert("нууц үг тохирохгүй байна");
      } else {
        alert("Хэрэглэгч олдсонгүй");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="relative flex h-full flex-1 flex-col justify-center px-6 py-32 lg:px-8 m-10 ">
        <div className="">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-3xl font-semi leading-9 tracking-tight text-[#33363b]">
              Интернет банк
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm  rounded-xl">
            <form className="space-y-3" action="#" method="POST">
              <div>
                <label
                  htmlFor="text"
                  className="block text-md font-semi leading-6 text-[#33363b]"
                >
                  Нэвтрэх нэр
                </label>
                <div className="mt-2">
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    autoComplete="test"
                    required
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-[#33363b] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#007f73]sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-md font-semi leading-6 text-[#33363b]"
                  >
                    Нууц үг
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-[#33363b] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#007f73] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={submit}
                  className="flex w-full justify-center rounded-md bg-[#3C5B6F] hover:text-[#3C5B6F] px-3 py-1.5 text-sm font-regular leading-6 text-white shadow-sm hover:bg-[#DFD0B8] duration-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Нэвтрэх
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Бүртгэл байгаа эсэх ?{" "}
              <Link
                to={"/signup"}
                className="font-semibold leading-6 text-[#4A4E69] hover:text-[#22223B] duration-100"
              >
                Бүртгүүлэх
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
