import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TeamState } from './team.state';

export const selectTeamState = createFeatureSelector<TeamState>('teams');

export const selectAllTeams = createSelector(
  selectTeamState,
  (state) => state.teams
);

export const selectSelectedTeam = createSelector(
  selectTeamState,
  (state) => state.team
);

export const selectTeamLoading = createSelector(
  selectTeamState,
  (state) => state.loading
);

export const selectTeamError = createSelector(
  selectTeamState,
  (state) => state.error
);
