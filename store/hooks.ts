import { TypedUseSelectorHook, useSelector } from "react-redux";
import store from "./store";

const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> =
    useSelector;

export { useAppSelector };