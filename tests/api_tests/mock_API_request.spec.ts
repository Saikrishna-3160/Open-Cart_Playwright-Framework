import { test, expect } from "@playwright/test";

test("Mock API request in Playwright", async ({ page }, testInfo) => {
  await page.route("*/**/api/v1/fruits", async (route) => {
    const json = [
      { name: "Lion", id: 23 },
      { name: "Tiger", id: 73 },
      { name: "Leopard", id: 76 },
      { name: "Jaguar", id: 98 },
    ];
    await route.fulfill({ json });
  });

  //Go to URL
  await page.goto("https://demo.playwright.dev/api-mocking/");
  const screenshot = await page.screenshot({
    path: "./test-results/mock-api.png",
  });
  await testInfo.attach("APImock-screenshot", {
    body: screenshot,
    contentType: "image/png",
  });

  //Validate the text
  await expect(page.getByText("Lion")).toBeVisible();
  await expect(page.getByText("Tiger")).toBeVisible();
  await expect(page.getByText("Leopard")).toBeVisible();
  await expect(page.getByText("Jaguar")).toBeVisible();
});
