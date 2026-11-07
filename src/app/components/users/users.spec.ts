import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Users } from './users';

describe('Users', () => {
  let fixture: ComponentFixture<Users>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Users],
    }).compileComponents();

    fixture = TestBed.createComponent(Users);
    element = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  function rows(listId: string): HTMLLIElement[] {
    return Array.from(element.querySelectorAll<HTMLLIElement>(`#${listId} li`));
  }

  function click(label: string): void {
    const button = Array.from(element.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === label,
    );
    button!.click();
  }

  it('should render the six users in each list', () => {
    expect(rows('by-id').map((li) => li.textContent?.trim())).toEqual([
      'Amelina Grindley',
      'Marlo Bains',
      'Astra Crampin',
      'Donavon Lismer',
      'Rennie Petri',
      'Stan Jacquet',
    ]);
    expect(rows('by-index')).toHaveLength(6);
    expect(rows('by-identity')).toHaveLength(6);
  });

  it('should keep the DOM nodes on refresh when tracking by id', async () => {
    const before = rows('by-id');

    click('Refresh');
    await fixture.whenStable();

    rows('by-id').forEach((li, i) => expect(li).toBe(before[i]));
  });

  it('should recreate the DOM nodes on refresh when tracking by object identity', async () => {
    const before = rows('by-identity');

    click('Refresh');
    await fixture.whenStable();

    rows('by-identity').forEach((li, i) => expect(li).not.toBe(before[i]));
  });

  it('should render the empty block when there are no users', async () => {
    click('Clear');
    await fixture.whenStable();

    expect(rows('by-id').map((li) => li.textContent?.trim())).toEqual(['No users']);
  });
});
