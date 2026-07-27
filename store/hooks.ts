import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import store from "./store";

type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;

const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> =
    useSelector;

export { useAppSelector, useAppDispatch };