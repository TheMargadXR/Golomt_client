import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Cookies from "js-cookie";
import axios from "axios";

const BankAccountCreate = () => {
  const [currency, setCurrency] = useState("");
  const [bankName, setBankName] = useState("");
  const token = Cookies.get("token");

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/user/account", {
        token,
        bankName,
        currency,
      });
      const result = res;
      console.log(currency);
      console.log(bankName);
      console.log(token);
      if (result.data.message === "successAccountCreated") {
        alert("Амжилттай данс үүслээ");
        window.location.href = "/dashboard";
      } else if (result.data.message === "tokenNull") {
        alert("Алдаа гарлаа");
      } else {
        alert("Хэрэглэгч олдсонгүй");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  return (
    <>
      <Navbar />
      <section className="bg-[#DDDDDD] h-screen">
        <div className="p-32">
          <div className="flex flex-row justify-center gap-3">
            <div className="container">
              <div className="max-w-screen-sm mx-auto rounded-xl p-8 shadow-lg bg-white">
                <h2 className="text-4xl font-light text-[#33363b] py-5 text-center">
                  Банкны данс нээх
                </h2>
                <form className="space-y-6" onSubmit={submit}>
                  <div className="ml-4 w-full/2">
                    <label
                      htmlFor="bankName"
                      className="block text-lg font-semibold leading-6 text-[#33363b]"
                    >
                      Банк сонгох
                    </label>
                    <div className="mt-2">
                      <select
                        id="bankName"
                        name="bankName"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-lg"
                      >
                        <option value="">Сонгох</option>
                        <option value="Хаан банк">Хаан банк</option>
                        <option value="Хас банк">Хас банк</option>
                        <option value="Голомт банк">Голомт банк</option>
                        <option value="Худалдаа хөгжилийн банк">
                          Худалдаа хөгжилийн банк
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="ml-4 w-full/2">
                    <label
                      htmlFor="currency"
                      className="block text-lg font-semibold leading-6 text-[#33363b]"
                    >
                      Валют
                    </label>
                    <div className="mt-2">
                      <select
                        id="currency"
                        name="currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-lg"
                      >
                        <option value="">Сонгох</option>
                        <option value="MNT">MNT</option>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-blue-500 hover:bg-blue-600 px-4 py-2 text-lg font-medium leading-6 text-white shadow-sm duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Данс нээх
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BankAccountCreate;
