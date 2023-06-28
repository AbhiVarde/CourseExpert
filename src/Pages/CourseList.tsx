import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";

const CourseList = ({ courses }: any) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        {courses?.map((course: any) => (
          <Link
            to={`/${course.id}`}
            key={course.id}
            className={`bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out flex flex-col ${
              course.isPurchased ? "opacity-60 cursor-not-allowed" : ""
            }`}
            onClick={(event) => {
              if (course.isPurchased) {
                event.preventDefault();
              }
            }}
          >
            <CourseCard data={course} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
