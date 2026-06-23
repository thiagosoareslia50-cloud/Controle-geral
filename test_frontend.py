from playwright.sync_api import sync_playwright

def test_frontend(page):
    # Important: block external CDNs so playwright doesn't timeout
    page.route("**/*", lambda route: route.abort() if any(host in route.request.url for host in ["cdnjs.cloudflare.com", "unpkg.com", "fonts.googleapis.com", "fonts.gstatic.com"]) else route.continue_())

    page.goto("http://localhost:3000/index.html")
    page.wait_for_selector("#root")

    # Just grab a screenshot of the main page
    page.screenshot(path="verification.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_frontend(page)
        finally:
            browser.close()
