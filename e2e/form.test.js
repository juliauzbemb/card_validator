import puppeteer from "puppeteer";

describe('Testing form widget', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
    await page.goto('http://localhost:9000');
    const searchSelector = '.validator-form';
    await page.waitForSelector(searchSelector).then(() => console.log('form is rendered'));
  });

  test('valid number test', async () => {
    const form = await page.$('.validator-form');
    const input = await form.$('.input-card');
    const submit = await form.$('.button');

    await input.type('6011535229714786');
    await submit.click();

    await page.waitForSelector('.message.message-success.active').then(() => console.log('verified'));
  }, 10000);

  test('invalid number test - length error', async () => {
    const form = await page.$('.validator-form');
    const input = await form.$('.input-card');
    const submit = await form.$('.button');

    await input.type('6011');
    await submit.click();

    await page.waitForSelector('.error-length.active').then(() => console.log('not-verified - length error'));
  }, 10000);

  test('invalid number test - wrong number', async () => {
    const form = await page.$('.validator-form');
    const input = await form.$('.input-card');
    const submit = await form.$('.button');

    await input.type('4716768204204283389');
    await submit.click();

    await page.waitForSelector('.error-failed.active').then(() => console.log('not-verified - wrong number'));
  }, 10000)


  afterEach(async () => {
    await browser.close();
  })
})