const createUniqueId = () => {
  let count = 1;

  return () => {
    count += 1;

    return `${count}__userId`;
  };
};

export default {
  createUniqueId: createUniqueId(),
};
