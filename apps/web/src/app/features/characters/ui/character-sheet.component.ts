import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import type { CharacterSheet, RatedItem, TraitGroups } from '../models/character-sheet';

@Component({
  selector: 'app-character-sheet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="sheet">
      <header class="sheet-heading">
        <div>
          <p class="eyebrow">{{ character().characterType }}</p>
          <h1>{{ character().name }}</h1>
          <p class="concept">{{ character().concept }}</p>
        </div>
        <span class="status">{{ character().status }}</span>
      </header>

      <dl class="record-details">
        <div>
          <dt>Player</dt>
          <dd>{{ character().playerName }}</dd>
        </div>
        <div>
          <dt>Character ID</dt>
          <dd>{{ character().characterId || '—' }}</dd>
        </div>
        <div>
          <dt>Experience unspent</dt>
          <dd>{{ character().experience.unspent }}</dd>
        </div>
        <div>
          <dt>Total experience</dt>
          <dd>{{ character().experience.earned }}</dd>
        </div>
        <div>
          <dt>Starting date</dt>
          <dd>{{ character().dates.starting }}</dd>
        </div>
        <div>
          <dt>Last modified</dt>
          <dd>{{ character().dates.lastModified }}</dd>
        </div>
        <div>
          <dt>Narrator</dt>
          <dd>{{ character().narrator || '—' }}</dd>
        </div>
        <div>
          <dt>Date printed</dt>
          <dd>{{ character().dates.printed }}</dd>
        </div>
      </dl>

      <section class="sheet-section" aria-labelledby="identity-heading">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Character details</p>
            <h2 id="identity-heading">Identity</h2>
          </div>
        </div>
        <dl class="identity-grid">
          <div>
            <dt>Clan</dt>
            <dd>{{ character().identity.clan || '—' }}</dd>
          </div>
          <div>
            <dt>Generation</dt>
            <dd>{{ character().identity.generation || '—' }}</dd>
          </div>
          <div>
            <dt>Sect</dt>
            <dd>{{ character().identity.sect || '—' }}</dd>
          </div>
          <div>
            <dt>Title</dt>
            <dd>{{ character().identity.title || '—' }}</dd>
          </div>
          <div>
            <dt>Nature</dt>
            <dd>{{ character().identity.nature || '—' }}</dd>
          </div>
          <div>
            <dt>Demeanor</dt>
            <dd>{{ character().identity.demeanor || '—' }}</dd>
          </div>
          <div>
            <dt>Coterie / Pack</dt>
            <dd>{{ character().identity.coterie || '—' }}</dd>
          </div>
          <div>
            <dt>Sire</dt>
            <dd>{{ character().identity.sire || '—' }}</dd>
          </div>
        </dl>
      </section>

      <section class="sheet-section" aria-labelledby="tracks-heading">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Current state</p>
            <h2 id="tracks-heading">Tracks &amp; morality</h2>
          </div>
        </div>
        <div class="track-grid">
          @for (
            track of [
              { label: 'Blood', value: character().tracks.blood },
              { label: 'Willpower', value: character().tracks.willpower },
              { label: 'Morality traits', value: character().tracks.morality.traits },
            ];
            track track.label
          ) {
            <section class="track-card" [attr.aria-label]="track.label">
              <span class="track-label">{{ track.label }}</span>
              <span class="track-value"
                >{{ track.value.current }}<span> / {{ track.value.maximum }}</span></span
              >
              <span
                class="track-dots"
                [attr.aria-label]="track.value.current + ' of ' + track.value.maximum"
              >
                @for (dot of trackDots; track dot) {
                  @if (dot <= track.value.maximum) {
                    <span class="dot" [class.filled]="dot <= track.value.current"></span>
                  }
                }
              </span>
            </section>
          }
          <section class="morality-card" aria-label="Morality path">
            <div class="morality-path">
              <span class="track-label">Morality path</span>
              <strong>{{ character().tracks.morality.path }}</strong>
              <span class="aura">Aura {{ character().tracks.morality.aura }}</span>
            </div>
            <dl class="virtues">
              <div>
                <dt>Self-control / Instinct</dt>
                <dd>{{ character().tracks.morality.selfControl }}</dd>
              </div>
              <div>
                <dt>Conscience / Conviction</dt>
                <dd>{{ character().tracks.morality.conscience }}</dd>
              </div>
              <div>
                <dt>Courage</dt>
                <dd>{{ character().tracks.morality.courage }}</dd>
              </div>
            </dl>
          </section>
        </div>
      </section>

      <section class="sheet-section" aria-labelledby="traits-heading">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Named traits</p>
            <h2 id="traits-heading">Positive traits</h2>
          </div>
          <span class="section-total">{{ totalGroups(character().traits.positive) }} total</span>
        </div>
        <div class="trait-grid">
          @for (group of traitGroups; track group.key) {
            <section class="list-card" [attr.aria-label]="group.label + ' positive traits'">
              <h3>
                {{ group.label }} <span>{{ total(character().traits.positive[group.key]) }}</span>
              </h3>
              @if (character().traits.positive[group.key].length) {
                @for (trait of character().traits.positive[group.key]; track trait.name) {
                  <div class="rated-row">
                    <span>{{ trait.name }}</span>
                    <span class="dot-rating" [attr.aria-label]="trait.rating + ' trait dots'">
                      @for (dot of ratingDots; track dot) {
                        <span class="dot" [class.filled]="dot <= trait.rating"></span>
                      }
                    </span>
                  </div>
                }
              } @else {
                <p class="empty-note">None recorded</p>
              }
            </section>
          }
        </div>
      </section>

      <section class="sheet-section" aria-labelledby="negative-traits-heading">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Complications</p>
            <h2 id="negative-traits-heading">Negative traits</h2>
          </div>
          <span class="section-total">{{ totalGroups(character().traits.negative) }} total</span>
        </div>
        <div class="trait-grid">
          @for (group of traitGroups; track group.key) {
            <section class="list-card" [attr.aria-label]="group.label + ' negative traits'">
              <h3>
                {{ group.label }} <span>{{ total(character().traits.negative[group.key]) }}</span>
              </h3>
              @if (character().traits.negative[group.key].length) {
                @for (trait of character().traits.negative[group.key]; track trait.name) {
                  <div class="rated-row">
                    <span>{{ trait.name }}</span>
                    <span class="item-rating">×{{ trait.rating }}</span>
                  </div>
                }
              } @else {
                <p class="empty-note">None recorded</p>
              }
            </section>
          }
        </div>
      </section>

      <div class="paired-sections">
        <section class="sheet-section" aria-labelledby="abilities-heading">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Learned skills</p>
              <h2 id="abilities-heading">Abilities</h2>
            </div>
            <span class="section-total">{{ total(character().abilities) }} total</span>
          </div>
          <div class="list-card">
            @if (character().abilities.length) {
              @for (ability of character().abilities; track ability.name) {
                <div class="rated-row">
                  <span>{{ ability.name }}</span>
                  <span class="item-rating">×{{ ability.rating }}</span>
                </div>
              }
            } @else {
              <p class="empty-note">None recorded</p>
            }
          </div>
        </section>

        <section class="sheet-section" aria-labelledby="disciplines-heading">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Powers by group</p>
              <h2 id="disciplines-heading">Disciplines</h2>
            </div>
          </div>
          <div class="discipline-list">
            @if (character().disciplines.length) {
              @for (discipline of character().disciplines; track discipline.name) {
                <section class="discipline-card" [attr.aria-label]="discipline.name">
                  <h3>{{ discipline.name }}</h3>
                  @for (power of discipline.powers; track power.name) {
                    <div class="rated-row">
                      <span>{{ power.name }}</span>
                      <span class="level">{{ power.level }}</span>
                    </div>
                  }
                </section>
              }
            } @else {
              <p class="empty-note">None recorded</p>
            }
          </div>
          <div class="sub-list">
            <h3>Other special traits</h3>
            @if (character().specialTraits.length) {
              <ul>
                @for (trait of character().specialTraits; track trait) {
                  <li>{{ trait }}</li>
                }
              </ul>
            } @else {
              <p class="empty-note">None recorded</p>
            }
          </div>
        </section>
      </div>

      <div class="paired-sections">
        <section class="sheet-section" aria-labelledby="status-heading">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Standing in the game</p>
              <h2 id="status-heading">Status</h2>
            </div>
          </div>
          <div class="list-card">
            @if (character().statusTraits.length) {
              @for (status of character().statusTraits; track status.name) {
                <div class="rated-row">
                  <span>{{ status.name }}</span>
                  <span class="item-rating">×{{ status.rating }}</span>
                </div>
              }
            } @else {
              <p class="empty-note">None recorded</p>
            }
          </div>
          <div class="sub-list">
            <h3>Rituals</h3>
            @if (character().rituals.length) {
              <ul>
                @for (ritual of character().rituals; track ritual) {
                  <li>{{ ritual }}</li>
                }
              </ul>
            } @else {
              <p class="empty-note">None recorded</p>
            }
          </div>
        </section>

        <section class="sheet-section" aria-labelledby="backgrounds-heading">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Connections and reach</p>
              <h2 id="backgrounds-heading">Backgrounds</h2>
            </div>
            <span class="section-total">{{ total(character().backgrounds) }} total</span>
          </div>
          <div class="list-card">
            @if (character().backgrounds.length) {
              @for (background of character().backgrounds; track background.name) {
                <div class="rated-row">
                  <span>{{ background.name }}</span>
                  <span class="item-rating">×{{ background.rating }}</span>
                </div>
              }
            } @else {
              <p class="empty-note">None recorded</p>
            }
          </div>
          <div class="sub-list">
            <h3>Influences</h3>
            @if (character().influences.length) {
              @for (influence of character().influences; track influence.name) {
                <div class="rated-row">
                  <span>{{ influence.name }}</span>
                  <span class="item-rating">×{{ influence.rating }}</span>
                </div>
              }
            } @else {
              <p class="empty-note">None recorded</p>
            }
          </div>
        </section>
      </div>

      <section class="sheet-section" aria-labelledby="other-details-heading">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Additional records</p>
            <h2 id="other-details-heading">Other details</h2>
          </div>
        </div>
        <div class="detail-grid">
          <section class="list-card">
            <h3>Merits</h3>
            @if (character().merits.length) {
              @for (merit of character().merits; track merit.name) {
                <div class="rated-row">
                  <span>{{ merit.name }}</span>
                  <span class="item-rating">×{{ merit.rating }}</span>
                </div>
              }
            } @else {
              <p class="empty-note">None recorded</p>
            }
          </section>
          <section class="list-card">
            <h3>Flaws</h3>
            @if (character().flaws.length) {
              @for (flaw of character().flaws; track flaw.name) {
                <div class="rated-row">
                  <span>{{ flaw.name }}</span>
                  <span class="item-rating">×{{ flaw.rating }}</span>
                </div>
              }
            } @else {
              <p class="empty-note">None recorded</p>
            }
          </section>
          <section class="list-card">
            <h3>Derangements</h3>
            <ng-container
              *ngTemplateOutlet="textList; context: { $implicit: character().derangements }"
            />
          </section>
          <section class="list-card">
            <h3>Blood bonds / Vinculum</h3>
            <ng-container
              *ngTemplateOutlet="textList; context: { $implicit: character().bloodBonds }"
            />
          </section>
          <section class="list-card">
            <h3>Boons</h3>
            <ng-container *ngTemplateOutlet="textList; context: { $implicit: character().boons }" />
          </section>
          <section class="list-card">
            <h3>Equipment</h3>
            <ng-container
              *ngTemplateOutlet="textList; context: { $implicit: character().equipment }"
            />
          </section>
          <section class="list-card">
            <h3>Health levels</h3>
            @if (character().healthLevels.length) {
              @for (level of character().healthLevels; track level.name) {
                <div class="rated-row">
                  <span>{{ level.name }}</span>
                  <span class="item-rating">×{{ level.rating }}</span>
                </div>
              }
            } @else {
              <p class="empty-note">None recorded</p>
            }
          </section>
          <section class="list-card">
            <h3>Miscellaneous traits</h3>
            <ng-container
              *ngTemplateOutlet="textList; context: { $implicit: character().miscellaneousTraits }"
            />
          </section>
        </div>
        <ng-template #textList let-items>
          @if (items.length) {
            <ul class="plain-list">
              @for (item of items; track item) {
                <li>{{ item }}</li>
              }
            </ul>
          } @else {
            <p class="empty-note">None recorded</p>
          }
        </ng-template>
      </section>

      <section class="sheet-section" aria-labelledby="notes-heading">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Storyteller and player notes</p>
            <h2 id="notes-heading">Notes</h2>
          </div>
        </div>
        <p class="notes">{{ character().notes || 'No notes recorded.' }}</p>
      </section>

      <section class="sheet-section" aria-labelledby="experience-heading">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Character progression</p>
            <h2 id="experience-heading">Experience history</h2>
          </div>
          <span class="section-total">{{ character().experience.unspent }} unspent</span>
        </div>
        @if (character().experience.history.length) {
          <div class="history-table" role="table" aria-label="Experience history">
            <div class="history-row history-header" role="row">
              <span role="columnheader">Date</span>
              <span role="columnheader">Change</span>
              <span role="columnheader">Reason</span>
            </div>
            @for (entry of character().experience.history; track $index) {
              <div class="history-row" role="row">
                <span role="cell">{{ entry.date }}</span>
                <span role="cell">{{ entry.change }}</span>
                <span role="cell">{{ entry.reason }}</span>
              </div>
            }
          </div>
        } @else {
          <p class="empty-note">No experience history recorded.</p>
        }
      </section>
    </article>
  `,
  styleUrl: './character-sheet.component.scss',
})
export class CharacterSheetComponent {
  readonly character = input.required<CharacterSheet>();
  protected readonly ratingDots = [1, 2, 3, 4, 5];
  protected readonly trackDots = Array.from({ length: 15 }, (_, index) => index + 1);
  protected readonly traitGroups = [
    { key: 'physical', label: 'Physical' },
    { key: 'social', label: 'Social' },
    { key: 'mental', label: 'Mental' },
  ] as const;

  protected total(items: readonly RatedItem[]): number {
    return items.reduce((sum, item) => sum + item.rating, 0);
  }

  protected totalGroups(groups: TraitGroups): number {
    return this.total(groups.physical) + this.total(groups.social) + this.total(groups.mental);
  }
}
