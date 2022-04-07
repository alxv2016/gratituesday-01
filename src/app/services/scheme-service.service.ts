import {Inject, Injectable, Renderer2} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import {BreakpointObserver, MediaMatcher} from '@angular/cdk/layout';
import {DOCUMENT} from '@angular/common';

// Our dark mode interface
export interface SchemePreference {
  scheme: string;
}
// Initial state for dark mode
const schemePreference: SchemePreference = {
  scheme: 'auto',
};

@Injectable({
  providedIn: 'root',
})
export class SchemeService {
  private storageKey = 'color-scheme';
  // Our behaviourSubject store
  private _initialState = new Subject<SchemePreference>();
  // Dark mode state's subscription to detect user preference settings
  schemeState$ = this.checkDarkMode().pipe(switchMap((_) => this._initialState.asObservable()));
  constructor(@Inject(DOCUMENT) private document: Document, private mediaMatcher: MediaMatcher) {
    // initiate dark mode check
    this.getColorPreference();
  }

  private getColorPreference() {
    const storagekey = localStorage.getItem(this.storageKey);
    // Check in local storage first
    if (storagekey && storagekey !== 'auto') {
      schemePreference.scheme = localStorage.getItem(this.storageKey)!;
      this._initialState.next(schemePreference);
      this.setPreference(schemePreference.scheme);
    } else {
      // If no key has been set check user preference
      this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches
        ? (schemePreference.scheme = 'dark')
        : (schemePreference.scheme = 'light');
      this._initialState.next(schemePreference);
      this.setPreference(schemePreference.scheme);
    }
  }
  // Set the preference
  private setPreference(scheme: string) {
    localStorage.setItem(this.storageKey, scheme);
    this.reflectPreference(scheme);
  }

  private reflectPreference(scheme: string): void {
    const doc = this.document.firstElementChild;
    switch (true) {
      case scheme === 'dark':
        doc?.setAttribute('color-scheme', 'dark');
        break;
      case scheme === 'light':
        doc?.setAttribute('color-scheme', 'light');
        break;
      case scheme === 'dim':
        doc?.setAttribute('color-scheme', 'dim');
        break;
      default:
        doc?.setAttribute('color-scheme', 'auto');
    }
  }

  // Observes match media event changes through media matcher
  private checkDarkMode(): Observable<any> {
    return fromEvent<MediaQueryListEvent>(this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)'), 'change').pipe(
      map((state) => {
        if (state.matches) {
          schemePreference.scheme = 'dark';
          this.setPreference(schemePreference.scheme);
        }
        return schemePreference;
      }),
      catchError((_) => {
        return of(schemePreference);
      })
    );
  }

  selectScheme(scheme: string): void {
    schemePreference.scheme = scheme;
    this._initialState.next(schemePreference);
    this.setPreference(schemePreference.scheme);
  }

  getColorScheme(): string {
    if (localStorage.getItem('color-scheme') !== null) {
      return localStorage.getItem('color-scheme')!;
    }
    return 'auto';
  }
}
