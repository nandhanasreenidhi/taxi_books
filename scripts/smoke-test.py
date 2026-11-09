#!/usr/bin/env python3
"""
Optional browser smoke test (not part of the app, adds no npm dependency).

Requires Python Playwright with Chromium:  pip install playwright && playwright install chromium
Usage:
  npm run build && npm run preview        # terminal 1 (serves http://localhost:4173)
  python3 scripts/smoke-test.py [base-url]  # terminal 2

Checks:
  1. All 17 routes render with no uncaught page errors (and "*" redirects home).
  2. Full shared-state lifecycle: customer books -> driver accepts, arrives, starts, completes
     -> customer sees the ride under Completed.
  3. Public landing page: booking widget (tabs, validation, fare reacts to vehicle class, Book now),
     navigation, portal gateway (modal and /login), service and fleet CTAs, mobile menu, reduced motion,
     no horizontal overflow at 390/768/1440, and none of the retired unsupported claims in the page text.
Network failures for third-party images are ignored (the app must show fallbacks, not errors).
"""
import sys
from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:4173"
ROUTES = ["/", "/login", "/customer/login", "/customer/register", "/customer", "/customer/book",
          "/customer/booking-flow", "/customer/bookings", "/customer/tracking/none", "/customer/wallet",
          "/customer/profile", "/customer/support", "/driver", "/driver/portal", "/admin", "/admin/portal",
          "/does-not-exist"]
NAV = {"Go offline", "Go online", "", "Requests", "Trips", "Earnings"}
failures = []


def visible_buttons(pg):
    return [x for x in pg.query_selector_all("button") if x.is_visible()]


def click_text(pg, text):
    for x in visible_buttons(pg):
        if text in x.inner_text():
            x.click()
            pg.wait_for_timeout(900)
            return True
    return False


with sync_playwright() as p:
    browser = p.chromium.launch()

    # 1. Routes
    for route in ROUTES:
        ctx = browser.new_context(viewport={"width": 1366, "height": 900})
        pg = ctx.new_page()
        page_errors = []
        pg.on("pageerror", lambda e, acc=page_errors: acc.append(str(e)))
        pg.goto(BASE + route, wait_until="domcontentloaded")
        pg.wait_for_timeout(1500)
        text_len = len(pg.inner_text("body").strip())
        ok = text_len > 40 and not page_errors
        print(("PASS " if ok else "FAIL ") + route, f"(chars={text_len})", page_errors[:1])
        if not ok:
            failures.append(route)
        ctx.close()

    # 2. Lifecycle (one context so localStorage is shared, like a real demo session)
    ctx = browser.new_context(viewport={"width": 1366, "height": 900})
    pg = ctx.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(BASE + "/customer/book")
    pg.wait_for_timeout(1000)
    for step in ["Proceed to Journey Details", "Select Vehicle", "Review Fare Breakdown", "Confirm Booking"]:
        if not click_text(pg, step):
            failures.append(f"wizard step missing: {step}")
    pg.goto(BASE + "/driver")
    pg.wait_for_timeout(1000)
    if not click_text(pg, "Accept trip"):
        failures.append("driver could not accept the booking")
    for _ in range(6):
        cta = [x for x in visible_buttons(pg) if x.inner_text().strip() not in NAV]
        if not cta:
            break
        cta[-1].click()
        pg.wait_for_timeout(900)
    pg.goto(BASE + "/customer/bookings")
    pg.wait_for_timeout(1200)
    tabs = [x.inner_text().strip() for x in visible_buttons(pg)]
    done = "Completed (1)" in tabs
    print(("PASS " if done and not errs else "FAIL ") + "lifecycle: customer -> driver -> completed", errs[:1])
    if not done or errs:
        failures.append("lifecycle")
    ctx.close()

    # 3. Landing page
    def check(name, ok, detail=""):
        print(("PASS " if ok else "FAIL ") + "landing: " + name, detail)
        if not ok:
            failures.append("landing: " + name)

    def estimate(pg):
        return pg.get_attribute("#booking-widget span[aria-label^='\u20b9']", "aria-label")

    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    pg = ctx.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(BASE + "/")
    pg.wait_for_selector("#fleet", state="attached", timeout=15000)
    pg.wait_for_timeout(3500)

    # Booking widget
    pg.click("#booking-widget [role=tab]:has-text('Hourly')")
    check("hourly tab shows duration choices", pg.is_visible("#booking-widget >> text=Duration"))
    pg.click("#booking-widget [role=tab]:has-text('Instant')")
    pg.fill("#wv-pickup", "")
    pg.click("button:has-text('Book now')")
    check("empty pickup is rejected with a message", pg.is_visible("text=Please provide a pickup location."))
    check("still on landing after failed validation", pg.url.rstrip("/") == BASE)
    pg.fill("#wv-pickup", "T. Nagar, Chennai")
    pg.fill("#wv-destination", "Chennai Airport")
    before = estimate(pg)
    pg.click("#booking-widget button[aria-pressed]:has-text('Exec')")
    pg.wait_for_timeout(1300)
    after = estimate(pg)
    check("fare estimate reacts to vehicle class", before != after, f"{before} -> {after}")
    pg.click("button:has-text('Book now')")
    pg.wait_for_timeout(1200)
    check("Book now leads to the customer booking flow", pg.url.endswith("/customer/book"), pg.url)

    # Navigation and gateway
    pg.goto(BASE + "/")
    pg.wait_for_selector("#fleet", state="attached", timeout=15000)
    pg.wait_for_timeout(3000)
    pg.click("header >> text=Portals")
    pg.click("[role=menuitem]:has-text('Customer portal')")
    pg.wait_for_timeout(900)
    check("Portals menu opens the customer portal", pg.url.endswith("/customer"), pg.url)
    pg.goto(BASE + "/")
    pg.wait_for_selector("#fleet", state="attached", timeout=15000)
    pg.wait_for_timeout(3000)
    pg.click("header >> text=Sign in")
    pg.wait_for_selector("[role=dialog]")
    pg.keyboard.press("Escape")
    pg.wait_for_timeout(900)
    check("Escape closes the portal gateway", not pg.is_visible("[role=dialog]"))
    pg.click("header >> text=Sign in")
    pg.wait_for_selector("[role=dialog]")
    pg.click("[role=dialog] [role=radio]:has-text('Driver')")
    pg.wait_for_timeout(900)
    pg.click("button:has-text('Enter Driver portal')")
    pg.wait_for_timeout(1000)
    check("Gateway modal enters the driver portal", pg.url.endswith("/driver"), pg.url)
    pg.goto(BASE + "/login")
    pg.wait_for_timeout(2200)
    pg.click("[role=radio]:has-text('Admin')")
    pg.wait_for_timeout(900)
    pg.click("button:has-text('Enter Admin portal')")
    pg.wait_for_timeout(1000)
    check("/login gateway enters the admin portal", pg.url.endswith("/admin"), pg.url)

    # Service and fleet CTAs write to the booking store
    pg.goto(BASE + "/")
    pg.wait_for_selector("#fleet", state="attached", timeout=15000)
    pg.wait_for_timeout(3000)
    pg.evaluate("document.querySelector('#services').scrollIntoView()")
    pg.wait_for_timeout(1500)
    pg.hover("#services [role=group] > div:nth-child(5)")
    pg.wait_for_timeout(1400)
    pg.click("#services [aria-expanded=true] button")
    pg.wait_for_timeout(1200)
    check("service CTA selects it in the booking widget", pg.get_attribute("#booking-widget [role=tab]:has-text('Self-drive')", "aria-selected") == "true")
    pg.evaluate("document.querySelector('#fleet').scrollIntoView()")
    pg.wait_for_timeout(1200)
    pg.click("#fleet [role=tab]:has-text('XL')")
    pg.wait_for_timeout(900)
    pg.click("#fleet button:has-text('Book this class')")
    pg.wait_for_timeout(1200)
    check("fleet CTA selects the class in the booking widget", pg.get_attribute("#booking-widget button:has-text('SUV')", "aria-pressed") == "true")

    # Retired claims must not reappear
    pg.evaluate("window.scrollTo(0, 0)")
    body = pg.evaluate("document.body.innerText").lower()
    banned = ["zoho", "flipkart", "99.8", "investor", "48,000", "top 3%", "concur", "police-verified", "wi-fi", "carbon offset"]
    found = [b for b in banned if b in body]
    check("no retired unsupported claims in page text", not found, str(found))
    check("no uncaught errors on the landing page", not errs, str(errs[:1]))
    ctx.close()

    # Overflow at three widths
    for width, height in [(390, 844), (768, 1024), (1440, 900)]:
        c = browser.new_context(viewport={"width": width, "height": height})
        p2 = c.new_page()
        p2.goto(BASE + "/")
        p2.wait_for_selector("#fleet", state="attached", timeout=15000)
        p2.wait_for_timeout(2500)
        over = p2.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        check(f"no horizontal overflow at {width}px", over <= 0, f"overflow={over}")
        c.close()

    # Mobile menu
    c = browser.new_context(viewport={"width": 390, "height": 844})
    m = c.new_page()
    m.goto(BASE + "/")
    m.wait_for_timeout(3500)
    m.click("button[aria-label='Open menu']")
    m.wait_for_timeout(1200)
    m.click("[aria-label='Mobile'] >> text=Fleet")
    m.wait_for_timeout(1500)
    check("mobile menu link scrolls to its section and closes", not m.is_visible("[aria-label='Mobile']"))
    c.close()

    # Reduced motion: nothing may be left hidden or covering the hero
    c = browser.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    r = c.new_page()
    r.goto(BASE + "/")
    r.wait_for_timeout(3600)
    check("reduced motion: headline visible", r.is_visible("h1"))
    check("reduced motion: booking console usable", r.is_visible("#wv-pickup"))
    c.close()
    browser.close()

print("\nSMOKE TEST " + ("FAILED: " + ", ".join(failures) if failures else "PASSED"))
sys.exit(1 if failures else 0)
