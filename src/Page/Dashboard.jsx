import react from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transferAccount, setTransferAccount] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [recipientBank, setRecipientBank] = useState("");
  const [currency, setCurrency] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [income, setIncome] = useState(false);

  const transactionHistory = [
    {
      transactionAmount: 200,
      transactionDescription: "Гүйлгээний утга нь бла бла",
      income: true,
    },
    {
      transactionAmount: 200,
      transactionDescription: "Гүйлгээний утга нь бла бла",
      income: false,
    },
  ];

  const bankAccounts = [
    {
      id: 1,
      accountNumber: "20000022001",
      balance: 200000,
    },
  ];

  const banks = [
    {
      id: 1,
      bankName: "Хаан банк",
      value: "khanbank",
    },
    {
      id: 2,
      bankName: "Хас банк",
      value: "khasbank",
    },
    {
      id: 3,
      bankName: "М банк",
      value: "mbank",
    },
  ];

  const submit = (e) => {
    const token = Cookies.get("token");
    e.preventDefault();
    console.log("Form submitted", {
      transferAccount,
      transactionAmount,
      transactionDescription,
      recipientAccount,
      recipientBank,
      currency,
      income,
      token,
    });
  };

  return (
    <>
      <Navbar />
      <section className="bg-[#DDDDDD] h-full">
        <div className="p-32">
          <div className=" flex flex-row justify-center gap-3">
            <div className=" container max-w-screen-md flex flex-col gap-5 ">
              <div className="bg-white rounded-xl shadow-md p-5">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl font-semibold text-gray-800">
                    Дансны мэдээлэл
                  </h1>
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-white bg-blue-500 px-3 py-2 rounded-md transition duration-300 hover:bg-blue-600"
                  >
                    Данс нээх
                  </Link>
                </div>
                <ul className="flex flex-col gap-5">
                  {bankAccounts.map((account) => (
                    <div className="bg-gray-200 rounded-md p-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                          <span className="font-semibold">Дансны дугаар</span>
                          <span>{account.accountNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Дансны үлдэгдэл</span>
                          <span>{account.balance} төгрөг</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <h1 className="text-lg font-semibold mb-4">Гүйлгээний түүх</h1>
                <ul className="divide-y divide-gray-200">
                  {transactionHistory.map((transaction) => (
                    <li
                      key={transaction.id}
                      className="py-2 flex justify-between"
                    >
                      <div className="flex flex-col">
                        <div className="flex">
                          <span className="text-sm">2024/12/16 -</span>
                          <span className="text-sm">13:00</span>
                        </div>
                        <span className="font-semibold">
                          {transaction.transactionDescription}
                        </span>
                      </div>
                      <span
                        className={
                          transaction.income
                            ? "text-[#8DECB4]"
                            : "text-[#FC4100]"
                        }
                      >
                        {transaction.transactionAmount} төгрөг
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Section */}

            {/* Main content */}
            <div className="container">
              <div className="max-w-screen-sm mx-auto rounded-xl p-8 shadow-lg bg-white">
                <h2 className="text-4xl font-light text-[#33363b] py-5 text-center">
                  Гүйлгээ
                </h2>
                <form className="space-y-6" action="#" method="POST">
                  {/* Transfer Account Select */}
                  <div>
                    <label
                      htmlFor="transferAccount"
                      className="block text-lg font-semibold leading-6 text-[#33363b]"
                    >
                      Шилжүүлэх дансаа сонгох
                    </label>
                    <div className="mt-2">
                      <select
                        id="transferAccount"
                        name="transferAccount"
                        onChange={(e) => {
                          setTransferAccount(e.target.value);
                        }}
                        className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-lg"
                      >
                        <option value="null">сонгох</option>
                        {bankAccounts.map((account) => (
                          <option
                            key={account.id}
                            value={account.accountNumber}
                          >
                            {account.accountNumber} данс {account.balance}{" "}
                            төгрөг
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="recipientBank"
                      className="block text-lg font-semibold leading-6 text-[#33363b]"
                    >
                      Хүлээн авах банк
                    </label>
                    <div className="mt-2">
                      <select
                        id="recipientBank"
                        name="recipientBank"
                        onChange={(e) => setRecipientBank(e.target.value)}
                        className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-lg"
                      >
                        <option value="null">сонгох</option>
                        {banks.map((bank) => (
                          <option key={bank.id} value={bank.value}>
                            {bank.bankName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* User Name Input */}
                  <div>
                    <label
                      htmlFor="recipientAccount"
                      className="block text-lg font-semibold leading-6 text-[#33363b]"
                    >
                      Хүлээн авах данс
                    </label>
                    <div className="mt-2">
                      <input
                        id="recipientAccount"
                        name="recipientAccount"
                        type="text"
                        autoComplete="username"
                        required
                        onChange={(e) => {
                          setRecipientAccount(e.target.value);
                        }}
                        className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-lg"
                      />
                    </div>
                  </div>
                  {/* Password Input */}
                  <div>
                    <label
                      htmlFor="recipientName"
                      className="block text-lg font-semibold leading-6 text-[#33363b]"
                    >
                      Хүлээн авагчийн нэр
                    </label>
                    <div className="mt-2">
                      <input
                        id="recipientName"
                        name="recipientName"
                        type="text"
                        autoComplete="name"
                        className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-lg"
                      />
                    </div>
                  </div>
                  {/* Transaction Amount Input */}
                  <div className="flex justify-between">
                    <div className="w-full">
                      <label
                        htmlFor="transactionAmount"
                        className="block text-lg font-semibold leading-6 text-[#33363b]"
                      >
                        Гүйлгээний дүн
                      </label>
                      <div className="mt-2">
                        <input
                          id="transactionAmount"
                          name="transactionAmount"
                          type="number"
                          onChange={(e) => {
                            setTransactionAmount(e.target.value);
                          }}
                          className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-lg"
                        />
                      </div>
                    </div>
                    <div className="ml-4 w-1/3">
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
                          onChange={(e) => {
                            setCurrency(e.target.value);
                          }}
                          className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-lg"
                        >
                          <option value="MNT">Сонгох</option>
                          <option value="MNT">MNT</option>
                          <option value="EUR">EUR</option>
                          <option value="USD">USD</option>
                          <option value="GBP">GBP</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="transactionDescription"
                      className="block text-lg font-semibold leading-6 text-[#33363b]"
                    >
                      Гүйлгээний утга
                    </label>
                    <div className="mt-2">
                      <input
                        id="transactionDescription"
                        name="transactionDescription"
                        type="text"
                        onChange={(e) => {
                          setTransactionDescription(e.target.value);
                        }}
                        className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-lg"
                      />
                    </div>
                  </div>
                  {/* submit button */}
                  <div>
                    <button
                      type="submit"
                      onClick={submit}
                      className="flex w-full justify-center rounded-md bg-blue-500 hover:bg-blue-600 px-4 py-2 text-lg font-medium leading-6 text-white shadow-sm duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Гүйлгээ хийх
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="flex w-full justify-center rounded-md bg-blue-500 hover:bg-blue-600 px-4 py-2 text-lg font-medium leading-6 text-white shadow-sm duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <Link to="/login">Захиалгат гүйлгээ хийх</Link>
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
export default Dashboard;
