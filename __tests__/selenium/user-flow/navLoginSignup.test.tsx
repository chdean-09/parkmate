import { Builder, WebDriver, By, WebElement } from "selenium-webdriver";
import "selenium-webdriver/chrome";
import "chromedriver";
import "selenium-webdriver/firefox";
import "geckodriver";
import {
  getElementById,
  getElementByXPath,
} from "../../../src/lib/selenium-utils";

const rootURL = "http://localhost:3000/login";

let driver: WebDriver;

describe("Navigate log in page and sign up page", () => {
  beforeAll(async () => {
    driver = await new Builder().forBrowser("firefox").build();
    await driver.get(rootURL);
  }, 20000);

  afterAll(async () => {
    await driver.quit();
  }, 20000);

  it("From login page navigates to Sign Up and back to Login page", async () => {
    const signUpLinkEl = await getElementById("signup-link", driver);
    await signUpLinkEl.click();

    let signUpUniqueEl = await getElementById("signup-text", driver);
    let signUpHeaderText = await signUpUniqueEl.getText();
    let expectedSignUpHeaderText = "Sign up to continue";

    expect(signUpHeaderText).toEqual(expectedSignUpHeaderText);

    const loginLinkEl = await getElementById("login-link", driver);

    await loginLinkEl.click();

    const loginHeaderEl = await getElementById("login-continue-text", driver);
    const loginHeaderText = await loginHeaderEl.getText();
    const expectedLoginHeaderText = "Login to continue";
    expect(loginHeaderText).toEqual(expectedLoginHeaderText);
  }, 10000);
});
