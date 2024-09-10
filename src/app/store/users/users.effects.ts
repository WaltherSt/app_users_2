import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import {
  add,
  addSuccess,
  findAllPagiable,
  load,
  remove,
  removeSuccess,
  setErrors,
  update,
  updateSuccess,
} from './users.actions';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private service: UserService,
    private router: Router
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      exhaustMap((action) =>
        this.service.findAllPageable(action.page).pipe(
          map((data) => {
            const users = data.content as User[];
            const paginator = data;

            return findAllPagiable({ users, paginator });
          }),
          catchError((error) => of(error))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(add),
      exhaustMap((action) =>
        this.service.create(action.userNew).pipe(
          map((userNew) => addSuccess({ userNew })),
          catchError((error) =>
            error.status === 400
              ? of(setErrors({ userForm: action.userNew, errors: error.error }))
              : of(error)
          )
        )
      )
    )
  );

  addSuccessUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addSuccess),
        tap(() => {
          this.router.navigate(['/users']);

          Swal.fire({
            title: 'Creado!',
            text: 'Usuario creado con exito!',
            icon: 'success',
          });
        })
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(update),
      exhaustMap((action) =>
        this.service.update(action.userUpdated).pipe(
          map((userUpdated) => updateSuccess({ userUpdated })),
          catchError((error) =>
            error.status === 400
              ? of(
                  setErrors({
                    userForm: action.userUpdated,
                    errors: error.error,
                  })
                )
              : of(error)
          )
        )
      )
    )
  );

  updateSuccessUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateSuccess),
        tap(() => {
          this.router.navigate(['/users']);
          Swal.fire({
            title: 'Actualizado!',
            text: 'Usuario editado con exito!',
            icon: 'success',
          });
        })
      ),
    { dispatch: false }
  );

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(remove),
      exhaustMap((action) =>
        this.service
          .remove(action.id)
          .pipe(map(() => removeSuccess({ id: action.id })))
      )
    )
  );

  removeUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeSuccess),
        tap(() => {
          this.router.navigate(['/users']);
          Swal.fire({
            title: 'Eliminado!',
            text: 'Usuario eliminado con exito.',
            icon: 'success',
          });
        })
      ),
    { dispatch: false }
  );
}
