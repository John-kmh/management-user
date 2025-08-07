import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Team } from '../../models/team.model';
import { TeamFormComponent } from './team-form/team-form.component';
import { loadTeams } from './store/team.actions';
import {
  selectAllTeams,
  selectTeamError,
  selectTeamLoading,
} from './store/team.selectors';

@Component({
  selector: 'app-team',
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  private modalService = inject(NgbModal);
  private store = inject(Store);

  teams$: Observable<Team[]> = this.store.select(selectAllTeams);

  loading$ = this.store.select(selectTeamLoading);
  error$ = this.store.select(selectTeamError);

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.store.dispatch(loadTeams());
    // this.teams$.subscribe((data) => console.log('Teams in component:', data));
  }

  openModal(team?: Team): void {
    const modalRef = this.modalService.open(TeamFormComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });

    // No optional chaining needed since we control the modal instance
    modalRef.componentInstance.team = team;
    modalRef.componentInstance.isEdit = Boolean(team);

    modalRef.result.then(
      () => this.loadTeams(),
      () => console.log('Modal dismissed')
    );
  }
  
}
