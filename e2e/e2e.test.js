import puppeteer from "puppeteer";

const childProcess = require('child_process');

jest.setTimeout(30000);


describe('Testing form widget', () => {
  let browser = null;
  let page = null;
  let server = null;

  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = childProcess.fork(`${__dirname}/e2e.server.js`);
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

  describe('Testing valid numbers', () => {
    test.each([
      {test_number: '6011535229714786', description: 'valid number discover', selector: 'div.card-item.discover > .icon.icon-active'},
      {test_number: '4929802127528189', description: 'valid number visa', selector: 'div.card-item.visa > .icon.icon-active'},
      {test_number: '5356158305930971', description: 'valid number mastercard', selector: 'div.card-item.mastercard > .icon.icon-active'},
      {test_number: '379595962078244', description: 'valid number american express', selector: 'div.card-item.american-express > .icon.icon-active'},
      {test_number: '3535147456425334331', description: 'valid number jcb', selector: 'div.card-item.jcb > .icon.icon-active'},
      {test_number: '30385202216072', description: 'valid number diners', selector: 'div.card-item.diners > .icon.icon-active'},
    ])('($description) ($test_number)', async({test_number, description, selector}) => {
      await page.goto(baseUrl);
      await page.waitForSelector('.validator-form');
      const form = await page.$('.validator-form');
      const input = await form.$('.input-card');
      const submit = await form.$('.button');
    
      await input.type(test_number);
      await submit.click();

      await page.waitForSelector('.message.message-success.active');

      await page.waitForSelector(selector).then(() => console.log(description));
    });
  })

  describe('testing invalid numbers', () => {
    test.each([
      {test_number: '6011', description: 'invalid number', selector: '.error-length.active'},
      {test_number: '4716768204204283389', description: 'invalid number - not verified', selector: '.error-failed.active'},
      {test_number: '', description: 'invalid number - empty string', selector: '.error-no-input.active'},
      {test_number: '124d', description: 'invalid number - not digits', selector: '.error-not-digits.active'},
      {test_number: '123123123123', description: 'invalid number - payment system not found', selector: '.error-not-found.active'}
    ])('($description) ($test_number)', async({test_number, description, selector}) => {
      await page.goto(baseUrl);
      await page.waitForSelector('.validator-form');
      const form = await page.$('.validator-form');
      const input = await form.$('.input-card');
      const submit = await form.$('.button');
    
      await input.type(test_number);
      await submit.click();
    
      await page.waitForSelector(selector).then(() => console.log(description));
    });
  })
})