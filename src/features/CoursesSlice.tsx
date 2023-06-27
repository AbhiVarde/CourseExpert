import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  by: string;
  rating: number;
}

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: [
    {
      id: uuidv4(),
      name: "Make Money as a Developer!",
      description: "Learn to make money with Twitter",
      price: 30,
      by: "Florin pop",
      rating: 4,
    },
    {
      id: uuidv4(),
      name: "Become a better Developer",
      description: "Tips for developers",
      price: 25,
      by: "James",
      rating: 3,
    },
  ],
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
  },
});

export const { setCourses } = coursesSlice.actions;

export const selectCourses = (state: { courses: CoursesState }) =>
  state.courses.courses;

export default coursesSlice.reducer;
