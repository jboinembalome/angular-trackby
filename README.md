# Angular trackBy

Source code used in the article [Enhancing User Experience with TrackBy in Angular](https://blouppy.com/blog/2023-05-19-enhancing-ue-trackby-angular/) on the [Blouppy](https://blouppy.com) website.

The page renders the same list of users three times with `@for`, each with a different `track` expression
(`user.id`, `$index` and the object itself), and three buttons:

- **Refresh** reloads the users as new objects with the same ids, as an API call would.
- **Add a user at the top** prepends one user and keeps the other objects.
- **Clear** empties the list to show the `@empty` block.

`npm run dom-changes` builds nothing itself: after `npm run build`, it serves `dist/`, clicks each button in
Chromium (Playwright) and prints how many `<li>` elements each list created and removed, and how many text
nodes it wrote, as seen by a `MutationObserver`.

## Project type

- Angular project: standalone components, signals, built-in control flow, zoneless change detection.

## Project version

- Angular 22. This project was generated with [Angular CLI](https://angular.dev/tools/cli) version 22.2.6.
- Node.js 22.

## Run it

```bash
npm ci
npm start                       # ng serve, then open http://localhost:4200/
npx ng test --watch=false       # unit tests (Vitest)
npm run build
npx playwright install chromium # once, if Playwright has no browser yet
npm run dom-changes             # count the DOM work of each track expression
```

## Give a Star! :star:

If you like or are using this project please give it a star. Thanks!

## Support this project! :pray:

If you want to help me to maintain this project or add improvements, it would be a pleasure!
