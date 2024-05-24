import { Builder, WebDriver, By, WebElement } from "selenium-webdriver";
import "selenium-webdriver/chrome";
import "chromedriver";
import "selenium-webdriver/firefox";
import "geckodriver";
import {
  getElementById,
  getElementByXPath,
} from "../../../src/lib/selenium-utils";

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

    // add delay to see the result
    setTimeout(() => {
      console.log("Test Passed");
    }, 5000);
  }, 20000);
});
