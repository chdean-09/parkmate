import { Builder, WebDriver, By } from "selenium-webdriver";
import "selenium-webdriver/chrome";
import "chromedriver";
import "selenium-webdriver/firefox";
import "geckodriver";
import {
  getElementById,
  getElementByXPath,
} from "../../src/lib/selenium-utils";

const rootURL = "http://localhost:3000/login";

let driver: WebDriver;

// Setup
beforeAll(async () => {
  driver = await new Builder().forBrowser("firefox").build();
});

describe("Login Page", () => {
  beforeEach(async () => {
    await driver.get(rootURL);
  });

  it("initializes the context", async () => {
    await driver.get(rootURL);
  }, 10000);

  it("Have greetings and app name displayed", async () => {
    const headerEl = await getElementByXPath(
      "/html/body/div/div/form/h2/span",
      driver,
    );

    const textHeader = await headerEl.getText();
    const expectedHeaderText = "Login to continue";

    expect(textHeader).toEqual(expectedHeaderText);
  });

  it("must have sign up link", async () => {
    const noAcctEl = await getElementByXPath(
      "/html/body/div/div/h1/span",
      driver,
    );
    const signUpLinkEl = await getElementByXPath(
      "/html/body/div/div/h1/a",
      driver,
    );

    const noAcctText = await noAcctEl.getText();
    const expNoAcctText = "No account?";

    const signUpText = await signUpLinkEl.getText();
    const expectedSignUpText = "Sign up now!";

    expect(noAcctText).toEqual(expNoAcctText);
    expect(signUpText).toEqual(expectedSignUpText);
  });

  it("logs in the user after correct creds filled out", async () => {
    const usernameField = await getElementByXPath(
      '//*[@id=":R4puucq:-form-item"]',
      driver,
    );
    const passwordField = await getElementByXPath(
      '//*[@id=":R8puucq:-form-item"]',
      driver,
    );
    const loginButton = await getElementByXPath(
      `/html/body/div/div/form/button`,
      driver,
    );

    await usernameField.sendKeys("clyde123");
    const usernameText = await usernameField.getAttribute("value");

    await passwordField.sendKeys("12345678");
    const passwordText = await passwordField.getAttribute("value");

    const expectedUsername = "clyde123";
    expect(usernameText).toEqual(expectedUsername);

    const expectedCreds = "12345678";
    expect(passwordText).toEqual(expectedCreds);

    await loginButton.click();

    const AppNameElement = await getElementByXPath(
      "/html/body/section/div/h1",
      driver,
    );

    const text = await AppNameElement.getText();
    const expected = "Parkmate";

    expect(text).toEqual(expected);
  }, 10000);
});

// Teardown
afterAll(async () => {
  await driver.quit();
});
