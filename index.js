
const $ = require('cheerio');
const puppeteer = require('puppeteer');
const prompt = require('prompt-sync')({sigint: true});
const opn = require('opn');





console.log()
console.log('█▀█ █▀█ █▄▄ █░░ █▀█ ▀▄▀   █ █▄░█ █░█ █▀▀ █▄░█ ▀█▀ █▀█ █▀█ █▄█   █▀ █░█ █▀█ █▀█ █▀█ █▀▀ █▀█')
console.log('█▀▄ █▄█ █▄█ █▄▄ █▄█ █░█   █ █░▀█ ▀▄▀ ██▄ █░▀█ ░█░ █▄█ █▀▄ ░█░   ▄█ █▀█ █▄█ █▀▀ █▀▀ ██▄ █▀▄')


console.log()
console.log()
console.log('Contact:')
console.log()
console.log('Github: http://github.com/Scripped')
console.log('Roblox: https://www.roblox.com/users/1957038621/profile')
console.log()
prompt('Press any key to continue: ');

// clear the console //
process.stdout.write('\033c');

console.log('Right click to paste.')
const userid = prompt('Enter the user ID (NOT the username): ')
const url = "https://www.roblox.com/users/"+ userid +"/profile";

const incognito = prompt('Would you like these links to open on incognito mode? (no) ')

if (incognito == 'yes' || incognito === 'y' || incognito === 'Yes' || incognito === 'YES' || incognito === 'Y') {
    function opencommand() { opn(itemurl, {app: ['chrome', '--incognito']});}
} else {
    function opencommand() { opn(itemurl);}
}

console.log('Ctrl + C to quit when you have finished reading.')
console.log()
scrape()

async function scrape() {
const browser = await puppeteer.launch({executablePath: "./node_modules/puppeteer/.local-chromium/win64-869685/chrome-win/chrome.exe"})
.then(async function(browser) {
    return browser.newPage()
})
.then(async function(page) {
    return page.goto(url).then(function() {
        return page.content()
    })
})
.then(function(html) {
    $('h2.profile-name', html).each(function() {
        console.log( 'Username: ' + $(this).text())
    })
    $('.accoutrement-item > a', html).each(function() {
        itemurl = $(this).attr('href');
        console.log( 'Currently Wearing: ' + itemurl)

const openoption = prompt('Want to open this link? (yes) ')

if (openoption === 'no' || openoption === 'n' || openoption === 'No' || openoption === 'NO' || openoption === 'N') {
    console.log()
} 
else {
    opencommand()
}

})

})
.catch(function(err) {
    console.log('An error occured. Ctrl + C to quit. ' + err )
})
}
