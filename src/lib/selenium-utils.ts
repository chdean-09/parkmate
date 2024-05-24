import { until, By, WebDriver, WebElement } from "selenium-webdriver";

export async function getElementById(
  id: string,
  driver: WebDriver,
  waitTime: number = 5000 // Default wait time in milliseconds
): Promise<WebElement> {
  try {
    const el = await driver.wait(until.elementLocated(By.id(id)), waitTime);
    await driver.wait(until.elementIsVisible(el), waitTime);

    return el;
  } catch (error: any) {
    throw new Error(`Error locating element with ID "${id}": ${error.message}`);
  }
}

export async function getElementByXPath(
  xpath: string,
  driver: WebDriver,
  waitTime: number = 5000 // Default wait time in milliseconds
): Promise<WebElement> {
  try {
    const el = await driver.wait(
      until.elementLocated(By.xpath(xpath)),
      waitTime
    );
    await driver.wait(until.elementIsVisible(el), waitTime);

    return el;
  } catch (error: any) {
    throw new Error(
      `Error locating element with XPath "${xpath}": ${error.message}`
    );
  }
}
