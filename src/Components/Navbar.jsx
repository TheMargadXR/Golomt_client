import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const callsToAction = [];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || null);

  const exit = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <header className="bg-[#496989] z-1">
      <nav
        className="mx-auto flex h-full max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            to="/"
            className="-m-1.5 p-1.5 font-thin text-[#f4f4f4] leading-6 text-2xl"
          >
            Bank
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4"></div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-md font-regular leading-6 text-[#f4f4f4] hover:text-[#DFD0B8] duration-150 hover:font-normal"
              >
                Гүйлгээ
              </Link>
              <Link
                to="/FrequencyTransaction"
                className="text-md font-regular leading-6 text-[#f4f4f4] hover:text-[#DFD0B8] duration-150 hover:font-normal"
              >
                Захиалгах гүйлгээ
              </Link>
            </>
          ) : (
            <></>
          )}
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {token ? (
            <>
              <Link
                to={`/dashboard`}
                className="font-thin leading-6 text-[#f4f4f4] duration-200 bg-blue-500 px-3 py-2.5 rounded-md transition duration-300 hover:bg-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </Link>
              <button onClick={exit}>
                <Link
                  to="/" // Change this to the desired exit/logout page
                  className="font-regular leading-6 text-[#f4f4f4] bg-blue-500 px-3 py-3 rounded-md transition duration-300 hover:bg-blue-600 ml-2" // Added ml-2 for some spacing between buttons
                >
                  Гарах
                </Link>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="font-regular leading-6 text-[#f4f4f4]  bg-blue-500 px-3 py-2 rounded-md duration-300 hover:bg-blue-600 hover:text-[#3C5B6F]"
            >
              Нэвтрэх
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#153448] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between bg-[#153448]">
            <Link to="/" className="-m-1.5 p-1.5 text-[#f4f4f4]">
              Bank
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Panel className="mt-2 space-y-2"></Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                {token ? (
                  <>
                    <Link
                      to={`/dashboard`}
                      className="font-thin leading-6 text-[#f4f4f4] duration-200 bg-blue-500 px-3 py-2.5 rounded-md transition duration-300 hover:bg-blue-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                    </Link>
                    <button onClick={exit}>
                      <Link
                        to="/" // Change this to the desired exit/logout page
                        className="font-regular leading-6 text-[#f4f4f4] bg-blue-500 px-3 py-3 rounded-md transition duration-300 hover:bg-blue-600 ml-2" // Added ml-2 for some spacing between buttons
                      >
                        Гарах
                      </Link>
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <div className="py-6">
                {token ? (
                  <Link
                    to={`/dashboard`}
                    className="font-thin leading-6 text-[#f4f4f4] duration-200 bg-[#4A4E69] px-3 py-2 rounded-md hover:bg-[#22223B]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="font-regular leading-6 text-[#f4f4f4]  bg-blue-500 px-3 py-2 rounded-md duration-300 hover:bg-blue-600 hover:text-[#3C5B6F]"
                  >
                    Нэвтрэх
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
