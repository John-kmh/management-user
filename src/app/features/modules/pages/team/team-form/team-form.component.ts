import { Component, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Team } from '../../../models/team.model';
import { Store } from '@ngrx/store';
import { createTeam, updateTeam } from '../store/team.actions';

@Component({
  selector: 'app-team-form',
  imports: [ReactiveFormsModule],
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css'],
})
export class TeamFormComponent {
  private fb = inject(FormBuilder); // First initialize the injectable
  private store = inject(Store);
  public activeModal = inject(NgbActiveModal);

  @Input() team?: Team;
  @Input() isEdit = false;

  // Now you can safely use this.fb
  teamForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required]],
  });

  ngOnInit() {
    if (this.team) {
      this.teamForm.patchValue({
        name: this.team.name,
        description: this.team.description,
      });
    }
  }

  onSubmit() {
    this.teamForm.markAllAsTouched();

    if (this.teamForm.invalid) return;

    const teamData = {
      ...this.teamForm.value,
      ...(this.isEdit && { team_id: this.team?.team_id }),
      permissions: this.team?.permissions || [],
    };

    if (this.isEdit) {
      this.store.dispatch(updateTeam({ team: teamData as Team }));
    } else {
      this.store.dispatch(
        createTeam({ team: teamData as Omit<Team, 'team_id'> })
      );
    }

    this.activeModal.close(teamData);
  }

  onCancel() {
    this.activeModal.dismiss('cancel');
  }
}
