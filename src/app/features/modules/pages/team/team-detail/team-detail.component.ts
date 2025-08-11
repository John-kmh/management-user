import { Component, inject, Input, OnInit } from '@angular/core';
import { Team } from '../../../models/team.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadTeam } from '../store/team.actions';

@Component({
  selector: 'app-team-detail',
  imports: [CommonModule],
  templateUrl: './team-detail.component.html',
  styleUrl: './team-detail.component.css',
})
export class TeamDetailComponent implements OnInit {
  private store = inject(Store);
  @Input() team!: Team;
  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {
    this.store.dispatch(loadTeam({ id: this.team.team_id }));
  }
}
