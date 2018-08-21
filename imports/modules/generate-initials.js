const generateInitials = client => {
  return (
    client.lastname +
    ' ' +
    client.firstname.substring(0, 1) +
    '.' +
    client.patronimic.substring(0, 1) +
    '.'
  );
};

export default generateInitials;
