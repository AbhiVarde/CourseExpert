import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCourses } from "../features/CoursesSlice";

const Cart = ({ setPurchasedCourses, setCartCount }: any) => {
  const courses = useSelector(selectCourses);

  const cartCourses = courses.filter((course: any) => course.isPurchased);

  const getTotalAmount = () => {
    let total = 0;
    cartCourses.forEach((course: any) => {
      total += course.price;
    });
    return total;
  };

  const handleBuyNow = () => {
    setPurchasedCourses(cartCourses);
    setCartCount(0);
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cartCourses.length > 0 ? (
        <>
          {cartCourses.map((course: any) => (
            <div key={course.id} className="mb-4">
              <p>{course.name}</p>
              <p>${course.price}</p>
            </div>
          ))}
          <div className="flex gap-2 items-center">
            <p className="font-bold">Total:</p>
            <p className="font-bold">${getTotalAmount()}</p>
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
