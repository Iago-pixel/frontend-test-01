import { ADD_WIDGET } from "./actionsTypes";
import { EDIT_WIDGET } from "./actionsTypes";
import { REMOVE_WIDGET } from "./actionsTypes";

export const widgetsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_WIDGET:
      const { newWidget } = action;
      return [...state, newWidget];

    case EDIT_WIDGET:
      const { widgetToEdit } = action;

      const stateChanger = state.map((el) =>
        el.name === widgetToEdit.oldName
          ? { name: widgetToEdit["name"], data: widgetToEdit["data"] }
          : el
      );

      return stateChanger;

    case REMOVE_WIDGET:
      const { widgetToRemove } = action;
      return state.filter((el) => el.name !== widgetToRemove.name);

    default:
      return state;
  }
};
