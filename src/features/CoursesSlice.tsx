import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  by: string;
  rating: number;
  isPurchased?: boolean;
}

interface CoursesState {
  courses: Course[];
  cart: string[]; // Array of course IDs in the cart
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
  cart: [],
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
    purchaseCourse: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      state.courses = state.courses.map((course) =>
        course.id === courseId ? { ...course, isPurchased: true } : course
      );
    },
    addToCart: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      state.cart.push(courseId);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      state.cart = state.cart.filter((itemId) => itemId !== courseId);
    },
    updateCourse: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Course> }>
    ) => {
      const { id, changes } = action.payload;
      const course = state.courses.find((course) => course.id === id);
      if (course) {
        Object.assign(course, changes);
      }
    },
  },
});

export const {
  setCourses,
  purchaseCourse,
  addToCart,
  removeFromCart,
  updateCourse,
} = coursesSlice.actions;

export const selectCourses = (state: { courses: CoursesState }) =>
  state.courses.courses;

export const selectCartItems = (state: { courses: CoursesState }) =>
  state.courses.cart;

export const selectCourseById =
  (courseId: string) => (state: { courses: CoursesState }) =>
    state.courses.courses.find((course) => course.id === courseId);

export default coursesSlice.reducer;
