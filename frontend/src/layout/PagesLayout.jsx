/* eslint-disable react/prop-types */

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PagesLayout({ children, homePage, miniHome }) {
  return (
   
    <div className="min-h-screen flex flex-col !bg-[#F8FEFC]">
  <Header homePage={homePage} miniHome={miniHome} />
  
 
  <div className="flex-grow">
    {miniHome ? null : <Navbar homePage={homePage} />}
    {children}
  </div>

  <Footer miniHome={miniHome} />
</div>

  // <div className="min-h-screen flex flex-col bg-[#F8FEFC]">
  //     <Header homePage={homePage} miniHome={miniHome} />
      
  //     {/* Content area with fixed height to ensure header and footer are visible */}
  //     <div className={`${miniHome ? 'h-[calc(100vh-104px)]' : 'flex-grow'}`}>
  //       {miniHome ? null : <Navbar homePage={homePage} />}
  //       {children}
  //     </div>

  //     <Footer miniHome={miniHome} />
  //   </div>
  );
}

export default PagesLayout;
