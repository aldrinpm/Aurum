import source from "../assets/aurum/aurum.html?raw";
import threeRuntime from "../assets/aurum/three.min.js?raw";

const BOOKING_BRIDGE = `
<script>
(function () {
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t && typeof t.closest === 'function' && t.closest('.peek')) {
      e.stopPropagation();
      e.preventDefault();
      try { parent.postMessage({ liquidMetalButton: { type: 'activate', source: 'explore' } }, '*'); } catch (err) {}
    }
  }, true);
})();
</script>
`;

/**
 * The AURUM landing page, assembled from the authored threeui source
 * (`public/landing-pages/aurum.html` in the upstream repo).
 *
 * The upstream document is kept as the single source of truth for the WebGL
 * scene, the entrance reveals, the scroll choreography and the section copy.
 * What changes for AURUM:
 *
 *   1. the external `<script src="secret-pathways-assets/three.min.js">` is
 *      replaced with an inline `<script data-threeui-three-runtime>` (the
 *      srcDoc iframe cannot resolve the relative asset), and a small capture
 *      phase click bridge is injected so the hero preview CTA (`.peek`)
 *      forwards activation to the parent window — where React opens the
 *      booking flow;
 *   2. the `<section class="hero" id="hero">…</section>` block is swapped for
 *      the AURUM-adapted hero markup.
 */
export function buildAurumDocument(heroMarkup: string): string {
  let doc = source;

  doc = doc.replace(
    '<script src="secret-pathways-assets/three.min.js"></script>',
    '<script data-threeui-three-runtime>' + threeRuntime + "</script>",
  );

  const startMarker = '<section class="hero" id="hero"';
  const start = doc.indexOf(startMarker);
  const endMarker = "</section>";
  const end = doc.indexOf(endMarker, start) + endMarker.length;
  doc = doc.slice(0, start) + heroMarkup + doc.slice(end);

  const bodyEnd = doc.indexOf("</body>");
  doc = doc.slice(0, bodyEnd) + BOOKING_BRIDGE + doc.slice(bodyEnd);

  return doc;
}