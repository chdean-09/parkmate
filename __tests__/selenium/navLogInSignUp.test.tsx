import { Builder, WebDriver, By, WebElement } from "selenium-webdriver";
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

describe("Navigate log in page and sign up page", () => {
  beforeEach(async () => {
    await driver.get(rootURL);
  });

  it(
    "initializes the context",
    async () => {
      await driver.get(rootURL);
    },
    10000
  );

  it(
    "Renders login page, have greetings and app name displayed",
    async () => {
      const headerEl = await getElementByXPath(
        "/html/body/div/div/form/h2/span",
        driver
      );

      const textHeader = await headerEl.getText();
      const expectedHeaderText = "Login to continue";

      expect(textHeader).toEqual(expectedHeaderText);
    },
    10000
  );

  describe("Navigate to SignUp and back to Login", () => {
    let signUpLinkEl: WebElement;

    describe("Go to Sign Up Page", () => {
      beforeEach(async () => {
        signUpLinkEl = await getElementByXPath(
          "/html/body/div/div/h1/a",
          driver
        );
      });

      it(
        "must have sign up link",
        async () => {
          const signUpText = await signUpLinkEl.getText();
          const expectedSignUpText = "Sign up now!";

          expect(signUpText).toEqual(expectedSignUpText);
        },
        10000
      );

      it(
        "go to sign up and render the sign up page",
        async () => {
          await signUpLinkEl.click();

          const signUpUniqueEl = await getElementByXPath(
            "/html/body/div/form/h2/span",
            driver
          );
          const signUpHeaderText = await signUpUniqueEl.getText();
          const expectedSignUpHeaderText = "Sign up to continue";

          expect(signUpHeaderText).toEqual(expectedSignUpHeaderText);
        },
        10000
      );
    });

    describe("Go back to log in page", () => {
      it(
        "go to login",
        async () => {
          const signUpLinkEl = await getElementByXPath(
            "/html/body/div/div/h1/a",
            driver
          );
      
          const signUpLinkText = await signUpLinkEl.getText();
          const expectedSignUpLinkText = "Sign up now!";
      
          expect(signUpLinkText).toEqual(expectedSignUpLinkText);
      
          await signUpLinkEl.click();
        },
        10000
      );

      it(
        "renders the log in page",
        async () => {
          const headerEl = await getElementByXPath(
            "/html/body/div/div/form/h2/span",
            driver
          );

          const textHeader = await headerEl.getText();
          const expectedHeaderText = "Login to continue";

          expect(textHeader).toEqual(expectedHeaderText);
        },
        10000
      );
    });

    describe("Go back to Signup again", () => {
      let signUpLinkEl: WebElement;
      beforeEach(async () => {
        signUpLinkEl = await getElementByXPath(
          "/html/body/div/div/h1/a",
          driver
        );
      });

      it(
        "must have sign up link",
        async () => {
          const signUpText = await signUpLinkEl.getText();
          const expectedSignUpText = "Sign up now!";

          expect(signUpText).toEqual(expectedSignUpText);
        },
        10000
      );

      it(
        "go to sign up and render the sign up page",
        async () => {
          await signUpLinkEl.click();

          const signUpUniqueEl = await getElementByXPath(
            "/html/body/div/form/h2/span",
            driver
          );
          const signUpHeaderText = await signUpUniqueEl.getText();
          const expectedSignUpHeaderText = "Sign up to continue";

          expect(signUpHeaderText).toEqual(expectedSignUpHeaderText);
        },
        10000
      );
    });
  });
});

// Teardown
afterAll(async () => {
  await driver.quit();
});
