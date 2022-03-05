// MADE BY SCR1PP3D

// vars
import fetch from 'node-fetch';
import PromptSync from 'prompt-sync';
import nodeBashTitle from 'node-bash-title'
import clipboard from 'clipboardy';
import colors from 'colors'
import open from 'open'
import fs from 'fs'



const prompt = PromptSync();

function log(txt) {
    console.log('[X] '.brightRed + txt)
}

function error(txt) {
    console.log('[!] '.brightRed + txt.toUpperCase())
}

function pprompt(txt) {
    return prompt('[X] '.brightRed + '>> ' + txt.toUpperCase().brightWhite); 
} 



function showErr() {
    error('An error occurred')
    pprompt('Press any key to quit')
    return process.exit(1)
}



var base = {}


function start() {
    nodeBashTitle('ROBLOX INVENTORY SHOPPER BY SCR1PP3D')
    console.clear();
    console.log(`      
    █░░ █▀█ █▀█ █▄▀ █▀ ▀█▀ █▀▀ ▄▀█ █░░ █▀▀ █▀█
    █▄▄ █▄█ █▄█ █░█ ▄█ ░█░ ██▄ █▀█ █▄▄ ██▄ █▀▄COPY SOMEONE'S OUTFIT  
    BY SCR1PP3D | TYPE '=' TO QUIT
    ─────────────────────────────────────────────────`.brightRed)
}


async function getID() {
    start()

    var userIn = pprompt('Enter username/ID: ')
    if (parseInt(userIn)) {
        function checkNum() {
            log('You entered a number, is this a URL (u) or an ID (i): ')
            var type = pprompt('');
    
            if (type.toLowerCase() == 'u') {
                getIDFromUsername()
            }
            else if (type.toLowerCase() == 'i') {
                base.id = userIn
                getOutfit()
            }
            else {
                checkNum()
            }
        }
        checkNum()
    }
    else if (typeof userIn == 'string' && !userIn.includes('=')) {
        getIDFromUsername()
    }
    else {
        process.exit(1)
    }

    async function getIDFromUsername() {
        var url = 'https://api.roblox.com/users/get-by-username?username='+userIn;
        var response = await fetch(url);
        var data = await response.json();
    
        var id = data.Id;

        base.id = id
    
        if (JSON.stringify(data).includes('Something went wrong')) {
            return showErr()
        }
        getOutfit()
    }
}

async function getOutfit() {
    log('ID: '+ base.id)
    var url = 'https://avatar.roblox.com/v1/users/'+base.id+'/currently-wearing';
    var response = await fetch(url);
    var data = await response.json();

    if (data.assetIds == undefined) {
        showErr()
    }

    data.assetIds.forEach(asset => {
        var item = 'https://www.roblox.com/catalog/'+asset+'/'
        log(item)
    });
    
    log('How do you want to view these links?')
    log(`
    [1]. Open all links
    [2]. Choose links to open
    [3]. Choose links to copy to clipboard
    [4]. Save to text files
    [5]. Close the program`)


    var view = pprompt('')

    if (view == 1) {
        data.assetIds.forEach(asset => {
            var item = 'https://www.roblox.com/catalog/'+asset+'/'
            open(item)
        });
    }
    else if (view == 2) {
        data.assetIds.forEach(asset => {
            var item = 'https://www.roblox.com/catalog/'+asset+'/'
            log('Do you want to open this link? (Y/'+'N'.underline+')')
            var opt = pprompt('')

            if (opt.toLowerCase() == 'y') {
                open(item)
            }
            else {
                pprompt('Press any key to quit: ')
                process.exit()
            }
            
        });
    }
    else if (view == 3) {
        data.assetIds.forEach(asset => {
            var item = 'https://www.roblox.com/catalog/'+asset+'/'
            log('Do you want to copy this link? (Y/'+'N'.underline+')')
            var opt = pprompt('')

            if (opt.toLowerCase() == 'y') {
                clipboard.writeSync(item.toString())
            }
            
        });
    }
    else if (view == 4) {
        data.assetIds.forEach(asset => {
            var item = 'https://www.roblox.com/catalog/'+asset+'/'

            fs.appendFile(base.id + '_inventory.txt', item, err => {
                if (err) {
                    return showErr()
                }
            })
        });
    }
    else if (view == 5) {
        process.exit(1)
    }

}

getID()
