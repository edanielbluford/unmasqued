import { TestBed } from '@angular/core/testing';
import { DEMO_CHARACTERS } from '../data-access/demo-characters';
import { CharacterSheetComponent } from './character-sheet.component';

describe('CharacterSheetComponent', () => {
  it('renders the sheet using the source character-section groupings', async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSheetComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(CharacterSheetComponent);
    fixture.componentRef.setInput('character', DEMO_CHARACTERS[0]);
    await fixture.whenStable();

    const sheet = fixture.nativeElement as HTMLElement;
    expect(sheet.querySelector('h1')?.textContent).toContain('Evelyn Thorne');
    expect(sheet.textContent).toContain('Night-shift paramedic');
    expect(sheet.textContent).toContain('Identity');
    expect(sheet.textContent).toContain('Tracks & morality');
    expect(sheet.textContent).toContain('Positive traits');
    expect(sheet.textContent).toContain('Negative traits');
    expect(sheet.textContent).toContain('Physical');
    expect(sheet.textContent).toContain('Medicine');
    expect(sheet.textContent).toContain('Disciplines');
    expect(sheet.textContent).toContain('Beastcraft');
    expect(sheet.textContent).toContain('Backgrounds');
    expect(sheet.textContent).toContain('Experience history');
  });

  it('renders trait ratings and track totals accessibly', async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSheetComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(CharacterSheetComponent);
    fixture.componentRef.setInput('character', DEMO_CHARACTERS[0]);
    await fixture.whenStable();

    const sheet = fixture.nativeElement as HTMLElement;
    expect(sheet.querySelector('[aria-label="3 trait dots"]')).not.toBeNull();
    expect(sheet.querySelector('[aria-label="8 of 15"]')).not.toBeNull();
  });
});
