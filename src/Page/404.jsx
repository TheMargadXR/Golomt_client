import react from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const notFound = () => {
  return (
    <>
      <Navbar />
      <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-5xl font-semibold text-[#22223B]">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Хуудас олдсонгүй
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Уучлаарай, бид таны хайж буй хуудсыг олж чадсангүй.{" "}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="font-thin leading-6 text-[#f4f4f4] duration-200 bg-[#4A4E69] px-3 py-2 rounded-md hover:bg-[#22223B]"
            >
              Нүүр хуудас
            </Link>
            <Link to="/" className="text-sm font-semibold text-gray-900">
              тусламж авах <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default notFound;
