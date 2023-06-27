import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCourses } from "./features/CoursesSlice";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import AddCourse from "./components/AddCourse";
import Course from "./components/Course";
import CourseList from "./components/CourseList";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { AiTwotoneHeart } from "react-icons/ai";
import Login from "./components/Login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const courses = useSelector(selectCourses);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("loggedIn");
    if (storedLoggedIn === "true") {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", "true");
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    toast.success("🔒Account Locked! Until your return!📚", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/");
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleModalClose = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <nav className="flex justify-between items-center h-16 px-4 md:px-8 xl:px-16 shadow-md bg-gray-900 text-white">
        <h1
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <PiChalkboardTeacherFill className="text-3xl" />
          <span className="text-xl ml-2">CourseExpert</span>
        </h1>
        <button
          className="px-6 py-2 rounded-full bg-gray-800 font-inter text-white text-sm font-medium cursor-pointer"
          onClick={loggedIn ? handleLogout : handleLoginClick}
        >
          {loggedIn ? "Logout 😦" : "User not available 😞"}
        </button>
      </nav>
      <div className="container max-w-5xl mx-auto px-4 font-Nunito">
        {loggedIn ? (
          <>
            <div className="max-w-4xl my-8 sm:my-10 mx-auto flex flex-col sm:flex-row justify-between items-center">
              <h1 className="text-2xl sm:text-4xl tracking-tighter underline underline-blue mb-4 sm:mb-0 sm:mr-4 text-center">
                A Place to sell your Courses online!
              </h1>
              <Link
                to="/addcourse"
                className="no-underline bg-gray-800 hover:bg-gray-900 py-2 sm:py-3 px-6 text-white font-bold flex items-center justify-center"
              >
                Sell a Course
              </Link>
            </div>

            <Routes>
              <Route path="/" element={<CourseList courses={courses} />} />
              <Route path="/:id" element={<Course />} />
              <Route path="addcourse" element={<AddCourse />} />
            </Routes>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-[82vh]">
            <div className="max-w-2xl text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 underline underline-blue">
                A Place to sell your Courses online!
              </h1>
              <p className="text-lg sm:text-xl mb-10">
                Discover a vast collection of top-notch online courses. Enroll
                now and unlock a world of knowledge and growth! 🚀
              </p>
              {!loggedIn && (
                <button
                  className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 sm:px-14 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleLoginClick}
                >
                  Discover Exclusive Content! 🔒
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <footer className="fixed bottom-0 right-0 left-0 bg-gray-900 text-white py-4 text-center">
        Made with <AiTwotoneHeart className="inline-block text-green-500" /> by{" "}
        <a href="https://abhivarde.vercel.app" className="font-semibold">
          AbhiVarde
        </a>
      </footer>

      {showLoginModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white rounded-md p-8">
            <Login onLogin={handleLogin} onClose={handleModalClose} />
          </div>
        </div>
      )}
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
