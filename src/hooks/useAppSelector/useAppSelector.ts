import { TypedUseSelectorHook, useSelector } from "react-redux";

import { AppStateType } from "../../store/types";

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
