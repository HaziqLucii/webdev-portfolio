# Portfolio: ideas to make it cooler

A running backlog of enhancements. Grouped by impact. No em dashes, per house style.

## Note on taste
The neobrutalist identity is strong and intentional. Adding every flashy component
(galaxy background, glass, dock, etc.) risks turning it into a generic template.
Prefer a few interactions that reinforce the identity, plus substance that earns
interviews.

## Already installed but not yet on the page (quick wins)
These components ship in `src/` but are not rendered anywhere yet.

- [ ] Count-up stat tiles (`Components/Counter`): animate the "3+ / 13 / 70+ / CKA"
      numbers on scroll.
- [ ] Cursor spotlight on project + haro cards (`Components/SpotlightCard`).
- [ ] Typed role text (`TextAnimations/TextType`): cycle "Shopify Engineer /
      Integration Engineer / DevOps / Indie Builder".
- [ ] Consider a WebGL background (`Backgrounds/Galaxy` or `DarkVeil`) only if it
      does not fight the flat brutalist look. Keep it very subtle or skip.

## Tier 2: substance that gets you hired
- [ ] Project case-study modals: click a project for problem, approach, and impact
      with real metrics. The haro carousel is the template.
- [ ] Downloadable CV (PDF button).
- [ ] Testimonials / recommendations running in a Marquee.
- [ ] Live GitHub activity or a "currently building" note.

## Tier 3: on-brand technical flex
- [ ] "Ask my portfolio" AI chat: a command box where a recruiter asks a question
      and a Claude-powered answer comes back over the CV. Needs a small serverless
      proxy to hold the API key. Most on-brand, given the AI product work.
- [ ] Command palette (Cmd K) to jump between sections.
- [ ] Wire up PostHog analytics (already used professionally).

## Tier 4: craft signals
- [ ] `prefers-reduced-motion` support across the animations.
- [ ] Lighthouse ~100: lazy-load the WebGL / 3D bundles.
- [ ] OG social-share card + favicon.
- [ ] View Transitions API for smoother section changes.

## Top picks to build first
1. Case-study deep-dives (converts visitors to interviews).
2. "Ask my portfolio" AI bot (unforgettable and perfectly on-brand).
