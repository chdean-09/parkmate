import { Builder, until, WebDriver, WebElement } from "selenium-webdriver";
import "selenium-webdriver/chrome";
import "chromedriver";
import "selenium-webdriver/firefox";
import "geckodriver";
import { getElementById } from "@/lib/selenium-utils";

const rootURL = "http://localhost:3000/signup";

let driver: WebDriver;

const password = "seleniumtestpassword";
const username = "seleniumtest";

describe("Sign up page", () => {
  beforeAll(async () => {
    driver = await new Builder().forBrowser("firefox").build();
    await driver.get(rootURL);
  }, 20000);

  afterAll(async () => {
    await driver.quit();
  }, 20000);

  it("checks if sign up form is displayed", async () => {
    const signUpForm = await getElementById("signup-form", driver);
    expect(await signUpForm.isDisplayed()).toBeTruthy();
  });

  it("displays sign up greetings and app name", async () => {
    const appName = await getElementById("app-name-greet", driver);
    const textHeader = await appName.getText();
    const expectedHeaderText = "Welcome To ParkMate!";
    expect(textHeader).toEqual(expectedHeaderText);
  });

  it("displays sign up text", async () => {
    const signUpEl = await getElementById("signup-text", driver);
    const signUpText = await signUpEl.getText();
    const expectedSignUpText = "Sign up to continue";
    expect(signUpText).toEqual(expectedSignUpText);
  });

  it("displays sign up button", async () => {
    const signUpButton = await getElementById("signup-button-active", driver);
    expect(await signUpButton.isDisplayed()).toBeTruthy();
  });

  describe("User enters incorrect credentials", () => {
    let usernameField: WebElement;
    let passwordField: WebElement;
    let signUpButton: WebElement;

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
      await passwordField.sendKeys(password);
      driver.executeScript("arguments[0].click();", signUpButton);
      // await signUpButton.click();

      const errorElement = await getElementById("error-message", driver);
      const errorText = await errorElement.getText();
      expect(errorText).toEqual("Username must be at least 3 characters.");
    }, 10000);

    it("displays error message if password is less than 6 characters", async () => {
      await usernameField.sendKeys(username);
      await passwordField.sendKeys("se");
      
      // await signUpButton.click();
      driver.executeScript("arguments[0].click();", signUpButton)


      const errorElement = await getElementById("error-message", driver);
      const errorText = await errorElement.getText();
      expect(errorText).toEqual("Password must be at least 6 characters");
    }, 10000);

    it("displays error message if username already exists but wrong password", async () => {
      await usernameField.sendKeys(username);
      await passwordField.sendKeys("seleniumtestwrongpassword");
      // await signUpButton.click();
      driver.executeScript("arguments[0].click();", signUpButton)


      const errorElement = await getElementById("error-message", driver);
      const errorText = await errorElement.getText();
      expect(errorText).toEqual("Incorrect username or password");
    }, 10000);
  });

  describe("User enters correct credentials", () => {
    it("signs up user after filling out form", async () => {
      const usernameField = await getElementById("username-field", driver);
      const passwordField = await getElementById("password-field", driver);
      const signUpButton = await getElementById("signup-button-active", driver);

      await usernameField.sendKeys(username);
      await passwordField.sendKeys(password);

      const usernameText = await usernameField.getAttribute("value");
      const passwordText = await passwordField.getAttribute("value");

      expect(usernameText).toEqual(username);
      expect(passwordText).toEqual(password);

      // await signUpButton.click();
      driver.executeScript("arguments[0].click();", signUpButton)

      const appNameElement = await getElementById("app-title", driver);
      const text = await appNameElement.getText();
      expect(text).toEqual("Parkmate");
    }, 20000);

    it("logs out user after signing up", async () => {
      const logoutButton = await getElementById("logout-btn", driver);

      await driver.wait(until.elementIsEnabled(logoutButton), 10000);
      // await logoutButton.click();
      driver.executeScript("arguments[0].click();", logoutButton)

      const loginGreetElement = await getElementById("login-greet", driver);
      const loginGreetText = await loginGreetElement.getText();
      const expectedLoginGreetText = "Welcome To ParkMate!";
      expect(loginGreetText).toEqual(expectedLoginGreetText);
    }, 10000);
  });
});
