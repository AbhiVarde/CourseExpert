import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCourses } from "../features/CoursesSlice";
import confetti from "canvas-confetti";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Course = () => {
  const { id } = useParams();
  const courses = useSelector(selectCourses);
  const [isClicked, setIsClicked] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);

  const handleButtonClick = () => {
    if (!isClicked) {
      setIsClicked(true);

      toast.success("Course bought! Start learning now! 🌟🎉 ", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      if (!isCelebrating) {
        setIsCelebrating(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setTimeout(() => {
          setIsCelebrating(false);
        }, 3000);
      }
    } else {
      toast.info("Course already purchased! Happy learning! 🌟📚", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const selectedCourse = courses.find((course) => course.id === id);

  if (!selectedCourse) {
    return null;
  }

  return (
    <div className="container p-4 max-w-xl bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out mx-auto px-4 mt-8">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">{selectedCourse.name}</h1>
        <h1 className="text-2xl font-bold">${selectedCourse.price}</h1>
      </div>
      <span className="text-gray-600">by {selectedCourse.by}</span>
      <p className="text-gray-600">Description: {selectedCourse.description}</p>
      <h4 className="text-gray-600">Rating: {selectedCourse.rating}/5</h4>
      <button
        className={`bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded mt-4${
          isCelebrating ? "animate-pulse" : ""
        }
        `}
        onClick={handleButtonClick}
      >
        {isClicked ? "Order Confirmed!" : "Buy Now!"}
      </button>
    </div>
  );
};

export default Course;
