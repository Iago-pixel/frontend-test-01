import { ADD_WIDGET } from "./actionsTypes";
import { REMOVE_WIDGET } from "./actionsTypes";

export const widgetsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_WIDGET:
      const { newWidget } = action;
      return [...state, newWidget];

    case REMOVE_WIDGET:
      const { widgetToRemove } = action;
      return state.filter((el) => el.name !== widgetToRemove.name);

    default:
      return state;
  }
};
