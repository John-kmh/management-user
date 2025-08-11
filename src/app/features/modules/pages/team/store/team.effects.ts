import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TeamActions from './team.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { TeamService } from '../team.service';

@Injectable()
export class TeamEffects {
  private actions$ = inject(Actions);
  private teamService = inject(TeamService);

  loadTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.loadTeams),
      switchMap(() =>
        this.teamService.getTeams().pipe(
          map((res) => TeamActions.loadTeamsSuccess({ teams: res.data })),

          catchError((error) => of(TeamActions.loadTeamsFailure({ error })))
        )
      )
    )
  );

  createTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.createTeam),
      mergeMap(({ team }) =>
        this.teamService.createTeam(team).pipe(
          map((newTeam) =>
            TeamActions.createTeamSuccess({
              team: newTeam,
            })
          ),
          catchError((error) => of(TeamActions.createTeamFailure({ error })))
        )
      )
    )
  );

  updateTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.updateTeam),
      mergeMap(({ team }) =>
        this.teamService.updateTeam(team).pipe(
          map((updatedTeam) =>
            TeamActions.updateTeamSuccess({ team: updatedTeam })
          ),
          catchError((error) =>
            of(TeamActions.updateTeamFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamActions.loadTeam),
      mergeMap(({ id }) =>
        this.teamService.getTeamById(id).pipe(
          map((team) => TeamActions.loadTeamSuccess({ team })),
          catchError((error) => of(TeamActions.loadTeamFailure({ error })))
        )
      )
    )
  );
}
