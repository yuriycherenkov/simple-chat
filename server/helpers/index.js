const createUniqueId = () => {
  let count = 1;

  return (prefix) => {
    count += 1;

    return `${count}__${prefix}`;
  };
};

export default {
  createUniqueId: createUniqueId(),
};
