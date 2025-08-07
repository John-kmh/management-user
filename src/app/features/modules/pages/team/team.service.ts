import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { map, Observable } from 'rxjs';
import { Team, TeamItemResponse, TeamResponse } from '../../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private api: ApiService) {}
  getTeams(): Observable<TeamResponse> {
    return this.api.get('/v1/teams');
  }

  createTeam(team: Omit<Team, 'team_id'>): Observable<Team> {
    return this.api
      .post<TeamItemResponse>('/v1/teams', team)
      .pipe(map((res) => res.data));
  }

  updateTeam(team: Team): Observable<Team> {
    return this.api
      .put<TeamItemResponse>(`/v1/teams/${team.team_id}`, team)
      .pipe(map((res) => res.data));
  }
}
