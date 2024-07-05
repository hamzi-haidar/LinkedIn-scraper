import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    "https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs&position=1&pageNum=0"
  );

  await page.setViewport({ width: 1080, height: 1024 });

  await page.locator("#job-search-bar-keywords").fill("mlops");

  await page.screenshot({
    path: "hn.png",
  });

  await browser.close();
})();
