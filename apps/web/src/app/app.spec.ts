import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { CharacterDirectoryPage } from './features/characters/pages/character-directory.page';
import { CharacterDetailPage } from './features/characters/pages/character-detail.page';

describe('character routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
  });

  it('lists the demo player characters and links to their sheets', async () => {
    const harness = await RouterTestingHarness.create();
    const directory = await harness.navigateByUrl(
      '/games/sable-harbor/characters',
      CharacterDirectoryPage,
    );

    const directoryElement = harness.routeNativeElement;
    expect(directoryElement?.querySelectorAll('.character-card')).toHaveLength(1);
    expect(directoryElement?.textContent).toContain('Evelyn Thorne');
    expect(directoryElement?.textContent).not.toContain('Rowan Pike');
    expect(directoryElement?.querySelector('a[href*="evelyn-thorne"]')).not.toBeNull();
  });

  it('opens a character sheet and handles unknown character IDs', async () => {
    const harness = await RouterTestingHarness.create();
    const router = TestBed.inject(Router);

    await harness.navigateByUrl(
      '/games/sable-harbor/characters/evelyn-thorne',
      CharacterDetailPage,
    );
    expect(harness.routeNativeElement?.textContent).toContain('Evelyn Thorne');
    expect(harness.routeNativeElement?.textContent).toContain('Medicine');

    await router.navigateByUrl('/games/sable-harbor/characters/missing-character');
    await harness.fixture.whenStable();
    expect(harness.routeNativeElement?.textContent).toContain("We couldn't find that character.");
  });
});
