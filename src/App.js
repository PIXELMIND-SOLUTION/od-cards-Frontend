import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import PrivateRoute from './auth/PrivateRoute';
import VisitingCards from "./category/visitingCards";
import ReadyMadeCards from './category/ReadyMadeCards';
import WeddingCards from "./category/WeddingCards";
import CardDetails from "./details/cardDetails";
import MyCart from "./components/MyCart";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FaqPage from './pages/FaqPage';
import ViewAllReviews from "./pages/ViewAllReviews";
import PoliciesPage from "./pages/PoliciesPage";
import ProfilePage from './components/ProfilePage';
import WeddingCardDetails from "./details/WeddingCardDetails";
import InvitationCards from "./category/InvitationCards";
import InvitationCardDetails from "./details/InvitationCardDetails";
import NewArrivals from './details/NewArrivals';
import ProductDetail from "./details/ProductDetail";
import MixingJobs from "./category/MixingJobs";
import BondPaperJobs from "./category/BondPaperJobs";
import PocketCalendars from "./category/PocketCalenders";
import DigitalPrints from "./category/DigitalPrints";
import FluteBoardPrinting from './category/FluteBoardPrinting';
import MyAccount from "./details/MyAccount";



function App() {


  return (
    <>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path='/' element={<Home />} />
          <Route path="/dashboard/aboutus" element={<AboutUs />} />
          <Route path="/dashboard/contactus" element={<ContactUs />} />
          <Route path="/dashboard/faqpage" element={<FaqPage />} />
          <Route path="/dashboard/reviews" element={<ViewAllReviews />} />
          <Route path="/dashBoard/policies" element={<PoliciesPage/>}/>


          {/* Private Routes - Requires Authentication */}
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            {/* Categories */}
            <Route path='/dashboard/category/visiting-cards' element={<VisitingCards />} />
            <Route path="/dashboard/category/readymade-cards" element={<ReadyMadeCards />} />
            <Route path="/dashboard/category/wedding-cards" element={<WeddingCards />} />
            <Route path="/dashboard/category/invitation-cards" element={<InvitationCards />} />
            <Route path="/dashboard/category/weddingcarddetails/:category/:cardId" element={<WeddingCardDetails />} />
            <Route path="/dashboard/category/mixing-jobs" element={<MixingJobs/>}/>
            <Route path="/dashboard/category/bond-papers" element={<BondPaperJobs/>}/>
            <Route path="/dashboard/category/pocket-calender-boards" element={<PocketCalendars/>}/>
            <Route path="/dashboard/category/digital-prints" element={<DigitalPrints/>}/>
            <Route path="/dashboard/category/flute-board-printing" element={<FluteBoardPrinting/>}/>


            <Route path="/dashboard/card-details" element={<CardDetails />} />
            <Route path="/dashboard/myaccount" element={<MyAccount />} />
            <Route path="/dashboard/category/invitation-cards/:id" element={<InvitationCardDetails />} />
            <Route path="/dashboard/new-arrivals" element={<NewArrivals />} />
            <Route path="/dashboard/new-arrivals/:id" element={<ProductDetail />} />
            <Route path="/dashboard/mycart" element={<MyCart />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />

          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
