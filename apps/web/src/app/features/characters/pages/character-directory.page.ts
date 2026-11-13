import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DemoCharacters } from '../data-access/demo-characters';

@Component({
  imports: [RouterLink],
  template: `
    <section class="page">
      <div class="page-heading">
        <div>
          <p class="eyebrow">Sable Harbor Chronicle</p>
          <h1>Your characters</h1>
          <p class="intro">Pick up where your story left off.</p>
        </div>
        <span class="count">{{ characters.length }} characters</span>
      </div>

      <div class="character-list" aria-label="Your characters">
        @for (character of characters; track character.id) {
          <a class="character-card" [routerLink]="['/games/sable-harbor/characters', character.id]">
            <span class="character-mark" aria-hidden="true">{{ initials(character.name) }}</span>
            <span class="character-copy">
              <span class="character-name">{{ character.name }}</span>
              <span class="character-meta"
                >{{ character.characterType }} <span aria-hidden="true">·</span>
                {{ character.concept }}</span
              >
              <span class="player-name">Played by {{ character.playerName }}</span>
            </span>
            <span class="card-trailing">
              <span class="status" [class.in-progress]="character.status !== 'Active'">{{
                character.status
              }}</span>
              <span class="arrow" aria-hidden="true">→</span>
            </span>
          </a>
        }
      </div>

      <p class="list-note">Your characters are visible to you in this demo.</p>
    </section>
  `,
  styleUrl: './character-directory.page.scss',
})
export class CharacterDirectoryPage {
  private readonly demoCharacters = inject(DemoCharacters);
  protected readonly characters = this.demoCharacters.getMyCharacters();

  protected initials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('');
  }
}
