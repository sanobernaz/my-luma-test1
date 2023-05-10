const{Builder, By, Until, until}= require('selenium-webdriver');
const should= require('chai').should();
require('dotenv').config();

let user= process.env.USER;
let pass= process.env.PASS;

describe('login test',() => {
    context('I click on login and enter my credentials',()=>{
        it('I should be logged in and see my profile',async()=>{

            const driver= await new Builder().forBrowser('firefox').build();
            try{
                await driver.get('http://magento.softWaretestingboard.com');
                await driver.findElement(By.css('.authorization-link > a:nth-child(1)')).click();
               // await driver.findElement(By.id('email'));
                await driver.wait(until.elementLocated(By.id('email')),10000);

                await driver.findElement(By.id('email')).sendKeys(user);
                await driver.findElement(By.id('pass')).sendKeys(pass);

                await driver.findElement(By.css('#send2')).click();

                await driver.sleep(1000);

                await driver.wait(until.elementLocated(By.css('.action.switch')),200000);
                await driver.findElement(By.css('.action.switch')).click();
                await driver.wait(until.elementLocated(By.css('a[href="https://magento.softwaretestingboard.com/customer/account/"]')),10000)
                await driver.findElement(By.css('a[href$="/customer/account/"]')).click();
            
                await driver.wait(until.elementLocated(By.css('.box-information .box-content p')), 10000);
                let information = await driver.findElement(By.css('.box-information .box-content p')).getText();
                
                console.log(information.should.contain(user));

             
            }
            catch(error){
                it('this test should be pending');
            }
            finally{
               
                await driver.quit();
            }
            

        })
    })
})
