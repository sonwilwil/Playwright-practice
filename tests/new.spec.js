// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('End to end testing', () => {
  test('User has not logged in', async ({ page }) => {
    // User visits the homepage
    await expect(page).toHaveTitle('Conduit')
    await expect(page).toHaveTitle(/duit/, {timeout: 2000})
    const navbar = [ 'Home', 'Sign in', 'Sign up','Global Feed']
    await expect(page.locator('.nav-link')).toHaveText(navbar)
    
    // User login with email blank
    await page.locator('[href="#login"]').click()
    await expect(page).toHaveURL(/login/)
    await page.locator('[placeholder="Password"]').type('hihi')
    await page.locator('button').click()
    await expect(page.locator('.error-messages')).toBeVisible()
    await expect(page.locator('.error-messages')).toHaveText("email can't be blank")

    // User login with password blank
    await page.reload()
    await page.locator('[placeholder="Email"]').type('hihi@gmail.com')
    await page.locator('button').click()
    await expect(page.locator('.error-messages')).toBeVisible()
    await expect(page.locator('.error-messages')).toHaveText("password can't be blank")
    
    // User login with invalid credentials
    await page.reload()
    await page.locator('[placeholder="Email"]').type('haha@yopmail.com')
    await page.locator('[placeholder="Password"]').type('hihi')
    await page.locator('button').click()
    await expect(page.locator('.error-messages')).toBeVisible()
    await expect(page.locator('.error-messages')).toHaveText('email or password is invalid')
    
    // User register with email blank
    await page.goBack()
    await page.click('[href="#register"]')
    await expect(page).toHaveURL(/register/)
    await page.locator('[placeholder="Password"]').type('hihi')
    await page.locator('button').click()
    await expect(page.locator('.error-messages')).toBeVisible()
    await expect(page.locator('.error-messages')).toHaveText("email can't be blank")

    // User register with username blank
    await page.reload()
    await page.locator('[placeholder="Email"]').type('hihi@gmail.com')
    await page.locator('button').click()
    await expect(page.locator('.error-messages')).toBeVisible()
    await expect(page.locator('.error-messages')).toHaveText("username can't be blank")

    // User register with password blank
    await page.reload()
    await page.locator('[placeholder="Username"]').type('sasasaskjaso')
    await page.locator('[placeholder="Email"]').type('hihi@gmail.com')
    await page.locator('button').click()
    await expect(page.locator('.error-messages')).toBeVisible()
    await expect(page.locator('.error-messages')).toHaveText("password can't be blank")

    // User register with existing account
    await page.reload()
    await page.locator('[placeholder="Username"]').type('askasjkaj')
    await page.locator('[placeholder="Email"]').type('wilwilson@yopmail.com')
    await page.locator('[placeholder="Password"]').type('hihi')
    await page.locator('button').click()
    await expect(page.locator('.error-messages')).toBeVisible()
    await expect(page.locator('.error-messages')).toHaveText("email has already been taken")
  })
  test('User has logged in', async ({ page }) => {
    await page.locator('[href="#login"]').click()
    await page.locator('[placeholder="Email"]').type('wilwilson@yopmail.com')
    await page.locator('[placeholder="Password"]').type('admin123')
    await page.locator('button').click()
    await expect(page.locator('a[href="#@wilson"]')).toBeVisible()
    await expect(page.locator('a[href="#@wilson"]')).toHaveText('wilson')
  });
})

