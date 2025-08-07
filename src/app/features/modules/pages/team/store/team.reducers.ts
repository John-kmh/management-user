import { createReducer, on } from '@ngrx/store';
import { initialTeamState } from './team.state';
import * as TeamActions from './team.actions';

export const teamReducer = createReducer(
  initialTeamState,
  // Load
  on(TeamActions.loadTeams, (state) => ({
    ...state,
    loading: true,
  })),
  on(TeamActions.loadTeamsSuccess, (state, { teams }) => ({
    ...state,
    loading: false,
    teams,
  })),
  on(TeamActions.loadTeamsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create
  on(TeamActions.createTeam, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TeamActions.createTeamSuccess, (state, { team }) => ({
    ...state,
    loading: false,
    teams: [...state.teams, team],
  })),
  on(TeamActions.createTeamFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update
  on(TeamActions.updateTeam, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TeamActions.updateTeamSuccess, (state, { team }) => ({
    ...state,
    teams: state.teams.map((t) => (t.team_id === team.team_id ? team : t)),
    loading: false,
  })),
  on(TeamActions.updateTeamFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
