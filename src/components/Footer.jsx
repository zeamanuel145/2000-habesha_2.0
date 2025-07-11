export default function Footer() {
  return (
    <footer id="contact" className="bg-yellow-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span>
                  <img
                    src="./images/logo.jpg"
                    alt="Logo"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </span>{" "}
              </div>
              <div>
                <h3 className="font-bold">2000 Habesha Cultural</h3>
                <p className="text-sm">Restaurant</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact us</h4>
            <p className="text-sm mb-2">habesha2000@gmail.com</p>
            <p className="text-sm">+251 912 838 383</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Address</h4>
            <p className="text-sm mb-1">Addis Ababa, Namibia St.,</p>
            <p className="text-sm mb-1">Bole Atlas</p>
            <p className="text-sm mb-1">Addis Ababa, Around</p>
            <p className="text-sm">Ethiopian Skylight Hotel</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Opening Hours</h4>
            <p className="text-sm mb-1">From Sunday To Sunday</p>
            <p className="text-sm">10AM - 11PM</p>
          </div>
        </div>

        <div className="border-t border-yellow-700 mt-8 pt-8 flex justify-between items-center">
          <p className="text-sm">
            &copy; 2025 2000 Habesha Cultural Restaurant. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-300 transition-colors">
              <img
                src="./icons/instagram.svg"
                alt="Instagram"
                className="w-8 h-8"
              />
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              <img
                src="./icons/facebook.svg"
                alt="Facebook"
                className="w-8 h-8"
              />
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              <img src="./icons/x.svg" alt="twitter" className="w-8 h-8" />
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              <img
                src="./icons/linkedin.svg"
                alt="LinkedIn"
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
