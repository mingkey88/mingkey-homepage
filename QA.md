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
