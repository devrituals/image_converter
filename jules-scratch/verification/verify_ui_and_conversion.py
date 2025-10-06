import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # 1. Navigate to the local index.html file.
        await page.goto("file:///app/index.html")

        # 2. Take a screenshot of the initial page.
        await page.screenshot(path="jules-scratch/verification/verification_initial.png")

        # 3. Simulate uploading an image.
        # We'll use the upload-icon.png we downloaded as the test file.
        await page.locator("#imageInput").set_input_files("upload-icon.png")

        # 4. Check that the image preview is visible.
        await expect(page.locator("#imagePreview img")).to_be_visible()

        # Take a screenshot of the page with the preview.
        await page.screenshot(path="jules-scratch/verification/verification_preview.png")

        # 5. Click the "Convert" button.
        await page.locator("#convertButton").click()

        # 6. Wait for the download link to be visible.
        # The expect() function with a timeout will wait for the element to appear.
        download_link = page.locator("#downloadLink")
        await expect(download_link).to_be_visible(timeout=5000) # Wait up to 5 seconds

        # 7. Add a small delay to ensure rendering is complete before screenshot.
        await page.wait_for_timeout(200) # 200ms delay

        # 8. Take a final screenshot.
        await page.screenshot(path="jules-scratch/verification/verification_final.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())