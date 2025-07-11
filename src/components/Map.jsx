import React from "react";

export default function Map() {
  return (
    <section className="pb-16">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8680.49562191721!2d38.780235794644156!3d9.006333055163887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2set!4v1750943454124!5m2!1sen!2set"
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg shadow-lg w-full"
        title="Google Maps Location"
      ></iframe>
    </section>
  );
}
