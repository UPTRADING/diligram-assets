// Netlify Edge Function: replace-hero.js
// Injected via post-hydration script to survive Next.js DOM reconciliation.

export const config = { path: "/" };

const BG = "https://cdn.jsdelivr.net/gh/UPTRADING/diligram-assets@main/arch5_hero.jpg";

const HERO_CSS = `<style id="dlg-hero-styles">
/* Hide original hero section AND original nav */
section[class*="h-\\[80vh\\]"] { display: none !important; }
nav.z-30 { display: none !important; }
/* Remove negative pull-up margin that overlapped the old h-[80vh] hero */
section[class*="-mt-40"] { margin-top: 0 !important; }

/* === BODY HIDER (CSS-only, no JS, no React-reconcilable nodes) === */
/* Until dlg-hero is in the DOM, paint the page dark and hide ALL body content. */
/* Uses :has() — supported in Chrome 105+, Safari 15.4+, Firefox 121+ (Dec 2023). */
html:not(:has(#dlg-hero)) { background: #0a1628 !important; }
html:not(:has(#dlg-hero)) body { background: #0a1628 !important; }
html:not(:has(#dlg-hero)) body > * { visibility: hidden !important; }
/* Show a centred spinner painted via ::before on <html> (no DOM node needed) */
html:not(:has(#dlg-hero))::before {
  content: "";
  position: fixed; inset: 0; z-index: 2147483647;
  background:
    radial-gradient(circle at center, transparent 22px, transparent 24px) ,
    #0a1628;
  pointer-events: none;
}
html:not(:has(#dlg-hero))::after {
  content: "";
  position: fixed; top: 50%; left: 50%; width: 42px; height: 42px;
  margin: -21px 0 0 -21px;
  border: 3px solid rgba(255,255,255,.15);
  border-top-color: #f5b700;
  border-radius: 50%;
  z-index: 2147483647;
  animation: dlgspin 0.8s linear infinite;
}
@keyframes dlgspin { to { transform: rotate(360deg); } }

#dlg-hero, #dlg-hero * { box-sizing: border-box; }
#dlg-hero a { text-decoration: none; color: inherit; }
#dlg-hero ul { list-style: none; margin: 0; padding: 0; }

/* Hero container — fixed viewport height, clips everything inside */
#dlg-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 720px;
  overflow: hidden;
  overflow-x: hidden;
  background: #0a1628;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  color: #fff;
}

/* Background image */
#dlg-bg {
  position: absolute;
  inset: 0;
  background: url('${BG}') center/cover no-repeat;
  z-index: 1;
}

/* Dark gradient overlay */
#dlg-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(5,15,30,.85) 0%, rgba(5,15,30,.55) 45%, rgba(5,15,30,.25) 100%),
    linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,.35) 100%);
  z-index: 2;
}

/* Nav */
#dlg-nav {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 56px;
}
#dlg-logo img {
  width: auto;
  height: 38px;
  max-width: 220px;
  display: block;
  object-fit: contain;
  filter: brightness(0) invert(1);
}
#dlg-nav-links {
  display: flex;
  align-items: center;
  gap: 36px;
}
#dlg-nav-links a {
  color: #e8edf5;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.3px;
  transition: opacity .2s;
}
#dlg-nav-links a:hover { opacity: 0.7; }

/* Mobile hamburger */
#dlg-mob-chk { display: none; }
#dlg-burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  z-index: 30;
}
#dlg-burger span {
  display: block;
  height: 2px;
  border-radius: 2px;
  background: #fff;
  transition: transform .25s, opacity .25s;
}
#dlg-mob-menu {
  display: none;
  position: absolute;
  top: 0; left: 0; right: 0;
  background: rgba(5,15,30,.97);
  padding: 76px 28px 36px;
  z-index: 25;
  flex-direction: column;
}
#dlg-mob-menu li { border-bottom: 1px solid rgba(255,255,255,.09); }
#dlg-mob-menu li a { display: block; padding: 15px 0; color: #e8edf5; font-size: 17px; font-weight: 500; }
#dlg-mob-close-row { position: absolute; top: 18px; right: 20px; }
#dlg-mob-close-btn { color: #fff; font-size: 26px; line-height: 1; padding: 4px 8px; cursor: pointer; }
#dlg-mob-cta-wrap { margin-top: 28px; }
#dlg-mob-cta { display: inline-block; background: #f5b700; color: #0a1628; padding: 14px 32px; border-radius: 6px; font-weight: 700; font-size: 15px; }
#dlg-hero:has(#dlg-mob-chk:checked) #dlg-mob-menu { display: flex; }
#dlg-hero:has(#dlg-mob-chk:checked) #dlg-burger span:nth-child(1) { transform: rotate(45deg) translateY(7px); }
#dlg-hero:has(#dlg-mob-chk:checked) #dlg-burger span:nth-child(2) { opacity: 0; }
#dlg-hero:has(#dlg-mob-chk:checked) #dlg-burger span:nth-child(3) { transform: rotate(-45deg) translateY(-7px); }

/* Hero content */
#dlg-content {
  position: relative;
  z-index: 5;
  max-width: 1180px;
  margin: 0 auto;
  padding: 110px 56px 0;
}
.dlg-kicker {
  display: inline-block;
  white-space: nowrap;
  font-size: 12px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #f5b700;
  font-weight: 700;
  margin-bottom: 18px;
  padding: 6px 12px;
  border: 1px solid rgba(245,183,0,.4);
  border-radius: 4px;
  background: rgba(245,183,0,.08);
}
#dlg-content h1 {
  font-size: clamp(2.2rem, 5vw, 4.6rem);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -1.5px;
  max-width: 980px;
  margin: 0 0 22px;
  text-shadow: 0 4px 24px rgba(0,0,0,.6);
  color: #fff;
}
.dlg-gold { color: #f5b700; }
.dlg-sub {
  font-size: clamp(1.05rem, 1.5vw, 1.4rem);
  line-height: 1.5;
  color: #cfd6e2;
  max-width: 640px;
  margin: 0 0 38px;
  font-weight: 400;
}
.dlg-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #f5b700;
  color: #0a1628 !important;
  padding: 14px 32px !important;
  min-height: 52px;
  box-sizing: border-box;
  border-radius: 6px !important;
  font-weight: 600;
  font-size: 15px !important;
  line-height: 1.5;
  letter-spacing: .5px;
  box-shadow: 0 8px 24px rgba(245,183,0,.3);
  transition: transform .2s, box-shadow .2s;
}
.dlg-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(245,183,0,.45); }

/* Yellow CTA buttons — target only action buttons (have gap-3 class), NOT LinkedIn badge circles */
a[class*="bg-primary"][class*="gap-3"] {
  background-color: #f5b700 !important;
  background-image: none !important;
  color: #0a1628 !important;
  box-shadow: 0 8px 24px rgba(245,183,0,.30) !important;
  transition: background-color .2s, transform .2s, box-shadow .2s !important;
}
a[class*="bg-primary"][class*="gap-3"]:hover {
  background-color: #e0a800 !important;
  box-shadow: 0 12px 32px rgba(245,183,0,.45) !important;
}
a[class*="bg-primary"][class*="gap-3"] span,
a[class*="bg-primary"][class*="gap-3"] svg { color: #0a1628 !important; }
/* Inner arrow circle stays white background, dark icon */
a[class*="bg-primary"][class*="gap-3"] span[class*="bg-white"] { background-color: #fff !important; }

/* Yellow LinkedIn badges on team cards */
a[aria-label^="LinkedIn profile of"][class*="bg-primary"] {
  background-color: #f5b700 !important;
  color: #0a1628 !important;
}
a[aria-label^="LinkedIn profile of"][class*="bg-primary"]:hover {
  background-color: #e0a800 !important;
}
a[aria-label^="LinkedIn profile of"][class*="bg-primary"] svg { color: #0a1628 !important; fill: #0a1628 !important; }

/* Proof bar — pinned to bottom like the mockup */
#dlg-proof {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  z-index: 5;
  background: linear-gradient(180deg, rgba(5,15,30,0) 0%, rgba(5,15,30,.85) 100%);
  padding: 28px 56px 32px;
}
#dlg-proof-inner {
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  text-align: center;
}
.dlg-stat-big { display: block; font-size: 28px; font-weight: 800; color: #fff; letter-spacing: -.5px; }
.dlg-stat-label { display: block; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #8a96a8; margin-top: 4px; }
/* Text tiles: same size as numeric tiles, just tighter line-height for wrapping */
.dlg-tile-text .dlg-stat-big { font-size: 28px; font-weight: 800; line-height: 1.15; letter-spacing: -.3px; }
.dlg-tile-text .dlg-stat-label { margin-top: 6px; }

/* Tablet */
@media (max-width: 1024px) {
  #dlg-nav { padding: 20px 32px; }
  #dlg-content { padding: 80px 32px 0; }
  #dlg-proof { padding: 24px 32px 28px; }
}
/* Mobile — flexbox column layout, proof bar in normal flow */
@media (max-width: 767px) {
  /* Hero is a flex column: [nav] [content] [proof] — NO absolute proof bar */
  #dlg-hero {
    height: auto !important;
    min-height: 100vh;
    min-height: 100dvh;
    display: flex !important;
    flex-direction: column !important;
  }
  #dlg-nav { flex: 0 0 auto; padding: 16px 20px; }
  #dlg-nav-links { display: none; }
  #dlg-burger { display: flex; }

  /* Content stretches to fill middle, vertically centred */
  #dlg-content {
    flex: 1 !important;
    padding: 20px 20px 28px !important;
    max-width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
  }

  /* Proof bar: remove absolute, sit naturally at bottom of flex column */
  #dlg-proof {
    position: relative !important;
    bottom: auto !important;
    left: auto !important;
    right: auto !important;
    background: rgba(5,15,30,.92) !important;
    padding: 16px 20px 22px !important;
  }
  #dlg-proof-inner { grid-template-columns: repeat(2, 1fr); gap: 12px 8px; }

  /* Typography */
  #dlg-content h1 { font-size: 2.6rem; line-height: 1.02; letter-spacing: -1.2px; margin: 0 0 14px; }
  .dlg-kicker {
    align-self: flex-start !important;
    display: inline-block !important;
    width: auto !important;
    max-width: 100% !important;
    text-align: left !important;
    font-size: 11px;
    letter-spacing: 1.4px;
    white-space: nowrap;
    overflow: visible;
    line-height: 1.2;
    padding: 4px 9px;
    border-radius: 3px;
    margin-bottom: 14px;
  }
  .dlg-sub { font-size: 0.9rem; line-height: 1.5; margin: 0 0 20px; }
  .dlg-cta { padding: 12px 24px !important; min-height: 46px; font-size: 14px !important; align-self: flex-start; }
  .dlg-stat-big { font-size: 19px; }
  .dlg-tile-text .dlg-stat-big { font-size: 19px; }
  .dlg-stat-label { font-size: 10px; letter-spacing: 1px; }
}
@media (max-width: 380px) { .dlg-stat-big { font-size: 17px; } .dlg-tile-text .dlg-stat-big { font-size: 17px; } }

/* Weglot translate widget — DESKTOP UNTOUCHED elsewhere; on the home page we hide it
   entirely and provide our own inline switcher inside the nav (desktop) and burger (mobile). */
.weglot-container { display: none !important; }

/* Inline language switcher — sits in the nav next to Contact */
.dlg-lang-switch { display: inline-flex; align-items: center; gap: 8px; margin-left: 18px; }
.dlg-lang-switch a {
  display: inline-flex; align-items: center; justify-content: center;
  width: 26px; height: 18px; padding: 0; border-radius: 3px;
  overflow: hidden; opacity: 0.55; transition: opacity .2s, transform .2s;
  background: transparent;
}
.dlg-lang-switch a:hover { opacity: 1; transform: translateY(-1px); }
.dlg-lang-switch a.dlg-lang-current { opacity: 1; cursor: default; pointer-events: none; box-shadow: 0 0 0 2px rgba(245,183,0,.7); }
.dlg-lang-switch img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* Mobile burger menu version — bigger flags, centered row */
#dlg-mob-lang { display: flex; gap: 14px; justify-content: center; margin-top: 28px; padding-top: 22px; border-top: 1px solid rgba(255,255,255,.09); }
#dlg-mob-lang a {
  display: inline-flex; align-items: center; justify-content: center;
  width: 44px; height: 30px; border-radius: 4px; overflow: hidden;
  opacity: 0.55; transition: opacity .2s, transform .2s; background: transparent;
}
#dlg-mob-lang a.dlg-lang-current { opacity: 1; cursor: default; pointer-events: none; box-shadow: 0 0 0 2px rgba(245,183,0,.8); }
#dlg-mob-lang img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* ===== French language overrides — FR copy is ~30-50% longer than EN, so scale down ===== */
/* Note: React/Next hydration on fr.* may reset html[lang="en"], so also use .dlg-fr class set by JS */
html[lang^="fr"] #dlg-content h1,
html.dlg-fr #dlg-content h1,
:lang(fr) #dlg-content h1 {
  font-size: clamp(1.8rem, 3.4vw, 3.2rem);
  letter-spacing: -1px;
  line-height: 1.04;
}
html[lang^="fr"] .dlg-sub,
html.dlg-fr .dlg-sub,
:lang(fr) .dlg-sub {
  font-size: clamp(0.95rem, 1.15vw, 1.1rem);
  line-height: 1.5;
  margin-bottom: 24px;
}
html[lang^="fr"] .dlg-kicker,
html.dlg-fr .dlg-kicker,
:lang(fr) .dlg-kicker {
  font-size: 11px;
  letter-spacing: .8px;
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
  line-height: 1.35;
  padding: 6px 12px;
}
/* Desktop FR proof-bar: shrink stats so longer French labels don't blow up */
html[lang^="fr"] #dlg-content,
html.dlg-fr #dlg-content,
:lang(fr) #dlg-content { padding-top: 90px; }
html[lang^="fr"] .dlg-stat-big,
html.dlg-fr .dlg-stat-big,
:lang(fr) .dlg-stat-big { font-size: 22px; }
html[lang^="fr"] .dlg-stat-label,
html.dlg-fr .dlg-stat-label,
:lang(fr) .dlg-stat-label { font-size: 9px; letter-spacing: .8px; line-height: 1.3; }
html[lang^="fr"] #dlg-proof-inner,
html.dlg-fr #dlg-proof-inner,
:lang(fr) #dlg-proof-inner { gap: 20px; }
html[lang^="fr"] #dlg-proof,
html.dlg-fr #dlg-proof,
:lang(fr) #dlg-proof { padding: 22px 56px 26px; }
@media (max-width: 767px) {
  html[lang^="fr"] #dlg-content h1,
  html.dlg-fr #dlg-content h1,
  :lang(fr) #dlg-content h1 {
    font-size: 1.95rem;
    letter-spacing: -0.6px;
    line-height: 1.08;
  }
  html[lang^="fr"] .dlg-kicker,
  html.dlg-fr .dlg-kicker,
  :lang(fr) .dlg-kicker {
    font-size: 9px;
    letter-spacing: 0.6px;
    white-space: nowrap;
    padding: 4px 8px;
  }
  html[lang^="fr"] .dlg-sub,
  html.dlg-fr .dlg-sub,
  :lang(fr) .dlg-sub { font-size: 0.85rem; line-height: 1.5; }
  html[lang^="fr"] .dlg-stat-big,
  html.dlg-fr .dlg-stat-big,
  :lang(fr) .dlg-stat-big { font-size: 16px; }
  html[lang^="fr"] .dlg-stat-label,
  html.dlg-fr .dlg-stat-label,
  :lang(fr) .dlg-stat-label { font-size: 9px; letter-spacing: .6px; }
}

</style>`;

const INJECT_SCRIPT = `<script id="dlg-inject">(function(){
// Strip preloads that will fire "preloaded but not used" warnings:
// 1) Our CDN images with fetchpriority="low" (below-fold, won't fire before the 3s timer)
// 2) Next.js dynamically-injected preloads for hero_bg and reviews_bg (we replace/hide them)
// Also attach a MutationObserver to catch preloads injected dynamically by Next.js AFTER this script.
function stripStalePreloads(){
  try {
    var all = document.querySelectorAll('link[rel="preload"][as="image"], link[rel="preload"][as="script"]');
    for (var i = 0; i < all.length; i++) {
      var el = all[i]; var href = el.href || '';
      var isLow = (el.getAttribute('fetchpriority') || el.getAttribute('fetchPriority') || '').toLowerCase() === 'low';
      var isStaleNext = /hero_bg|reviews_bg/.test(href);
      if ((isLow || isStaleNext) && el.parentNode) el.parentNode.removeChild(el);
    }
  } catch(e){}
}
stripStalePreloads();
// Catch any preloads Next.js injects dynamically after hydration
if (typeof MutationObserver !== 'undefined') {
  var _pmo = new MutationObserver(function(mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var nodes = mutations[i].addedNodes;
      for (var j = 0; j < nodes.length; j++) {
        var n = nodes[j];
        if (n.nodeType === 1 && n.tagName === 'LINK' && n.rel === 'preload') {
          var h = n.href || ''; var fp = (n.getAttribute('fetchpriority') || n.getAttribute('fetchPriority') || '').toLowerCase();
          if (fp === 'low' || /hero_bg|reviews_bg/.test(h)) { try { n.parentNode && n.parentNode.removeChild(n); } catch(e){} }
        }
      }
    }
  });
  if (document.head) _pmo.observe(document.head, { childList: true });
  // Stop after 10s
  setTimeout(function(){ _pmo.disconnect(); }, 10000);
}
var LOGO = '/_next/image?url=%2Fimages%2Flogo.png&w=384&q=75';
var BG   = '${BG}';
var H =
  '<section id="dlg-hero" aria-label="Hero">'
+ '<div id="dlg-bg" aria-hidden="true"></div>'
+ '<div id="dlg-overlay" aria-hidden="true"></div>'
+ '<input type="checkbox" id="dlg-mob-chk" aria-hidden="true">'
+ '<nav id="dlg-nav" aria-label="Main navigation">'
+   '<a href="/" id="dlg-logo" aria-label="Diligram home">'
+     '<img src="'+LOGO+'" alt="Diligram" height="38" loading="eager" style="width:auto;max-width:220px;height:38px;object-fit:contain;filter:brightness(0) invert(1);display:block;">'
+   '</a>'
+   '<ul id="dlg-nav-links" role="list">'
+     '<li><a href="#" data-disabled="1">Challenge</a></li>'
+     '<li><a href="/#solution">Solution</a></li>'
+     '<li><a href="/#products">Products</a></li>'
+     '<li><a href="/#team">Team</a></li>'
+     '<li><a href="/#contact">Contact</a></li>'
+     '<li class="dlg-lang-switch" aria-label="Language">'
+       '<a href="https://www.diligram.com/" class="dlg-lang-en" aria-label="English" hreflang="en"><img src="https://cdn.weglot.com/flags/rectangle_mat/gb.svg" alt="English"></a>'
+       '<a href="https://fr.diligram.com/" class="dlg-lang-fr" aria-label="Français" hreflang="fr"><img src="https://cdn.weglot.com/flags/rectangle_mat/fr.svg" alt="Français"></a>'
+     '</li>'
+   '</ul>'
+   '<label for="dlg-mob-chk" id="dlg-burger" aria-label="Open menu"><span></span><span></span><span></span></label>'
+ '</nav>'
+ '<div id="dlg-mob-menu" role="dialog" aria-label="Mobile navigation">'
+   '<div id="dlg-mob-close-row"><label for="dlg-mob-chk" id="dlg-mob-close-btn" aria-label="Close menu">&#x2715;</label></div>'
+   '<ul role="list">'
+     '<li><a href="#" data-disabled="1">Challenge</a></li>'
+     '<li><a href="/#solution">Solution</a></li>'
+     '<li><a href="/#products">Products</a></li>'
+     '<li><a href="/#team">Team</a></li>'
+     '<li><a href="/#contact">Contact</a></li>'
+   '</ul>'
+   '<div id="dlg-mob-lang" aria-label="Language">'
+     '<a href="https://www.diligram.com/" class="dlg-lang-en" aria-label="English" hreflang="en"><img src="https://cdn.weglot.com/flags/rectangle_mat/gb.svg" alt="English"></a>'
+     '<a href="https://fr.diligram.com/" class="dlg-lang-fr" aria-label="Français" hreflang="fr"><img src="https://cdn.weglot.com/flags/rectangle_mat/fr.svg" alt="Français"></a>'
+   '</div>'
+ '</div>'
+ '<div id="dlg-content">'
+   '<span class="dlg-kicker">Diligram &nbsp;&middot;&nbsp; Powering Regulated Worlds</span>'
+   '<h1><span class="dlg-gold">Total Governance Control.</span><br>Built for regulated industries.<br>Proven at scale.</h1>'
+   '<p class="dlg-sub">The award-winning AI-driven platform giving leaders real-time visibility into who has received, engaged with, and acted on critical information \u2014 across every frontline.</p>'
+   '<a href="/#solution" class="dlg-cta">Discover More \u2192</a>'
+ '</div>'
+ '<div id="dlg-proof" aria-label="Key metrics">'
+   '<div id="dlg-proof-inner">'
+     '<div><span class="dlg-stat-big">100K+</span><span class="dlg-stat-label">Staff on live deployments</span></div>'
+     '<div><span class="dlg-stat-big">76\u219298%</span><span class="dlg-stat-label">Compliance in 6 months</span></div>'
+     '<div class="dlg-tile-text"><span class="dlg-stat-big">Built for Tier-1</span><span class="dlg-stat-label">The NHS \u2014 one of the world\u2019s most demanding operating environments</span></div>'
+     '<div class="dlg-tile-text"><span class="dlg-stat-big">Vertical excellence</span><span class="dlg-stat-label">Now trusted by leading organisations and governments worldwide</span></div>'
+   '</div>'
+ '</div>'
+ '</section>';

function inject(){
  if(document.getElementById('dlg-hero')) return;
  document.title = 'Diligram \u2014 Total Governance Control';
  // FR subdomain: re-enforce lang attr (React hydration resets it) and add fallback class
  // so our :lang(fr) and .dlg-fr CSS rules apply reliably.
  if(location.hostname.indexOf('fr.') === 0){
    try { document.documentElement.lang = 'fr'; } catch(e){}
    document.documentElement.classList.add('dlg-fr');
  }
  var old = document.querySelector('section[class*="h-[80vh]"]');
  if(!old) return;
  old.style.cssText = 'display:none!important';
  var wrap = document.createElement('div');
  wrap.innerHTML = H;
  old.parentNode.insertBefore(wrap.firstElementChild, old);
  // Ensure page is at top
  window.scrollTo(0, 0);
  if(window.history && window.history.replaceState) window.history.replaceState(null, '', window.location.pathname);
  // REVEAL: call the bootstrap's unhide function (removes style + disconnects observer)
  if(typeof window.__dlgUnhide === 'function'){ try{ window.__dlgUnhide(); }catch(e){} }
  var hider = document.getElementById('dlg-body-hider');
  if(hider && hider.parentNode) hider.parentNode.removeChild(hider);
  setTimeout(function(){
    var sp = document.getElementById('dlg-splash');
    if(sp && sp.parentNode) sp.parentNode.removeChild(sp);
    var cover = document.getElementById('dlg-cover');
    if(cover && cover.parentNode) cover.parentNode.removeChild(cover);
  }, 200);
  // Remove Antoine Amiel team card
  removeTeamMember('Antoine Amiel');
  // Update titles & strip '>' tag lines
  fixTeamCards();
  // Mark current language flag and wire click to Weglot's own links (preserve path/state)
  var isFR = location.hostname.indexOf('fr.') === 0;
  var curSel = isFR ? '.dlg-lang-fr' : '.dlg-lang-en';
  var curEls = document.querySelectorAll(curSel);
  for(var k = 0; k < curEls.length; k++){ curEls[k].classList.add('dlg-lang-current'); }
  // Hijack our flag clicks: prefer Weglot.switchTo (avoids Weglot's link-rewriter loop on fr.*)
  function bindLangClick(sel, lang, weglotId){
    var els = document.querySelectorAll(sel);
    for(var i = 0; i < els.length; i++){
      var handler = function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        // 1) Official Weglot API — works on both www and fr subdomains
        if(window.Weglot && typeof window.Weglot.switchTo === 'function'){
          try { window.Weglot.switchTo(lang); return; } catch(e){}
        }
        // 2) Use Weglot's own dropdown link (its href is authoritative)
        var real = document.getElementById(weglotId);
        if(real && real.getAttribute('href') && real.getAttribute('href') !== '#'){
          window.location.href = real.getAttribute('href');
          return;
        }
        // 3) Last-resort hard navigation. Append ?wg-choose-original=true on FR->EN to bypass Weglot link-rewriter.
        var path = location.pathname + location.search + location.hash;
        var target = (lang === 'fr' ? 'https://fr.diligram.com' : 'https://www.diligram.com') + path;
        if(lang === 'en'){
          target += (path.indexOf('?') === -1 ? '?' : '&') + 'wg-choose-original=true';
        }
        window.location.assign(target);
      };
      els[i].addEventListener('click', handler);
      els[i].addEventListener('touchend', handler, { passive: false });
    }
  }
  bindLangClick('.dlg-lang-en:not(.dlg-lang-current)', 'en', 'weglot-language-en');
  bindLangClick('.dlg-lang-fr:not(.dlg-lang-current)', 'fr', 'weglot-language-fr');
}

function fixTeamCards(){
  function tryFix(){
    var done = false;
    // Title updates: map name -> new title
    var titleMap = {
      'Leslie Golding': 'CMO and MD, UK',
      'Darren Zimmer': 'COO and CPO'
    };
    var h3s = document.querySelectorAll('h3');
    for(var i = 0; i < h3s.length; i++){
      var name = h3s[i].textContent.trim();
      if(titleMap[name]){
        // Role div is the next sibling div
        var roleDiv = h3s[i].nextElementSibling;
        if(roleDiv && roleDiv.tagName === 'DIV' && roleDiv.textContent.trim() !== titleMap[name]){
          roleDiv.textContent = titleMap[name];
          done = true;
        }
      }
    }
    // Strip '> Foo' tag divs (the small uppercase gray-500 lines)
    var tagDivs = document.querySelectorAll('div.uppercase.tracking-wide, div[class*="text-gray-500"][class*="uppercase"]');
    for(var j = 0; j < tagDivs.length; j++){
      var t = tagDivs[j].textContent.trim();
      if(t.charAt(0) === '>' && tagDivs[j].style.display !== 'none'){
        tagDivs[j].style.display = 'none';
        done = true;
      }
    }
    return done;
  }
  tryFix();
  // Retry as Next.js hydration may overwrite
  var tries = 0;
  var iv = setInterval(function(){
    tryFix();
    if(++tries > 30) clearInterval(iv);
  }, 200);
}

function removeTeamMember(name){
  function tryRemove(){
    var imgs = document.querySelectorAll('img[alt="' + name + '"]');
    if(!imgs.length) return false;
    for(var i = 0; i < imgs.length; i++){
      var card = imgs[i].closest('[data-aos="fade-up"]') || imgs[i].closest('.group');
      if(card && card.parentNode){ card.parentNode.removeChild(card); }
    }
    return true;
  }
  if(tryRemove()) return;
  // Retry as Next.js may render later
  var tries = 0;
  var iv = setInterval(function(){
    if(tryRemove() || ++tries > 30) clearInterval(iv);
  }, 200);
}

// Try to inject as soon as possible — DOMContentLoaded, load, AND a MutationObserver on body
function tryInjectLoop(){
  if(document.getElementById('dlg-hero')) return;
  inject();
  if(!document.getElementById('dlg-hero')){
    // Target section not yet in DOM — observe and retry
    if(document.body){
      var mo = new MutationObserver(function(){
        if(document.getElementById('dlg-hero')){ mo.disconnect(); return; }
        inject();
        if(document.getElementById('dlg-hero')) mo.disconnect();
      });
      mo.observe(document.body, { childList: true, subtree: true });
      // Stop observing after 8s
      setTimeout(function(){ mo.disconnect(); }, 8000);
    }
  }
}
if(document.readyState === 'loading'){
  // Delay until AFTER React's initial hydration pass.
  // React 18 schedules hydration via MessageChannel (fires before setTimeout 0),
  // so using DOMContentLoaded + double-rAF ensures we run after React's first commit.
  document.addEventListener('DOMContentLoaded', function(){
    if(typeof requestAnimationFrame === 'function'){
      requestAnimationFrame(function(){ requestAnimationFrame(tryInjectLoop); });
    } else {
      setTimeout(tryInjectLoop, 50);
    }
  });
} else {
  tryInjectLoop();
}
window.addEventListener('load', function(){ setTimeout(tryInjectLoop, 50); });
})();</script>`;

export default async (request, context) => {
  if (request.method !== "GET" || new URL(request.url).pathname !== "/") {
    return context.next();
  }
  const response = await context.next();
  if (!response.headers.get("content-type")?.includes("text/html")) {
    return response;
  }
  let html = await response.text();
  html = html.replace(/<title>[^<]*<\/title>/, "<title>Diligram \u2014 Total Governance Control</title>");

  // ===== NUCLEAR: hide entire body until our hero is injected =====
  // React/Next hydration removes any <style> we put in <head>. Workaround:
  //   1. Inline <script> appends the <style> to <html> (sibling of head/body) — React does NOT reconcile.
  //   2. MutationObserver re-adds the style if anything tries to remove it.
  //   3. Style is also tagged with id; inject() removes it AND disconnects the observer once hero is in DOM.
  const BODY_HIDER = `<script id="dlg-hider-bootstrap">(function(){
    var CSS = 'html,body{background:#0a1628 !important;}body>*:not(#dlg-splash):not(#dlg-cover):not(#dlg-hero):not(script):not(style):not(noscript){visibility:hidden !important;}#dlg-splash{position:fixed;inset:0;z-index:2147483647;background:#0a1628;display:flex;align-items:center;justify-content:center;}#dlg-splash::after{content:\"\";width:42px;height:42px;border:3px solid rgba(255,255,255,.15);border-top-color:#f5b700;border-radius:50%;animation:dlgspin 0.8s linear infinite;}@keyframes dlgspin{to{transform:rotate(360deg);}}';
    function makeStyle(){
      var s = document.createElement('style');
      s.id = 'dlg-body-hider';
      s.textContent = CSS;
      // Append directly to <html>, NOT <head> — React does not reconcile non-head/body children of html
      document.documentElement.appendChild(s);
      return s;
    }
    var styleEl = makeStyle();
    // Aggressive guard: if anything removes the style (React reconciliation, scripts), re-add it
    var killed = false;
    window.__dlgUnhide = function(){
      killed = true;
      if(mo) mo.disconnect();
      var s = document.getElementById('dlg-body-hider');
      if(s && s.parentNode) s.parentNode.removeChild(s);
    };
    var mo = new MutationObserver(function(){
      if(killed) return;
      if(!document.getElementById('dlg-body-hider')){
        styleEl = makeStyle();
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: false });
    if(document.head){ mo.observe(document.head, { childList: true }); }
    if(document.body){ mo.observe(document.body, { childList: true }); }
    // Hard fallback: unhide after 4s no matter what
    setTimeout(function(){ if(!killed) window.__dlgUnhide(); }, 4000);
    // Create splash and cover as SIBLINGS of <body> (children of <html>), NOT inside <body>.
    // React's hydrateRoot operates on document.body; elements outside body are not reconciled,
    // so this prevents the React #418 hydration mismatch that occurred when they were first in body.
    var splash = document.createElement('div');
    splash.id = 'dlg-splash';
    var bgImg = document.createElement('img');
    bgImg.src = '${BG}';
    bgImg.alt = '';
    bgImg.setAttribute('aria-hidden','true');
    bgImg.setAttribute('fetchpriority','high');
    bgImg.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none';
    splash.appendChild(bgImg);
    document.documentElement.appendChild(splash);
    var cover = document.createElement('div');
    cover.id = 'dlg-cover';
    document.documentElement.appendChild(cover);
  })();</script>`;

  // ===== Social preview meta (OG + Twitter) — overwrite all stale values =====
  const OG_TITLE = "Diligram \u2014 Total Governance Control";
  const OG_DESC  = "The award-winning AI-driven platform giving leaders real-time visibility into who has received, engaged with, and acted on critical information \u2014 across every frontline.";
  const OG_IMAGE = "https://cdn.jsdelivr.net/gh/UPTRADING/diligram-assets@main/arch5_hero.jpg";
  const setMeta = (attr, name, content) => {
    const re = new RegExp('<meta\\s+' + attr + '=["\\\']' + name.replace(/[:\-]/g, '\\$&') + '["\\\'][^>]*>', 'i');
    if (re.test(html)) {
      html = html.replace(re, `<meta ${attr}="${name}" content="${content.replace(/"/g, '&quot;')}"/>`);
    } else {
      html = html.replace('</head>', `<meta ${attr}="${name}" content="${content.replace(/"/g, '&quot;')}"/></head>`);
    }
  };
  setMeta('name',     'description',          OG_DESC);
  setMeta('property', 'og:title',             OG_TITLE);
  setMeta('property', 'og:description',       OG_DESC);
  setMeta('property', 'og:image',             OG_IMAGE);
  setMeta('property', 'og:image:width',       '1920');
  setMeta('property', 'og:image:height',      '1080');
  setMeta('property', 'og:image:alt',         OG_TITLE);
  setMeta('property', 'og:url',               'https://www.diligram.com/');
  setMeta('property', 'og:site_name',         'Diligram');
  setMeta('name',     'twitter:card',         'summary_large_image');
  setMeta('name',     'twitter:title',        OG_TITLE);
  setMeta('name',     'twitter:description',  OG_DESC);
  setMeta('name',     'twitter:image',        OG_IMAGE);
  setMeta('name',     'twitter:image:alt',    OG_TITLE);
  // Server-side: nuke the #challenge anchor so the browser has nothing to scroll to
  // Handles both raw HTML attributes AND escaped JSON inside __NEXT_DATA__ etc.
  html = html.replace(/(\s|\\")id="challenge"/g, '$1id="challenge-disabled"');
  html = html.replace(/\\"id\\":\\"challenge\\"/g, '\\"id\\":\\"challenge-disabled\\"');
  html = html.replace(/href=["']\/?#challenge["']/g, 'href="#"');
  html = html.replace(/\\"href\\":\\"\/?#challenge\\"/g, '\\"href\\":\\"#\\"');

  // === Kill the 2.4 MB hero_bg.png that the original page preloads/renders ===
  // Our overlay #dlg-hero hides it visually, but the browser still downloads it.
  // 1) Remove the <link rel="preload" as="image" imageSrcSet="...hero_bg..."> hint
  html = html.replace(/<link\b[^>]*hero_bg[^>]*>/gi, '');
  // 2) Neutralise any <img> referencing hero_bg by stripping its src/srcset attrs
  //    (the <img> tag itself stays so React's hydration tree isn't disturbed)
  html = html.replace(/<img\b[^>]*hero_bg[^>]*>/gi, function(tag){
    return tag
      .replace(/\ssrcSet=("|')[^"']*\1/gi, '')
      .replace(/\ssrcset=("|')[^"']*\1/gi, '')
      .replace(/\ssrc=("|')[^"']*hero_bg[^"']*\1/gi, ' src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="')
      .replace(/\sloading=("|')[^"']*\1/gi, ' loading="lazy"')
      .replace(/\sfetchPriority=("|')[^"']*\1/gi, ' fetchpriority="low"');
  });

  // === Aggressive image optimisation =================================================
  // Swap every reference to /images/<name>.png with our pre-compressed WebP on jsDelivr.
  // 35 MB of source PNGs → 776 KB of WebP (97.8% smaller). Done at the edge so we
  // never have to touch the upstream Next.js build.
  const CDN_IMG = 'https://cdn.jsdelivr.net/gh/UPTRADING/diligram-assets@main/img/';
  const COMPRESSED = new Set([
    'ch_card1','ch_card2','ch_card3','ch_card4',
    'ch_slide1','ch_slide2','ch_slide3','ch_slide4','ch_slide5',
    'favicon','logo','nc1','nc2','nc3','product-suite','reviews_bg',
    't1','t2','t3','t4','t5','t6'
  ]);

  // 1) Rewrite all <img src="/_next/image?url=%2Fimages%2F<name>.png&w=...&q=..."> →
  //    <img src="https://cdn.jsdelivr.net/.../<name>.webp"> and strip srcset entirely.
  html = html.replace(/<img\b[^>]*>/gi, function(tag){
    // Find the underlying image name in either src or srcSet
    const m = tag.match(/(?:src|srcSet|srcset)=["'][^"']*?(?:%2F|\/)images(?:%2F|\/)([a-z0-9_-]+)\.(?:png|jpg|jpeg|webp)/i);
    if (!m) return tag;
    const name = m[1].toLowerCase();
    if (!COMPRESSED.has(name)) return tag;
    const newUrl = CDN_IMG + name + '.webp';
    return tag
      .replace(/\ssrcSet=("|')[^"']*\1/gi, '')
      .replace(/\ssrcset=("|')[^"']*\1/gi, '')
      .replace(/\ssrc=("|')[^"']*\1/i, ' src="' + newUrl + '"');
  });

  // 2) Rewrite any <link rel="preload" as="image" imageSrcSet="..."> for these images
  html = html.replace(/<link\b[^>]*?(?:imageSrcSet|imagesrcset|href)=["'][^"']*?(?:%2F|\/)images(?:%2F|\/)([a-z0-9_-]+)\.(?:png|jpg|jpeg|webp)[^>]*>/gi,
    function(tag, name){
      const lc = name.toLowerCase();
      if (!COMPRESSED.has(lc)) return tag;
      // Replace with a clean preload pointing at our WebP — only useful for above-fold
      // images, but harmless for others (browser dedupes).
      return '<link rel="preload" as="image" href="' + CDN_IMG + lc + '.webp" fetchpriority="low">';
    });

  // 3) Catch-all for inline /_next/image?url=%2Fimages%2F<name>.png references that
  //    didn't match an <img> tag (e.g. embedded in JSON for the Next.js data island).
  html = html.replace(/\/_next\/image\?url=%2Fimages%2F([a-z0-9_-]+)\.(?:png|jpg|jpeg|webp)[^"'\\]*?(?:\\?")/gi,
    function(match, name){
      const lc = name.toLowerCase();
      if (!COMPRESSED.has(lc)) return match;
      const tail = match.endsWith('\\"') ? '\\"' : '"';
      return CDN_IMG + lc + '.webp' + tail;
    });

  // 4) Catch direct /images/<name>.png references (not via Next image optimizer)
  html = html.replace(/(?:["'\\(])(?:https?:\/\/[^"'\\)]+)?\/images\/([a-z0-9_-]+)\.(?:png|jpg|jpeg|webp)/gi,
    function(match, name){
      const lc = name.toLowerCase();
      if (!COMPRESSED.has(lc)) return match;
      return match[0] + CDN_IMG + lc + '.webp';
    });

  // === Lazy-load all <img> below-the-fold ===========================================
  // Adds loading="lazy" + decoding="async" + fetchpriority="low" to every img that
  // doesn't already have a loading attr. Skips the first 2 imgs (logo + above-fold).
  let _imgIdx = 0;
  html = html.replace(/<img\b[^>]*>/gi, function(tag){
    _imgIdx++;
    if (_imgIdx <= 2) return tag;                      // keep logo + first content image eager
    if (/\sloading=/i.test(tag)) return tag;           // already has loading attr
    if (/data:image\/gif;base64,R0lGODlh/i.test(tag)) return tag;  // already neutered
    return tag.replace(/<img\b/i, '<img loading="lazy" decoding="async" fetchpriority="low"');
  });

  // Inject hash-killer + dark cover overlay before any other scripts
  // The dark cover hides the flash of #challenge-at-top while our hero injects
  const HASH_KILLER = `<script>(function(){
  if('scrollRestoration' in history) history.scrollRestoration='manual';
  // bfcache: when iOS Safari restores a page from back-forward cache, scripts don't re-run.
  // Force scroll to top on every pageshow (including bfcache restores).
  window.addEventListener('pageshow', function(){ try{ window.scrollTo(0,0); }catch(e){} });
  // Strip hash from URL immediately so Next.js never sees #challenge
  if(location.hash) history.replaceState(null,'',location.pathname+location.search);
  try{ Object.keys(sessionStorage).forEach(function(k){
    if(/next|scroll/i.test(k)) sessionStorage.removeItem(k);
  }); }catch(e){}
  // Patch scrollIntoView and scrollTo so Next.js can't auto-scroll on hydration
  var _siv = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function(){};
  var _wst = window.scrollTo;
  var _wsb = window.scrollBy;
  window.scrollTo = function(x, y){
    if((typeof y === 'number' ? y : (x && x.top) || 0) > 80) return;
    _wst.apply(window, arguments);
  };
  window.scrollBy = function(){};
  // Lock html overflow until well after hydration completes
  var htmlEl = document.documentElement;
  htmlEl.style.overflow = 'hidden';
  // Active scroll guard: yank back to top on any scroll event (until released)
  var _released = false;
  function snapTop(){ if(!_released && window.scrollY > 0) _wst.call(window, 0, 0); }
  window.addEventListener('scroll', snapTop, { passive: true, capture: true });
  var _gi = setInterval(snapTop, 30);
  // MutationObserver: any time React re-adds id="challenge", strip it
  function killChallengeIds(){
    var els = document.querySelectorAll('[id="challenge"]');
    for(var i = 0; i < els.length; i++){
      els[i].removeAttribute('id');
    }
  }
  killChallengeIds();
  var mo = null;
  function startObserver(){
    if(mo || !document.body) return;
    mo = new MutationObserver(killChallengeIds);
    mo.observe(document.body, { attributes: true, subtree: true, childList: true, attributeFilter: ['id'] });
  }
  if(document.body) startObserver();
  else document.addEventListener('DOMContentLoaded', startObserver);
  function release(){
    if(_released) return;
    // Don't release until our hero has actually injected (otherwise page sits at #challenge)
    if(!document.getElementById('dlg-hero')) return;
    _released = true;
    clearInterval(_gi);
    window.removeEventListener('scroll', snapTop, { capture: true });
    htmlEl.style.overflow = '';
    if (document.body) document.body.style.overflow = '';
    window.scrollTo = _wst;
    window.scrollBy = _wsb;
    Element.prototype.scrollIntoView = _siv;
    // Keep MutationObserver alive — React may still re-mount sections later
  }
  // Release on actual user scroll intent (wheel/keydown), NOT on touchstart (fires on any tap)
  var gestureOpts = { passive: true, capture: true };
  ['wheel','keydown'].forEach(function(ev){
    window.addEventListener(ev, release, gestureOpts);
  });
  // Poll until hero is injected, then auto-release
  var _ri = setInterval(function(){
    if(document.getElementById('dlg-hero')){
      release();
      clearInterval(_ri);
    }
  }, 50);
  // Hard fallback — release no later than 5s even if hero never injects
  setTimeout(function(){ clearInterval(_ri); _released || (function(){ _released = true; clearInterval(_gi); window.removeEventListener('scroll', snapTop, { capture: true }); htmlEl.style.overflow = ''; if(document.body) document.body.style.overflow = ''; window.scrollTo = _wst; window.scrollBy = _wsb; Element.prototype.scrollIntoView = _siv; })(); }, 5000);
})()</script>
<style id="dlg-cover-style">
#dlg-cover {
  position: fixed; inset: 0; z-index: 2147483647;
  background: #0a1628;
  transition: opacity 0.35s ease;
}
#dlg-cover.dlg-cover-gone { opacity: 0; pointer-events: none; }
</style>`;
  // Note: Stripping <link rel="preload"> tags server-side caused React hydration
  // mismatch (#418) because Next.js's RSC tree expects them. Instead we strip them
  // CLIENT-SIDE in dlg-inject (which runs before the load event), preserving
  // hydration while still suppressing the "preloaded but not used" console warnings.
  // Preload hero bg image as early as possible — it has ~1s TTFB on jsdelivr
  // so the browser needs a head-start before dlg-inject creates the CSS background.
  const HERO_PRELOAD = `<link rel="preload" as="image" href="${BG}" fetchpriority="high">`;
  html = html.replace("<head>", "<head>" + HERO_PRELOAD + BODY_HIDER + HASH_KILLER);
  // Note: dlg-splash and dlg-cover are created by BODY_HIDER (head script) and appended to
  // document.documentElement as siblings of <body> — NOT injected into body — so React's
  // hydrateRoot(document.body) does not see them and can hydrate without a #418 mismatch.
  html = html.replace("</head>", HERO_CSS + "</head>");
  html = html.replace("</body>", INJECT_SCRIPT + "</body>");
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  // Cache the rewritten HTML at Netlify's edge so 99% of visitors skip this function.
  // s-maxage=3600 = 1hr CDN cache; SWR=2592000 = serve stale up to 30 days while revalidating.
  // "durable" stores it in Netlify's persistent cache layer (long-tail hits stay fast).
  headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  headers.set("Netlify-CDN-Cache-Control", "public, durable, s-maxage=3600, stale-while-revalidate=2592000");
  return new Response(html, { status: response.status, headers });
};
