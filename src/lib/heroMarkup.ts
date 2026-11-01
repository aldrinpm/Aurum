export const HERO_MARKUP = `
<section class="hero" id="hero" data-cam="0">
  <div class="hero-top">
    <div class="eyebrow" data-rv="fade"><span class="dot"></span> Chapter 00 — The Arrival</div>
    <h1 class="display h-hero">
      <span class="mask-line"><span>A stay</span></span>
      <span class="mask-line"><span>refined</span></span>
      <span class="mask-line"><span>after dark.</span></span>
    </h1>
    <p class="hero-sub body" data-rv="up">A boutique hotel of composed nights — curated rooms, quiet luxury, and a
      concierge that never sleeps.</p>
  </div>

  <div class="hero-spacer"></div>

  <div class="hero-foot">
    <div class="hero-cue" data-rv="fade"><span>Scroll to reserve</span><span class="track"><i></i></span></div>
    <div class="chapters" id="chips">
      <div class="chip" data-chip="0" data-rv="up" data-cursor><span class="num">01</span>
        <span class="tx"><b>Prime Location</b><p>In the heart of the city, steps from everything.</p></span></div>
      <div class="chip" data-chip="1" data-rv="up" data-cursor><span class="num">02</span>
        <span class="tx"><b>Rooms & Suites</b><p>Curated spaces designed for deep rest.</p></span></div>
      <div class="chip" data-chip="2" data-rv="up" data-cursor><span class="num">03</span>
        <span class="tx"><b>Honest Rates</b><p>Upfront nightly rates. No hidden fees.</p></span></div>
      <div class="chip" data-chip="3" data-rv="up" data-cursor><span class="num">04</span>
        <span class="tx"><b>24/7 Concierge</b><p>Requests answered at any hour, every day.</p></span></div>
    </div>
  </div>

  <a class="peek" href="#pathways" data-view="3" data-rv="fade" data-cursor aria-label="Preview: A suite, before you arrive">
    <!-- data-frame, or the live view is blitted over the whole anchor and
         runs on down behind the caption instead of stopping at the frame -->
    <span class="peek-fr" data-frame style="background:linear-gradient(180deg, rgba(3,6,9,.04) 24%, rgba(3,6,9,.48) 100%), url('https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/6884c5281949d2c3530ad4cf/kage-sanmon-preview.webp') center / cover no-repeat;"></span>
    <span class="peek-play"><svg viewBox="0 0 22 22" fill="none"><path d="M8 5.6 16.4 11 8 16.4z" fill="#dfe7e0"/></svg></span>
    <span class="peek-cap"><i>A suite, before you arrive</i></span>
  </a>

  <div class="word-fb" aria-hidden="true">AURUM</div>

  <div class="hero-side" data-rv="up">
  </div>
</section>
`;
