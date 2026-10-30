import { chromium } from "file:///C:/Users/Fernando/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const base = path.dirname(fileURLToPath(import.meta.url));
const pageUrl = `${pathToFileURL(path.join(base, "formulario.html")).href}?servicio=web-profesional`;
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

for (const config of [
  { name: "preview-formulario-escritorio.png", width: 1440, height: 1000 },
  { name: "preview-formulario-movil.png", width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport: { width: config.width, height: config.height } });
  await page.goto(pageUrl, { waitUntil: "load" });
  await page.locator("img").evaluateAll((images) => images.forEach((image) => { image.loading = "eager"; }));
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(250);
  const report = await page.evaluate(() => ({
    viewport: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    images: [...document.images].map((image) => ({ src: image.getAttribute("src"), complete: image.complete, width: image.naturalWidth })),
    formAction: document.querySelector(".project-form")?.action,
    requiredFields: document.querySelectorAll(".project-form [required]").length,
    selectedService: document.querySelector("[data-service-select]")?.value,
    overflow: [...document.querySelectorAll("body *")].filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.right > window.innerWidth + 2 || rect.left < -2;
    }).slice(0, 20).map((element) => ({
      tag: element.tagName,
      className: String(element.className || ""),
      left: Math.round(element.getBoundingClientRect().left),
      right: Math.round(element.getBoundingClientRect().right),
      width: Math.round(element.getBoundingClientRect().width),
    })),
  }));
  console.log(config.name, JSON.stringify(report));
  await page.screenshot({ path: path.join(base, config.name), fullPage: true });
  await page.close();
}

await browser.close();
