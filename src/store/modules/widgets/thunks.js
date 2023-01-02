import { addWidget } from "./actions";
import { editWidget } from "./actions";

export const addWidgetThunk = (newWidget) => {
  return (dispatch) => {
    newWidget["data"] = newWidget.data.split("|").map((e) => Number(e));

    dispatch(addWidget(newWidget));
  };
};

export const editWidgetThunk = (widgetToEdit) => {
  return (dispatch) => {
    widgetToEdit["data"] = widgetToEdit.data.split("|").map((e) => Number(e));

    dispatch(editWidget(widgetToEdit));
  };
};
