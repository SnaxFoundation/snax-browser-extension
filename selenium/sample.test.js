import webdriver from 'selenium-webdriver';

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

describe('Google getter', () => {
  it('should get google', async () => {
    await driver.get('http://www.google.com');
  })
});




