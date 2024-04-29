import { Builder, WebDriver } from "selenium-webdriver";

import "selenium-webdriver/chrome";
import "chromedriver";

import "selenium-webdriver/firefox";
import "geckodriver";

import { getElementById, getElementByXPath } from "../src/lib/selenium-utils";

const rootURL = "http://localhost:3000";

let driver: WebDriver;

// Setup
beforeAll(async () => {
  driver = await new Builder().forBrowser("firefox").build();
});

describe("a simple test case", () => {
  it("initializes the context", () => {
    driver.get(rootURL);
  });

  it("checks whether the title appears up top", async () => {
    const textElement = await getElementByXPath(
      "/html/body/main/div[3]/a[1]/p",
      driver,
    );

    const text = await textElement.getText();
    const expected =
      "Find in-depth information about Next.js features and API.";

    expect(text).toEqual(expected);
  });
});

describe("another simple test case", () => {
  it("initializes the context", () => {
    driver.get(rootURL + "/helloworld");
  });

  it("checks whether the title appears up top", async () => {
    const textElement = await getElementById("selenium-test", driver);

    const text = await textElement.getText();
    const expected = "haii selenium";

    expect(text).toEqual(expected);
  });
});

// Teardown
afterAll(() => {
  driver.quit();
});
