import { Team } from '../../../models/team.model';

export interface TeamState {
  teams: Team[];
  team: Team;
  loading: boolean;
  error: any;
}

export const initialTeamState: TeamState = {
  teams: [],
  loading: false,
  error: null,
  team: {
    team_id: 0,
    name: '',
    description: '',
    permissions: [],
    created_at: '',
    updated_at: '',
  },
};
