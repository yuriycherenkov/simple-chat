import helpers from '../helpers/index';

const users = [
  {
    name: 'Vasya',
    id: helpers.createUniqueId('userId'),
  },
  {
    name: 'Petya',
    id: helpers.createUniqueId('userId'),
  },
];

export default users;
