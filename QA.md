# Homepage checks

Checked 22 September 2026.

## Passed

- JavaScript syntax check with `node --check script.js`.
- All local HTML asset references exist; all homepage fragment links resolve to an element.
- Browser inspection at desktop and mobile widths. Narrow-screen hero overflow found and corrected; document width equals viewport width at 320px locally and 319px in the published preview. The 390px phone layout and 992px desktop layout were visually inspected.
- Gallery filtering: All = 6, 3D = 3, Illustration = 2, Motion = 1. Pressed state and live status text update.
- Project detail dialog opens with correct artwork and description; Escape closes it and returns focus to the card.
- Comparison slider responds to keyboard End, Home and arrow keys, and updates the split percentage and accessible value text.
- Mobile menu opens, navigates to the requested section and closes. Verified on the published HTTPS site.
- Loaded images have nonzero natural dimensions; no broken image detected in local or live checks.
- No browser error-level messages in local checks.
- Film link opens the original YouTube page, titled WTFO, by Tan Ming Jie. Playback controls are present. A full end-to-end viewing of the film was not performed.
- GitHub Pages build completed successfully, and the live homepage was opened in the browser.

## Scope and limitations

- This is the homepage phase. Full galleries, individual case studies, dedicated About and Contact pages remain for Claude.
- The film deliberately opens on YouTube. An embedded player remained blank in the test browser, so the final implementation uses an explicit external link.
- Contact uses mailto. No email was sent during testing, and no contact-form backend exists.
- Project descriptions are brief visual/editorial summaries. The original portfolio is the source for facts; additional production credits and dates should be verified with the user before adding them.
- Accessibility checks are limited to structure, focus behavior, keyboard controls, image alternatives and reduced-motion CSS; this is not a formal accessibility certification.

Result: homepage ready for review and continuation.


## Creative-agency refresh — 23 September 2026

- New typography, palette, scroll artwork stage and editorial sections visually checked on desktop and phone layouts.
- Native scroll updates verified: artwork canvas progressed from scale 0.957 to 1, image parallax to -3%, graphic rotation changed, and the text band translated with scrolling.
- Section reveals observed; gallery filters still reveal the correct matching projects. Artwork dialog and Escape behavior rechecked.
- Mobile menu navigates and closes. Narrow-screen heading overflow was corrected; at 320px the document fits the 305px content viewport (15px scrollbar), without horizontal overflow.
- Footer motion toggle tested both ways. Motion-off removes the motion class, changes the artwork stage to non-sticky positioning and leaves zero hidden reveal targets. OS reduced-motion uses the same disabled-motion branch plus CSS media rules; the OS setting itself was not changed during testing.
- Browser error log empty during local checks. JavaScript syntax check passed.
- Styles/scripts use a version query to avoid mixing old cached presentation files with the revised markup.
