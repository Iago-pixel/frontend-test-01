import { ADD_WIDGET } from "./actionsTypes";
import { REMOVE_WIDGET } from "./actionsTypes";

export const addWidget = (newWidget) => ({
  type: ADD_WIDGET,
  newWidget,
});

export const removeWidget = (widgetToRemove) => ({
  type: REMOVE_WIDGET,
  widgetToRemove,
});
