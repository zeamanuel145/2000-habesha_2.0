import React from "react";

export default function Message({ onReservationClick }) {
  return (
    <section className="relative w-full h-100 flex">
      <img
        src="./images/white_guy.jpg"
        alt="Guest's Experience"
        className="w-full h-full object-cover rounded-b-xl"
      />
      <div className="absolute inset-0  bg-opacity-50 flex flex-row md:flex-col justify-center items-center text-center px-4">
        <p className="text-white text-3xl md:text-5xl font-semibold mb-4 mr-6">
          Come and Have an <br />
          Unforgettable Experience
        </p>
        <button
          onClick={onReservationClick}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Reserve Now
        </button>
      </div>
    </section>
  );
}
