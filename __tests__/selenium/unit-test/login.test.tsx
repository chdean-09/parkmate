import { Builder, WebDriver, By, WebElement, until } from "selenium-webdriver";
import "selenium-webdriver/chrome";
import "chromedriver";
import "selenium-webdriver/firefox";
import "geckodriver";
import { getElementById } from "@/lib/selenium-utils";


const rootURL = "http://localhost:3000/login";
const signUpURL = "http://localhost:3000/signup";

let driver: WebDriver;

describe("Login Page", () => {
  beforeAll(async () => {
    driver = await new Builder().forBrowser("firefox").build();
  }, 20000);

  afterAll(async () => {
    await driver.quit();
  }, 20000);

  describe("Sign up first", () => {
    beforeAll(async () => {
      await driver.get(signUpURL);
    }, 20000);

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

      // await signUpButton.click();
      
      // Brute force click because it is obscured by an element which I dont know how to handle
      driver.executeScript("arguments[0].click();", signUpButton)


      const appNameElement = await getElementById("app-title", driver);
      const text = await appNameElement.getText();
      expect(text).toEqual("Parkmate");
    }, 10000);

    it("logs out user after signing up", async () => {
      const logoutButton = await getElementById("logout-btn", driver);

      await driver.wait(until.elementIsEnabled(logoutButton), 10000)
      
      // await logoutButton.click();
      
      driver.executeScript("arguments[0].click();", logoutButton)

      const loginGreetElement = await getElementById("login-greet", driver);
      const loginGreetText = await loginGreetElement.getText();
      const expectedLoginGreetText = "Welcome To ParkMate!";
      expect(loginGreetText).toEqual(expectedLoginGreetText);
    }, 10000);
  });

  describe("Display Login Form", () => {
    beforeAll(async () => {
      await driver.get(rootURL);
    });

    it("displays greetings and app name", async () => {
      const headerEl = await getElementById("login-greet", driver);
      const greetHeader = await headerEl.getText();
      const expectedGreetHeaderText = "Welcome To ParkMate!";
      expect(greetHeader).toEqual(expectedGreetHeaderText);
    });

    it("displays login to continue text", async () => {
      const loginContinueEl = await getElementById("login-continue-text", driver);
      const loginContinueText = await loginContinueEl.getText();
      const expectedLoginContinueText = "Login to continue";
      expect(loginContinueText).toEqual(expectedLoginContinueText);
    });

    it("contains a sign-up link", async () => {
      const noAcctEl = await getElementById("signup-question", driver);
      const signUpLinkEl = await getElementById("signup-link", driver);
      const noAcctText = await noAcctEl.getText();
      const expectedNoAcctText = "No account?";
      const signUpText = await signUpLinkEl.getText();
      const expectedSignUpText = "Sign up now!";
      expect(noAcctText).toEqual(expectedNoAcctText);
      expect(signUpText).toEqual(expectedSignUpText);
    });
  });

  describe("User enters incorrect credentials", () => {
    beforeAll(async () => {
      await driver.get(rootURL);
    });

    it("doesn't log in the user and returns error message 'Incorrect username or password'", async () => {
      const usernameField = await getElementById("username-field", driver);
      const passwordField = await getElementById("password-field", driver);
      const loginButton = await getElementById("login-btn-active", driver);

      await usernameField.sendKeys("seleniumtest-wrong");
      const usernameText = await usernameField.getAttribute("value");
      await passwordField.sendKeys("seleniumtestpassword-wrong");
      const passwordText = await passwordField.getAttribute("value");

      const expectedUsername = "seleniumtest-wrong";
      expect(usernameText).toEqual(expectedUsername);
      const expectedCreds = "seleniumtestpassword-wrong";
      expect(passwordText).toEqual(expectedCreds);

      // await loginButton.click();
      driver.executeScript("arguments[0].click();", loginButton)


      const errorElement = await getElementById("error-message", driver);
      const errorText = await errorElement.getText();
      const expectedErrorText = "Incorrect username or password";
      expect(errorText).toEqual(expectedErrorText);

      await usernameField.clear();
      await passwordField.clear();
    }, 10000);

    it("displays error message if username is less than 3 characters", async () => {
      const usernameField = await getElementById("username-field", driver);
      const passwordField = await getElementById("password-field", driver);
      const loginButton = await getElementById("login-btn-active", driver);

      await usernameField.sendKeys("se");
      await passwordField.sendKeys("seleniumtestpassword");
      const usernameText = await usernameField.getAttribute("value");
      const passwordText = await passwordField.getAttribute("value");

      const expectedUsername = "se";
      expect(usernameText).toEqual(expectedUsername);
      const expectedPassword = "seleniumtestpassword";
      expect(passwordText).toEqual(expectedPassword);

      // await loginButton.click();
      driver.executeScript("arguments[0].click();", loginButton) 

      const errorElement = await getElementById("error-message", driver);
      const errorText = await errorElement.getText();
      const expectedErrorText = "Username must be at least 3 characters.";
      expect(errorText).toEqual(expectedErrorText);

      await usernameField.clear();
      await passwordField.clear();
    }, 10000);
  });
});
