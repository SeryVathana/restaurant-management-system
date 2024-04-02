import { X } from "lucide";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <section className="relative mx-auto">
        <div className="mx-4 py-20 lg:flex">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-none">Main title of your landing page</h1>
            <p className="text-xl lg:text-2xl mt-6 font-light">
              Free landing page template to promote your business startup and generate leads for the offered services
            </p>
          </div>

          <div className="lg:w-1/2 ">
            <img src="https://cdn.pixabay.com/photo/2015/09/04/11/31/fish-amok-921926_1280.jpg" alt="" className="w-full h-max" />
          </div>
        </div>
      </section>

      <div className="mx-4 py-4 lg:flex">
        <div className="flex justify-start mx-4 lg:w-1/2">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <img src="https://i.pinimg.com/564x/81/8f/13/818f139c8adae48b010d9e5202348289.jpg" alt="Stand Image" className="w-full h-auto" />
            </div>
            <div className="col-span-2 grid grid-rows-2 gap-0">
              <div>
                <img
                  src="https://img.freepik.com/free-photo/spicy-fried-tubtim-fish-salad-spicy-thai-food_1150-26481.jpg?w=1060&t=st=1709894797~exp=1709895397~hmac=ab00c396cfb6a8ab14737393fa496c409f2e0bfacaa0dafd7b7b6dd8b82748c9"
                  alt="Image 2"
                  className="w-full h-auto"
                />
              </div>
              <div>
                <img src="https://cdn.pixabay.com/photo/2018/11/30/16/26/cambodia-3848087_1280.jpg" alt="Image 3" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center lg:text-right lg:w-1/2 lg:pl-8">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-none">Main title of your landing page</h1>
          <p className="text-xl lg:text-2xl mt-6 font-light">
            Free landing page template to promote your business startup and generate leads for the offered services
          </p>
        </div>
      </div>
      <section className="w-full mx-auto">
        <div className="py-20">
          <h3 className="text-center font-sans font-bold text-3xl">Our Services</h3>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-60">
            <X />
            <Link to={"/"}></Link>
            <p className="text-black font-sans font-bold text-2xl text-center my-5">Breakfast</p>
          </div>

          <div className="w-60">
            <a href="">
              2
              {/* <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 122.88 119.66" fill="#283747" className="w-full h-auto"><title>rice-bowl</title><path d="M34.34,112.6C23.61,109.25,16,104.52,10.48,97.41S1.84,81,0,68.29a1.87,1.87,0,0,1,0-.67A17.45,17.45,0,0,1,4.12,56.35c2-2.45,4.85-4.2,8.68-5.56a11.88,11.88,0,0,1,3.22-7,14.32,14.32,0,0,1,7.92-4.12A28.62,28.62,0,0,1,38.23,32a30.55,30.55,0,0,1,17.29,1.2c.35.14,1.49.71,2.52,1.23a.9.9,0,0,1,.35.28A22.64,22.64,0,0,1,70.08,30a24.51,24.51,0,0,1,8.49.61L92.1,3.52c1.23-2.4,3.2-4.7,7-2.84a6.28,6.28,0,0,1,2.52,2.18c1.74,2.66.28,4.51-1,6.8L85.94,34a16.86,16.86,0,0,1,3,2.68l.11.13A13.43,13.43,0,0,1,92,42.4c1.28.36,2.51.77,3.67,1.21l17-28.36c1.42-2.29,3.56-4.42,7.22-2.27a6.36,6.36,0,0,1,2.34,2.38c1.51,2.79-.08,4.52-1.58,6.69L102.88,47.39a24.55,24.55,0,0,1,4.48,4,17.36,17.36,0,0,1,4.19,15.48,2.36,2.36,0,0,1-.16.47,2.14,2.14,0,0,1,.11.67,2.45,2.45,0,0,1,0,.27,47.22,47.22,0,0,1-10.6,27.93c-5.88,7-14.47,12.88-26.51,16.46h-.06v6.13a.86.86,0,0,1-.86.86H35.52a1.11,1.11,0,0,1-1.11-1.1v-5.93l-.07,0ZM82.18,61.39a2.17,2.17,0,0,1,0-4.34h5.14a2.17,2.17,0,0,1,0,4.34Zm-1.3-15a2.16,2.16,0,1,1-1.76,3.95l-4.69-2.11a2.16,2.16,0,0,1,1.76-3.95l4.69,2.11Zm-26,1.29a2.16,2.16,0,1,1,1.62-4l5.15,2.1a2.16,2.16,0,1,1-1.63,4l-5.14-2.1ZM53,61.39a2.17,2.17,0,0,1,0-4.34h5.14a2.17,2.17,0,0,1,0,4.34ZM35.5,51A2.16,2.16,0,0,1,33.74,47l4.69-2.11a2.16,2.16,0,1,1,1.76,3.94L35.5,51ZM25.42,61.39a2.17,2.17,0,0,1,0-4.34h5.15a2.17,2.17,0,0,1,0,4.34ZM5.15,66H107.32v0a13.16,13.16,0,0,0-3.24-11.72c-3-3.49-7.93-6.34-14.51-8a2.17,2.17,0,0,1-1.64-1.88,8.7,8.7,0,0,0-2.15-4.76l-.1-.1a15.24,15.24,0,0,0-6.44-4.15,20.32,20.32,0,0,0-8.73-1,18.36,18.36,0,0,0-10.26,4.4,2.14,2.14,0,0,1-1.49.59,8.55,8.55,0,0,1-2.68-1.08c-.91-.45-1.91-1-2.12-1a26,26,0,0,0-14.83-1,24.1,24.1,0,0,0-12.56,7,2.11,2.11,0,0,1-1.35.69,10,10,0,0,0-6.07,2.9A7.84,7.84,0,0,0,17,52.23a2.17,2.17,0,0,1-1.51,2.22c-3.76,1.17-6.41,2.61-8.06,4.63A11.57,11.57,0,0,0,5.15,66ZM96.68,76.3a1.52,1.52,0,1,1,2.8,1.16A57.45,57.45,0,0,1,97,82.78a56,56,0,0,1-3,5,1.52,1.52,0,1,1-2.51-1.7,53.33,53.33,0,0,0,2.87-4.74,55.13,55.13,0,0,0,2.39-5ZM88.31,90.23a1.51,1.51,0,1,1,2.31,2c-.89,1.06-1.82,2.07-2.76,3S86,97,85,97.82A1.51,1.51,0,1,1,83,95.48c.91-.75,1.81-1.57,2.69-2.44s1.76-1.84,2.58-2.81ZM13.68,94.94c4.9,6.38,11.88,10.66,21.71,13.75H73.52c11-3.33,18.9-8.68,24.25-15.09A42.65,42.65,0,0,0,107.29,70H4.38C6.14,80.82,9,88.88,13.68,94.94Z"/></svg> */}
            </a>
            <p className="text-black font-sans font-bold text-2xl text-center my-5">Lunch</p>
          </div>

          <div className="w-80">
            3
            {/* <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 122.88 89.2" style="enable-background:new 0 0 122.88 89.2" xml:space="preserve" className="w-full h-auto"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path className="st0" fill="#153951" d="M122.88,21.37c0.05,2.89-0.53,11.16-1.68,24.86h-1.78V89.2l-6,0V46.23h-0.99V0c2.02,0.31,3.76,1.23,5.15,2.75 C121.07,6.31,122.83,12.53,122.88,21.37L122.88,21.37z M107.27,44.52c0,12.04-4.24,22.33-12.72,30.81 c-8.5,8.5-18.77,12.74-30.81,12.74c-12,0-22.26-4.24-30.78-12.74c-8.5-8.48-12.77-18.77-12.77-30.81c0-12,4.26-22.24,12.77-30.76 c8.53-8.5,18.79-12.77,30.78-12.77c12.04,0,22.31,4.26,30.81,12.77C103.03,22.28,107.27,32.52,107.27,44.52L107.27,44.52 L107.27,44.52z M20.69,23.22c0,2.96-1.23,5.4-3.69,7.3c-2.43,1.9-3.66,3.57-3.66,4.96V89.2h-6V35.48c0-1.4-1.23-3.06-3.66-4.96 C1.23,28.62,0,26.19,0,23.22C0,15.18,1.78,7.42,5.37,0v19.9h3.18V0h3.52v19.9h3.25V0C18.89,7.42,20.69,15.18,20.69,23.22 L20.69,23.22z M95.49,44.52c0-8.74-3.08-16.21-9.27-22.4c-6.19-6.19-13.68-9.27-22.48-9.27c-8.77,0-16.24,3.08-22.4,9.27 c-6.19,6.19-9.3,13.66-9.3,22.4c0,8.76,3.11,16.23,9.3,22.45c6.16,6.21,13.63,9.32,22.4,9.32c8.79,0,16.28-3.11,22.48-9.32 C92.4,60.75,95.49,53.28,95.49,44.52L95.49,44.52L95.49,44.52z M92.31,44.52c0,7.9-2.77,14.64-8.36,20.23 c-5.57,5.56-12.31,8.36-20.21,8.36c-7.85,0-14.58-2.8-20.16-8.36c-5.57-5.59-8.36-12.33-8.36-20.23c0-7.85,2.79-14.58,8.36-20.14 c5.59-5.56,12.31-8.36,20.16-8.36c7.9,0,14.65,2.8,20.21,8.36C89.54,29.94,92.31,36.67,92.31,44.52L92.31,44.52z"/></g></svg> */}
            <p className="text-black font-sans font-bold text-2xl text-center my-5">Dinner</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
