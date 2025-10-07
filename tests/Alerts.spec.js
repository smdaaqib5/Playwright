const{test,expect}=require('@playwright/test')
test('simple Alert' ,async({page})=>{
   await page.goto('https://testautomationpractice.blogspot.com/')

// enabling dialog handler
page.on('dialog',async dialog=>{
    expect(dialog.type()).toContain('alert');  // not necessary
    expect(dialog.message()).toContain('I am an alert box!')
    await dialog.accept();
})
await page.locator('//button[contains(@id,"alertBtn")]').click();
await page.waitForTimeout(2000);
});

test('Confirm Alert' ,async({page})=>{
   await page.goto('https://testautomationpractice.blogspot.com/')

// enabling dialog handler
page.on('dialog', async dialog=>{
    expect(dialog.type()).toContain('confirm');
    expect(dialog.message()).toContain('Press a button!')
    await dialog.dismiss();
})
await page.locator('//button[text()="Confirmation Alert"]').click();
await expect(await page.locator('p[id="demo"]')).toHaveText("You pressed Cancel!");
await page.waitForTimeout(4000);
})


test.skip('Prompt Alert' ,async({page})=>{
   await page.goto('https://testautomationpractice.blogspot.com/')

// enabling dialog handler
page.on('dialog', async dialog=>{
    expect(dialog.type()).toContain('prompt');
    expect(dialog.message()).toContain('Please enter your name:')
    expect(dialog.defaultValue()).toContain('Harry Potter')
    await dialog.accept('Syed');
})
await page.locator('[id="promptBtn"]').click();
await expect(await page.locator('//p[starts-with(text(),"Hello Syed! How")]')).toHaveText("Hello Syed! How are you today?");
await page.waitForTimeout(4000);
await page.close();
})