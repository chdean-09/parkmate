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

describe("Login Page", () => {
  beforeAll(async () => {
    driver = await new Builder().forBrowser("firefox").build();
    await driver.get(rootURL);
  }, 20000);

  afterAll(async () => {
    await driver.quit();
  }, 20000);

  it("displays greetings and app name", async () => {
    const headerEl = await getElementById("login-greet", driver);
    const greetHeader = await headerEl.getText();
    const expectedGreetHeaderText = "Welcome To ParkMate!";
    expect(greetHeader).toEqual(expectedGreetHeaderText);
  });

  it("display login to continue text", async () => {
    const loginContinueEl = await getElementById("login-continue-text", driver);
    const loginContinueText = await loginContinueEl.getText();
    const expectedLoginContinueText = "Login to continue";
    expect(loginContinueText).toEqual(expectedLoginContinueText);
  });

  it("contains a sign-up link", async () => {
    const noAcctEl = await getElementById("signup-question", driver);
    const signUpLinkEl = await getElementById("signup-link", driver);
    const noAcctText = await noAcctEl.getText();
    const expNoAcctText = "No account?";
    const signUpText = await signUpLinkEl.getText();
    const expectedSignUpText = "Sign up now!";
    expect(noAcctText).toEqual(expNoAcctText);
    expect(signUpText).toEqual(expectedSignUpText);
  });

  describe("User enters incorrect credentials", () => {
    let usernameField: WebElement;
    let passwordField: WebElement;
    let loginButton: WebElement;

    beforeAll(async () => {
      usernameField = await getElementById("username-field", driver);
      passwordField = await getElementById("password-field", driver);
      loginButton = await getElementById("login-btn-active", driver);
    });

    afterEach(async () => {
      await usernameField.clear();
      await passwordField.clear();
    });

    it("doesn't log in the user after entering incorrect credentials", async () => {
      await usernameField.sendKeys("seleniumtest-wrong");
      const usernameText = await usernameField.getAttribute("value");
      await passwordField.sendKeys("seleniumtestpassword-wrong");
      const passwordText = await passwordField.getAttribute("value");

      const expectedUsername = "seleniumtest-wrong";
      expect(usernameText).toEqual(expectedUsername);
      const expectedCreds = "seleniumtestpassword-wrong";
      expect(passwordText).toEqual(expectedCreds);

      await loginButton.click();

      const errorElement = await getElementById("error-message", driver);
      const errorText = await errorElement.getText();
      const expectedErrorText = "Incorrect username or password";
      expect(errorText).toEqual(expectedErrorText);
    }, 10000);
  });

  describe('Correct Credentials Entered', () => {
    loginUser();
  })
  

  
});

function loginUser() {
  it("logs in the user after entering correct credentials", async () => {
    const usernameField = await getElementById("username-field", driver);
    const passwordField = await getElementById("password-field", driver);
    const loginButton = await getElementById("login-btn-active", driver);

    await usernameField.sendKeys("seleniumtest");
    const usernameText = await usernameField.getAttribute("value");
    await passwordField.sendKeys("seleniumtestpassword");
    const passwordText = await passwordField.getAttribute("value");

    const expectedUsername = "seleniumtest";
    expect(usernameText).toEqual(expectedUsername);
    const expectedCreds = "seleniumtestpassword";
    expect(passwordText).toEqual(expectedCreds);

    await loginButton.click();

    const appNameElement = await getElementById("app-title", driver);
    const text = await appNameElement.getText();

    const expected = "Parkmate";
    expect(text).toEqual(expected);
  }, 10000);
}

function signUpUser() {
  it("signs up user after filling out form", async () => {
    const usernameField = await getElementById("username-field", driver);
    const passwordField = await getElementById("password-field", driver);
    const signUpButton = await getElementById("signup-button-active", driver);

    await usernameField.sendKeys("seleniumtest");
    const usernameText = await usernameField.getAttribute("value");
    await passwordField.sendKeys("seleniumtestpassword");
    const passwordText = await passwordField.getAttribute("value");

    const expectedUsername = "seleniumtest";
    expect(usernameText).toEqual(expectedUsername);
    const expectedPassword = "seleniumtestpassword";
    expect(passwordText).toEqual(expectedPassword);

    signUpButton.click();

    const appNameElement = await getElementById("app-title", driver);
    const text = await appNameElement.getText();

    expect(text).toEqual("Parkmate");
  }, 10000);

  it("Log out user after signing up", async () => {
    const appNameElement = await getElementById("app-title", driver);
    const text = await appNameElement.getText();

    expect(text).toEqual("Parkmate");

    const logoutButton = await getElementById("logout-btn", driver);
    logoutButton.click();
  }, 10000);
}
