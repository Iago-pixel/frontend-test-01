export const submitData = (e, log) => {
  e.preventDefault();
  console.log(log);
};

export const handleChange = (e, setter) => {
  setter(e.target.value);
};
