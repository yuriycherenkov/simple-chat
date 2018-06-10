import express from 'express';
import allUsers from '../managers/users';

const router = express.Router();

/* GET all users */
router.get('/', (req, res) => {
  const users = allUsers.getUsers();

  if (!users) return res.status('404');

  return res
    .status(200)
    .json(users);
});

/* POST create user */
router.post('/', (req, res) => {
  const newUser = allUsers.addUser(req.body.name);

  if (!newUser) return res.status('404');

  return res
    .status(200)
    .json(req.body);
});

/* GET user by id */
router.get('/:id', (req, res) => {
  const currentUser = allUsers.getCurrentUser(req.params.id);

  if (!currentUser) return res.status('404');

  return res
    .status(200)
    .json(currentUser);
});

/* PUT update current user by id */
router.put('/:id', (req, res) => {
  const newUserName = (req.body.name);
  const updatedUser = allUsers.updateUser(newUserName, req.params.id);

  if (!updatedUser) return res.status('404');

  return res
    .status(200)
    .json(updatedUser);
});

export default router;

