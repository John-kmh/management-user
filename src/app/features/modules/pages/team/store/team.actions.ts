import { createAction, props } from '@ngrx/store';
import { Team } from '../../../models/team.model';

export const loadTeams = createAction('[Team] Load Teams');
export const loadTeamsSuccess = createAction(
  '[Team] Load Teams Success',
  props<{ teams: Team[] }>()
);
export const loadTeamsFailure = createAction(
  '[Team] Load Teams Failure',
  props<{ error: any }>()
);

// Create Team
export const createTeam = createAction(
  '[Team] Create Team',
  props<{ team: Omit<Team, 'team_id'> }>()
);
export const createTeamSuccess = createAction(
  '[Team] Create Team Success',
  props<{ team: Team }>()
);
export const createTeamFailure = createAction(
  '[Team] Create Team Failure',
  props<{ error: any }>()
);

// Update Team
export const updateTeam = createAction(
  '[Teams] Update Team',
  props<{ team: Team }>()
);
export const updateTeamSuccess = createAction(
  '[Teams] Update Team Success',
  props<{ team: Team }>()
);
export const updateTeamFailure = createAction(
  '[Teams] Update Team Failure',
  props<{ error: string }>()
);
