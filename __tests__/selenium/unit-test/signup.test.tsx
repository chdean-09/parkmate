import { Builder, WebDriver, By, WebElement } from "selenium-webdriver";
import "selenium-webdriver/chrome";
import "chromedriver";
import "selenium-webdriver/firefox";
import "geckodriver";
import {
  getElementById,
  getElementByXPath,
} from "../../../src/lib/selenium-utils";
import { after } from "node:test";

const rootURL = "http://localhost:3000/signup";

let driver: WebDriver;

const password = "seleniumtestpassword";
const username = "seleniumtest";

describe("Sign up page", () => {
  beforeAll(async () => {
    driver = await new Builder().forBrowser("firefox").build();
    await driver.get(rootURL);
  }, 10000);

  afterAll(async () => {
    await driver.quit();
  }, 10000);

  it("check if sign up form is displayed", async () => {
    const signUpForm = await getElementById("signup-form", driver);

    expect(signUpForm.isDisplayed).toBeTruthy();
  });

  it("must have sign up greetings and app name displayed", async () => {
    const appName = await getElementById("app-name-greet", driver);

    const textHeader = await appName.getText();
    const expectedHeaderText = "Welcome To ParkMate!";
    expect(textHeader).toEqual(expectedHeaderText);
  });

  it("must have sign up text displayed", async () => {
    const signUpEl = await getElementById("signup-text", driver);

    const signUpText = await signUpEl.getText();
    const expectedSignUpText = "Sign up to continue";
    expect(signUpText).toEqual(expectedSignUpText);
  });

  it("must have sign up button displayed", async () => {
    const signUpButton = await getElementById("signup-button-active", driver);

    expect(signUpButton.isDisplayed).toBeTruthy();
  });

  describe("User puts incorrect credentials", () => {
    let usernameField: WebElement;
    let passwordField: WebElement;
    let signUpButton: WebElement;
    let usernameText: string;
    let passwordText: string;

    beforeEach(async () => {
      usernameField = await getElementById("username-field", driver);
      passwordField = await getElementById("password-field", driver);
      signUpButton = await getElementById("signup-button-active", driver);
    });

    afterEach(async () => {
      await usernameField.clear();
      await passwordField.clear();
    });

    it("displays error message if username is less than 3 characters", async () => {
      await usernameField.sendKeys("se");
      await passwordField.sendKeys("seleniumtestpassword");
      const usernameText = await usernameField.getAttribute("value");
      const passwordText = await passwordField.getAttribute("value");

      const expectedUsername = "se";
      expect(usernameText).toEqual(expectedUsername);
      const expectedPassword = "seleniumtestpassword";
      expect(passwordText).toEqual(expectedPassword);

      signUpButton.click();

      const errorElement = await getElementById("error-message", driver);
      const errorText = await errorElement.getText();

      expect(errorText).toEqual("Username must be at least 3 characters.");
    }, 10000);

    it("displays error message if password is less than 6 characters", async () => {
      await usernameField.sendKeys("seleniumtest");
      await passwordField.sendKeys("se");
      const usernameText = await usernameField.getAttribute("value");
      const passwordText = await passwordField.getAttribute("value");

      const expectedUsername = "seleniumtest";
      expect(usernameText).toEqual(expectedUsername);
      const expectedPassword = "se";
      expect(passwordText).toEqual(expectedPassword);

      signUpButton.click();

      const errorElement = await getElementById("error-message", driver);
      const errorText = await errorElement.getText();

      expect(errorText).toEqual("Password must be at least 6 characters");
    }, 10000);

    it("displays error message if username already exists", async () => {
      await usernameField.sendKeys("seleniumtest");
      await passwordField.sendKeys("seleniumtestwrongpassword");
      const usernameText = await usernameField.getAttribute("value");
      const passwordText = await passwordField.getAttribute("value");

      const expectedUsername = "seleniumtest";
      expect(usernameText).toEqual(expectedUsername);
      const expectedPassword = "seleniumtestwrongpassword";
      expect(passwordText).toEqual(expectedPassword);

      signUpButton.click();

      const errorElement = await getElementById("error-message", driver);
      const errorText = await errorElement.getText();

      expect(errorText).toEqual("Username already exists");
    }, 10000);
  });

  describe("User puts correct credentials", () => {
    it("signs up user after filling out form", async () => {
      const usernameField = await getElementById("username-field", driver);
      const passwordField = await getElementById("password-field", driver);
      const signUpButton = await getElementById("signup-button-active", driver);

      await usernameField.sendKeys("seleniumtest");
      const usernameText = await usernameField.getAttribute("value");
      await passwordField.sendKeys("seleniumtestpassword");
      const passwordText = await passwordField.getAttribute("value");

      const expectedUsername = username;
      expect(usernameText).toEqual(expectedUsername);
      const expectedPassword = password;
      expect(passwordText).toEqual(expectedPassword);

      signUpButton.click();

      const appNameElement = await getElementById("app-title", driver);
      const text = await appNameElement.getText();

      expect(text).toEqual("Parkmate");
    }, 20000);

    it("Log out user after signing up", async () => {
      const appNameElement = await getElementById("app-title", driver);
      const text = await appNameElement.getText();

      expect(text).toEqual("Parkmate");

      const logoutButton = await getElementById("logout-btn", driver);
      logoutButton.click();
    }, 10000);
  });
});
