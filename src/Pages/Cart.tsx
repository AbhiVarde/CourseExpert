import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCourses } from "../features/CoursesSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import confetti from "canvas-confetti";

const Cart = ({ setPurchasedCourses, setCartCount }: any) => {
  const courses = useSelector(selectCourses);
  const filteredCourses = courses.filter((course) => course.isPurchased);
  const totalAmount = filteredCourses.reduce(
    (acc, course) => acc + course.price,
    0
  );

  const [cartCourses, setCartCourses] = useState(filteredCourses); // Added useState for cartCourses
  const [isCelebrating, setIsCelebrating] = useState(false);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    setPurchasedCourses(cartCourses);
    setCartCount(0);
    setCartCourses([]); // Clear the cart courses immediately

    navigate("/");

    toast.success("Course bought! Start learning now! 🌟🎉", {
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
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cartCourses.length > 0 ? (
        <>
          {cartCourses.map((course) => (
            <div key={course.id} className="mb-4">
              <p>{course.name}</p>
              <p>${course.price}</p>
            </div>
          ))}
          <div className="flex gap-2 items-center">
            <p className="font-bold">Total:</p>
            <p className="font-bold">${totalAmount}</p>
          </div>
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded mt-4"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </>
      ) : (
        <>
          <p className="mb-5">Your cart is empty</p>
          <Link
            to="/"
            className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded"
          >
            Back to Course List
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
