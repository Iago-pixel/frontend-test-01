import { addWidget } from "./actions";

export const addWidgetThunk = (newWidget) => {
  return (dispatch) => {
    newWidget["data"] = newWidget.data.split("|").map((e) => Number(e));

    console.log(newWidget.data);

    dispatch(addWidget(newWidget));
  };
};
