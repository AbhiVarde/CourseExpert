import { useState } from "react";
import { setCourses } from "../features/CoursesSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [courseData, setCourseData] = useState({
    name: "",
    desc: "",
    price: "",
    by: "",
    rating: "",
  });

  const { name, desc, price, by, rating } = courseData;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { name, desc, price, by, rating } = courseData;

    if (
      !name.trim() ||
      !desc.trim() ||
      !price.trim() ||
      !by.trim() ||
      !rating.trim()
    ) {
      toast.info("Oops! Looks like you missed something!😬", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const parsedPrice = parseFloat(price);
    const parsedRating = parseFloat(rating);

    if (isNaN(parsedPrice) || isNaN(parsedRating)) {
      toast.error("Invalid input! Please Enter valid values!💰", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (parsedPrice <= 0 || parsedRating < 0 || parsedRating > 5) {
      toast.error("Hold-on! Double-check your entries!💲", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    dispatch(
      setCourses({
        id: uuidv4(),
        name,
        description: desc,
        price: parsedPrice,
        by,
        rating: parsedRating,
      })
    );

    navigate("/");

    toast.success("Congrats!🎓 Course successfully added!🎉", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <ToastContainer position="top-center" />
      <form className="max-w-lg mx-auto flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-center items-center gap-[12px] sm:gap-16">
            <label htmlFor="name" className="text-gray-700 text-sm font-bold">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name of the course"
              value={name}
              onChange={handleChange}
              className="border border-gray-300 py-2 px-4 rounded w-64"
            />
          </div>
          <div className="flex justify-center items-center gap-4 sm:gap-[70px]">
            <label
              htmlFor="description"
              className="text-gray-700 text-sm font-bold"
            >
              Desc
            </label>
            <input
              type="text"
              name="desc"
              placeholder="Course Description"
              value={desc}
              onChange={handleChange}
              className="border border-gray-300 py-2 px-4 rounded w-64"
            />
          </div>
          <div className="flex justify-center items-center gap-[12px] sm:gap-[74px]">
            <label htmlFor="price" className="text-gray-700 text-sm font-bold">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Price of the course"
              value={price}
              onChange={handleChange}
              className="border border-gray-300 py-2 px-4 rounded w-64"
            />
          </div>
          <div className="flex justify-center items-center gap-3 sm:gap-14">
            <label
              htmlFor="creator"
              className="text-gray-700 text-sm font-bold "
            >
              Creator
            </label>
            <input
              type="text"
              name="by"
              placeholder="Course creator"
              value={by}
              onChange={handleChange}
              className="border border-gray-300 py-2 px-4 rounded w-64"
            />
          </div>
          <div className="flex justify-center items-center gap-[16px] sm:gap-[62px]">
            <label htmlFor="rating" className="text-gray-700 text-sm font-bold">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              placeholder="Course rating (out of 5)"
              value={rating}
              onChange={handleChange}
              className="border border-gray-300 py-2 px-4 rounded w-64"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded w-60 sm:w-[358px]"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
