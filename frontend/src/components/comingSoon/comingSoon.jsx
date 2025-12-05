import Images from "../../assets/images";

export default function ComingSoon() {
    return (
      <div className="relative min-h-screen bg-cover bg-center bg-no-repeat rounded" style={{ backgroundImage: `url(${Images.heroBackground})` }}>
        <div className="absolute inset-0  flex items-center justify-center rounded">
          <div className="text-center text-white  px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">🚀 Feature Coming Soon</h1>
            <p className="text-lg mb-6 max-w-md mx-auto pl-8">
              We&apos;re working hard to bring something amazing. Stay tuned!
            </p>
            {/* <form className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md text-black w-full sm:w-auto"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 transition px-6 py-2 rounded-md font-medium"
              >
                Notify Me
              </button>
            </form> */}
          </div>
        </div>
      </div>
    );
  }
  