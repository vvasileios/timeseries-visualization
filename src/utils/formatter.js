import moment from "moment";

export const dateFormatter = (date) => {
  return moment(date).format("MM/DD/YY");
};

export const timeFormatter = (time) => {
  return moment(time).format("hh:mm A");
};

export const tableDateFormatter = (date) => {
  return moment(date).format("MMM Do YY");
};
