import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { DemoCharacters } from '../data-access/demo-characters';
import { CharacterSheetComponent } from '../ui/character-sheet.component';

@Component({
  standalone: true,
  imports: [CharacterSheetComponent, RouterLink],
  template: `
    <section class="page">
      <a class="back-link" routerLink="/games/sable-harbor/characters">
        <span aria-hidden="true">←</span>
        Back to your characters
      </a>

      @if (character(); as selectedCharacter) {
        <app-character-sheet [character]="selectedCharacter" />
      } @else {
        <section class="not-found" role="status">
          <p class="eyebrow">Character unavailable</p>
          <h1>We couldn't find that character.</h1>
          <p>It may have been removed or may not be part of this demo.</p>
          <a routerLink="/games/sable-harbor/characters">Return to your characters</a>
        </section>
      }
    </section>
  `,
  styleUrl: './character-detail.page.scss',
})
export class CharacterDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly demoCharacters = inject(DemoCharacters);

  protected readonly character = toSignal(
    this.route.paramMap.pipe(
      map((params) => this.demoCharacters.getCharacter(params.get('characterId') ?? '')),
    ),
    { initialValue: undefined },
  );
}
