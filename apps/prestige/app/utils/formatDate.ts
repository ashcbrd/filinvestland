import moment from "moment";

const formatDate = (initialDateString: string) => {
  const initialDate = moment(initialDateString);
  const roundedDate = initialDate.startOf('hour').add(1, 'hour');
  return roundedDate.format("MMMM DD, YYYY");
}

export default formatDate;