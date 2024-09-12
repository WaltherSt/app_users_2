import { createReducer, on } from '@ngrx/store';

import { User } from '../../models/user';
import {
  addSuccess,
  find,
  findAll,
  findAllPagiable,
  remove,
  resetUser,
  setErrors,
  setPaginator,
  updateSuccess,
} from '../users/users.actions';

const users: User[] = [];
const user: User = new User();

export const usersReducer = createReducer(
  {
    users,
    paginator: {},
    user,
    erros: {},
    loading: true,
  },

  on(findAll, (state, { users }) => ({
    ...state,
    users: [...users],
    loading: false,
  })),

  on(resetUser, (state) => ({
    ...state,
    user: user,
    errors: {},
  })),

  on(findAllPagiable, (state, { users, paginator }) => ({
    ...state,
    users: [...users],
    paginator: { ...paginator },
    loading: false,
  })),
  on(find, (state, { id }) => ({
    ...state,
    user: state.users.find((user) => user.id == id) || new User(),
  })),
  on(setPaginator, (state, { paginator }) => ({
    ...state,
    paginator: { ...paginator },
  })),
  on(addSuccess, (state, { userNew }) => ({
    ...state,
    users: [...state.users, { ...userNew }],
    user: { ...user },
    errors: {},
  })),
  on(updateSuccess, (state, { userUpdated }) => ({
    ...state,
    users: state.users.map((user) =>
      user.id == userUpdated.id ? { ...userUpdated } : user
    ),
    user: { ...user },
    errors: {},
  })),
  on(remove, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id != id),
  })),
  on(setErrors, (state, { userForm, errors }) => ({
    ...state,
    errors: { ...errors },
    user: { ...userForm },
  }))
);
