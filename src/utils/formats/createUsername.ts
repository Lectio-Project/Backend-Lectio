const generateUsername = (name: string) => {
  const newName = name.toLowerCase().split(' ')[0];
  const date = new Date();
  const userName = `@${newName}${+date}`;

  return userName;
};

export default generateUsername;
