import puppeteer from "puppeteer";

const scraper = async (keyword) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    `https://www.linkedin.com/jobs/search?keywords=${keyword}&location=&geoId=&trk=public_jobs_jobs-search-bar_search-submit&original_referer=https%3A%2F%2Fwww.linkedin.com%2Fjobs%2Fsearch%3Fkeywords%3Dmlops%26location%3DUnited&position=1&pageNum=0`
  );

  await page.setViewport({ width: 1080, height: 1024 });

  const jobsData = await page.evaluate(() => {
    const jobs = document.querySelectorAll(".base-search-card__info");

    return Array.from(jobs).map((job) => {
      const title = job.querySelector("h3").innerText;
      const companyName = job.querySelector("h4").innerText;
      const jobLocation = job.querySelector("span").innerText;

      return { title, companyName, jobLocation };
    });
  });

  console.log(jobsData);

  // npm run server in another terminal for this to work
  jobsData.forEach(async (job) => {
    await fetch("http://localhost:8000/linkedInJobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
  });

  await page.screenshot({
    path: "linkedIn.png",
  });

  await browser.close();
};

scraper("MLops");
