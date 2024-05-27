import { until, By, WebDriver, WebElement } from "selenium-webdriver";

const waitUntilTime = 10 * 1000; // milliseconds

export async function getElementById(
  id: string,
  driver: WebDriver,
): Promise<WebElement> {
  try {
    const el = await driver.wait(
      until.elementLocated(By.id(id)),
      waitUntilTime,
    );
    await driver.wait(until.elementIsVisible(el), waitUntilTime);

    return el as WebElement;
  } catch (error: any) {
    throw new Error(
      `Error locating element with ID "${id}": ${error.message}`,
    ) as Error;
  }
}

export async function getElementByXPath(
  xpath: string,
  driver: WebDriver,
): Promise<WebElement> {
  try {
    const el = await driver.wait(
      until.elementLocated(By.xpath(xpath)),
      waitUntilTime,
    );
    await driver.wait(until.elementIsVisible(el), waitUntilTime);

    return el as WebElement;
  } catch (error: any) {
    throw new Error(
      `Error locating element with XPath "${xpath}": ${error.message}`,
    ) as Error;
  }
}
