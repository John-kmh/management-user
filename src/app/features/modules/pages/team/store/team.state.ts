import { Team } from "../../../models/team.model";

export interface TeamState {
  teams: Team[];
  loading: boolean;
  error: any;
}

export const initialTeamState: TeamState = {
  teams: [],
  loading: false,
  error: null
};
