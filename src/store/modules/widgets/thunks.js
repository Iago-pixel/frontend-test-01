import { addWidget } from "./actions";
import { editWidget } from "./actions";

export const addWidgetThunk = (newWidget) => {
  return (dispatch) => {
    newWidget["yData"] = newWidget.yData.split("|").map((e) => Number(e));

    dispatch(addWidget(newWidget));
  };
};

export const editWidgetThunk = (widgetToEdit) => {
  return (dispatch) => {
    widgetToEdit["yData"] = widgetToEdit.yData.split("|").map((e) => Number(e));

    dispatch(editWidget(widgetToEdit));
  };
};
