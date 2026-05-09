// Netlify Edge Function: replace-hero.js
// Injected via post-hydration script to survive Next.js DOM reconciliation.

export const config = { path: "/" };

const BG = "https://cdn.jsdelivr.net/gh/UPTRADING/diligram-assets@main/arch5_hero.jpg";

const HERO_CSS = `<style id="dlg-hero-styles">
/* Hide original hero */
section[class*="h-\\[80vh\\]"] { display: none !important; }

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
  height: 38px;
  width: auto;
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
  color: #0a1628;
  padding: 16px 32px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: .5px;
  box-shadow: 0 8px 24px rgba(245,183,0,.3);
  transition: transform .2s, box-shadow .2s;
}
.dlg-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(245,183,0,.45); }

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

/* Tablet */
@media (max-width: 1024px) {
  #dlg-nav { padding: 20px 32px; }
  #dlg-content { padding: 80px 32px 0; }
  #dlg-proof { padding: 24px 32px 28px; }
}
/* Mobile */
@media (max-width: 767px) {
  #dlg-nav-links { display: none; }
  #dlg-burger { display: flex; }
  #dlg-nav { padding: 18px 20px; }
  #dlg-content { padding: 40px 20px 0; }
  #dlg-proof { padding: 20px 20px 24px; }
  #dlg-proof-inner { grid-template-columns: repeat(2, 1fr); gap: 20px 12px; }
  .dlg-stat-big { font-size: 22px; }
}
@media (max-width: 380px) { .dlg-stat-big { font-size: 19px; } }
</style>`;

const INJECT_SCRIPT = `<script id="dlg-inject">(function(){
var LOGO = '/_next/image?url=%2Fimages%2Flogo.png&w=384&q=75';
var BG   = '${BG}';
var H =
  '<section id="dlg-hero" aria-label="Hero">'
+ '<div id="dlg-bg" aria-hidden="true"></div>'
+ '<div id="dlg-overlay" aria-hidden="true"></div>'
+ '<input type="checkbox" id="dlg-mob-chk" aria-hidden="true">'
+ '<nav id="dlg-nav" aria-label="Main navigation">'
+   '<a href="/" id="dlg-logo" aria-label="Diligram home">'
+     '<img src="'+LOGO+'" alt="Diligram" height="38" loading="eager" style="height:38px;width:auto;object-fit:contain;filter:brightness(0) invert(1);">'
+   '</a>'
+   '<ul id="dlg-nav-links" role="list">'
+     '<li><a href="/#challenge">Challenge</a></li>'
+     '<li><a href="/#solution">Solution</a></li>'
+     '<li><a href="/#products">Products</a></li>'
+     '<li><a href="/#team">Team</a></li>'
+     '<li><a href="/#contact">Contact</a></li>'
+     '<li><a href="https://mystaffapp.ai/news" target="_blank" rel="noopener">News</a></li>'
+   '</ul>'
+   '<label for="dlg-mob-chk" id="dlg-burger" aria-label="Open menu"><span></span><span></span><span></span></label>'
+ '</nav>'
+ '<div id="dlg-mob-menu" role="dialog" aria-label="Mobile navigation">'
+   '<div id="dlg-mob-close-row"><label for="dlg-mob-chk" id="dlg-mob-close-btn" aria-label="Close menu">&#x2715;</label></div>'
+   '<ul role="list">'
+     '<li><a href="/#challenge">Challenge</a></li>'
+     '<li><a href="/#solution">Solution</a></li>'
+     '<li><a href="/#products">Products</a></li>'
+     '<li><a href="/#team">Team</a></li>'
+     '<li><a href="/#contact">Contact</a></li>'
+     '<li><a href="https://mystaffapp.ai/news" target="_blank" rel="noopener">News</a></li>'
+   '</ul>'
+   '<div id="dlg-mob-cta-wrap"><a href="/#solution" id="dlg-mob-cta">Explore Solutions</a></div>'
+ '</div>'
+ '<div id="dlg-content">'
+   '<span class="dlg-kicker">Diligram &nbsp;&middot;&nbsp; Powering Regulated Worlds</span>'
+   '<h1><span class="dlg-gold">Total Governance Control.</span><br>Built for regulated industries.<br>Proven at scale.</h1>'
+   '<p class="dlg-sub">The award-winning AI-driven platform giving leaders real-time visibility into who has received, engaged with, and acted on critical information \u2014 across every frontline.</p>'
+   '<a href="/#solution" class="dlg-cta">Discover More \u2192</a>'
+ '</div>'
+ '<div id="dlg-proof" aria-label="Key metrics">'
+   '<div id="dlg-proof-inner">'
+     '<div><span class="dlg-stat-big">60K+</span><span class="dlg-stat-label">Staff on live deployments</span></div>'
+     '<div><span class="dlg-stat-big">76\u219898%</span><span class="dlg-stat-label">Compliance in 6 months</span></div>'
+     '<div><span class="dlg-stat-big">\u00a31.8M+</span><span class="dlg-stat-label">Documented savings</span></div>'
+     '<div><span class="dlg-stat-big">5</span><span class="dlg-stat-label">Regulated industries served</span></div>'
+   '</div>'
+ '</div>'
+ '</section>';

function inject(){
  if(document.getElementById('dlg-hero')) return;
  document.title = 'Diligram \u2014 Total Governance Control';
  var old = document.querySelector('section[class*="h-[80vh]"]');
  if(!old) return;
  old.style.cssText = 'display:none!important';
  var wrap = document.createElement('div');
  wrap.innerHTML = H;
  old.parentNode.insertBefore(wrap.firstElementChild, old);
}

if(document.readyState === 'complete'){
  setTimeout(inject, 100);
} else {
  window.addEventListener('load', function(){ setTimeout(inject, 100); });
}
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
  html = html.replace("</head>", HERO_CSS + "</head>");
  html = html.replace("</body>", INJECT_SCRIPT + "</body>");
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(html, { status: response.status, headers });
};
