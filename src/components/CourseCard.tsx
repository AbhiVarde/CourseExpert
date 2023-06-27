interface CourseProps {
  data: {
    name: string;
    description: string;
    price: number;
    by: string;
    rating: number;
  };
}

const CourseCard = ({ data }: CourseProps) => {
  return (
    <div className="p-4 ">
      <h1 className="text-xl font-bold mb-2">{data.name}</h1>
      <p className="text-gray-600 mb-2">{data.description}</p>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">${data.price}</h3>
        <h3 className="text-lg">{data.by}</h3>
      </div>
      <p className="text-gray-600">Rating: {data.rating}/5</p>
    </div>
  );
};

export default CourseCard;
