import react from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Cookies from "js-cookie";

const FrequencyTransaction = () => {
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transferAccount, setTransferAccount] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [recipientBank, setRecipientBank] = useState("");
  const [currency, setCurrency] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [income, setIncome] = useState(false);
  const [banks, setBanks] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [frequency, setFrequency] = useState([]);
  const token = Cookies.get("token");

  async function transaction(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/frequencytransaction/",
        {
          transferAccount,
          transactionAmount,
          transactionDescription,
          recipientAccount,
          recipientBank,
          startDate,
          endDate,
          currency,
          frequency,
          income,
          token,
        }
      );
      const result = res;

      if (result.data.message === "TransactionSuccessful") {
        console.log(res.data);
        alert("Захиалгат гүйлгээ амжилттай");
        window.location.href = "/dashboard";
      } else if (result.data.message === "AccountNotFound") {
        alert("Хүлээн авах данс байхгүй байна");
      } else if (result.data.message === "Insufficient") {
        alert("Үлдэгдэл хүрэлцэхгүй байна");
      } else {
        alert("Алдаа гарлаа");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  // GET USER DATA
  useEffect(() => {
    if (!token) {
      console.error("No token found in cookies");
      return;
    }

    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:8080/user/userdata`, {
          params: { token },
        });
        const userData = res.data;
        console.log(userData);
        setBankAccounts(userData.accounts);
        setTransactionHistory(userData.frequencies);

        setBanks(
          userData.accounts.map((account) => ({
            id: account.bankID,
            bankName: account.bankName,
            value: account.bankID.toLowerCase(),
          }))
        );
      } catch (error) {
        console.error("Error during data retrieval:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <section className="bg-[#f4f4f4] h-full">
        <div className="relative px-32 py-10">
          <div className=" flex flex-row justify-center gap-3">
            <div className=" container max-w-screen-md flex flex-col gap-5 ">
              <div className="bg-white rounded-xl shadow-md p-5">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl font-semi text-gray-800">
                    Дансны мэдээлэл
                  </h1>
                  <Link
                    to="/bankaccount"
                    className="text-sm font-semi text-white bg-blue-500 px-3 py-2 rounded-md transition duration-300 hover:bg-blue-600"
                  >
                    Данс нээх
                  </Link>
                </div>
                <ul className="flex flex-col gap-5">
                  {bankAccounts.map((account) => (
                    <div className="bg-gray-200 rounded-md p-4 font-light ">
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                          <span className="">Данс</span>
                          <span>{account.bankName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="">Дансны дугаар</span>
                          <span>{account.accountID}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="">Дансны үлдэгдэл</span>
                          <span>
                            {account.balance} {account.currency}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <h1 className="text-md font-semi mb-4">
                  Захиалгат гүйлгээнүүд
                </h1>
                <ul className="divide-y divide-gray-200">
                  {transactionHistory.map((transaction) => (
                    <li
                      key={transaction.id}
                      className="py-2 flex justify-between text-sm"
                    >
                      <div className="flex flex-col gap-1">
                        <div>
                          <span className="text-[#799351]">
                            {transaction.active ? "Идэвхтэй" : "Идэвхгүй"}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="text-sm text-[#006769]">
                            {transaction.transactionDate}
                          </span>
                        </div>
                        <span>
                          Хүлээн авагч данс : {transaction.recipientAccount}
                        </span>

                        <span className="font-light">
                          {transaction.frequency ? (
                            <span>
                              Давтамж: {transaction.frequency}
                              <span> бүр</span>
                            </span>
                          ) : (
                            <span>
                              Хүлээн авсан данс : {transaction.recipientAccount}
                            </span>
                          )}
                        </span>
                        <span>Эхэлсэн огноо : {transaction.startDate}</span>
                        <span>Дуусах огноо : {transaction.endDate}</span>
                        <span className="font-semi">
                          <span className="font-light ">Гүйлгээний утга :</span>
                          {transaction.transactionDescription}
                        </span>
                        <span
                          className={
                            transaction.income
                              ? "text-[#33363b]"
                              : "text-[#33363b]"
                          }
                        >
                          Тогтмол : {transaction.frequencyAmount} төгрөг
                        </span>
                      </div>
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
                  Захиалгат гүйлгээ
                </h2>
                <form className="space-y-4" action="#" method="POST">
                  <div>
                    <label
                      htmlFor="transferAccount"
                      className="block text-md font-semi leading-6 text-[#33363b]"
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
                        className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-md"
                      >
                        <option value="null">сонгох</option>
                        {bankAccounts.map((account) => (
                          <option
                            key={account.id}
                            value={account.accountNumber}
                          >
                            {account.accountID}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="recipientBank"
                      className="block text-md font-semi leading-6 text-[#33363b]"
                    >
                      Хүлээн авах банк
                    </label>
                    <div className="mt-2">
                      <select
                        id="recipientBank"
                        name="recipientBank"
                        value={recipientBank}
                        onChange={(e) => {
                          setRecipientBank(e.target.value);
                        }}
                        className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-md"
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
                  {/* User Name Input */}
                  <div>
                    <label
                      htmlFor="recipientAccount"
                      className="block text-md font-semi leading-6 text-[#33363b]"
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
                        className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-md"
                      />
                    </div>
                  </div>
                  {/* Password Input */}
                  <div>
                    <label
                      htmlFor="recipientName"
                      className="block text-md font-semi leading-6 text-[#33363b]"
                    >
                      Хүлээн авагчийн нэр
                    </label>
                    <div className="mt-2">
                      <input
                        id="recipientName"
                        name="recipientName"
                        type="text"
                        autoComplete="name"
                        className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-md"
                      />
                    </div>
                  </div>
                  {/* Transaction Amount Input */}
                  <div className="flex justify-between">
                    <div className="w-full">
                      <label
                        htmlFor="transactionAmount"
                        className="block text-md font-semi leading-6 text-[#33363b]"
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
                          className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-md"
                        />
                      </div>
                    </div>
                    <div className="ml-4 w-1/3">
                      <label
                        htmlFor="currency"
                        className="block text-md font-semi leading-6 text-[#33363b]"
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
                          className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-md"
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
                      className="block text-md font-semi leading-6 text-[#33363b]"
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
                        className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-md font-semi leading-6 text-[#33363b]"
                    >
                      Эхлэх огноо
                    </label>
                    <input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-md"
                    />
                  </div>
                  {/* End Date Input */}
                  <div>
                    <label
                      htmlFor="endDate"
                      className="block text-md font-semi leading-6 text-[#33363b]"
                    >
                      Дуусах огноо
                    </label>
                    <input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="frequency"
                      className="block text-md font-semi leading-6 text-[#33363b]"
                    >
                      Гүйлгээний давтамж
                    </label>
                    <select
                      id="frequency"
                      name="frequency"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 text-md"
                    >
                      <option value="">Сонгох</option>
                      <option value="өдөр">Хоногийн</option>
                      <option value="сар">Сарын</option>
                    </select>
                  </div>
                  {/* submit button */}
                  <div>
                    <button
                      type="submit"
                      onClick={transaction}
                      className="flex w-full justify-center rounded-md bg-blue-500 hover:bg-blue-600 px-4 py-2 text-md font-medium leading-6 text-white shadow-sm duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Гүйлгээ хийх
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
export default FrequencyTransaction;