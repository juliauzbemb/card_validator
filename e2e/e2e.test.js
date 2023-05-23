import puppeteer from "puppeteer";

const childProcess = require('child_process');

jest.setTimeout(30000);

describe('Testing form widget', () => {
  let browser = null;
  let page = null;
  let server = null;

  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = await childProcess.fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppeteer.launch({
      // headless: false, 
      // devtools: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  describe('Validation form', () => {
    test('valid number test', async () => {
      await page.goto(baseUrl);
      await page.waitForSelector('.validator-form');
      const form = await page.$('.validator-form');
      const input = await form.$('.input-card');
      const submit = await form.$('.button');
  
      await input.type('6011535229714786');
      await submit.click();
  
      await page.waitForSelector('.message.message-success.active').then(() => console.log('verified'));
    });
  
    test('invalid number test - length error', async () => {
      await page.goto(baseUrl);
      await page.waitForSelector('.validator-form');
      const form = await page.$('.validator-form');
      const input = await form.$('.input-card');
      const submit = await form.$('.button');
  
      await input.type('6011');
      await submit.click();
  
      await page.waitForSelector('.error-length.active').then(() => console.log('not-verified - length error'));
    });
  
    test('invalid number test - wrong number', async () => {
      await page.goto(baseUrl);
      await page.waitForSelector('.validator-form');
      const form = await page.$('.validator-form');
      const input = await form.$('.input-card');
      const submit = await form.$('.button');
  
      await input.type('4716768204204283389');
      await submit.click();
  
      await page.waitForSelector('.error-failed.active').then(() => console.log('not-verified - wrong number'));
    });
  });
})