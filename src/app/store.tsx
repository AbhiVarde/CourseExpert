import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { useDispatch } from "react-redux";
import coursesReducer from "./CoursesSlice";

const rootReducer = combineReducers({
  courses: coursesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
