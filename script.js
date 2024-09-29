const eleminp = document.querySelector('body input.hiddeninput');
eleminp.value = '';
if ('ontouchstart' in document.documentElement) {

    let previnp = ''; // Store previous input value


    eleminp.focus();
    setInterval(()=>{eleminp.focus()}, 400)
    eleminp.addEventListener('keyup', function(event) {
        const currentInput = eleminp.value;

        // Handle character addition
        if (currentInput.length > previnp.length) {
            const key = currentInput.slice(-1); // Get the last character typed
            const keyCode = key.charCodeAt(0); // Get the character code
            keydown({'key': key, 'keyCode': keyCode});
        }

        // Handle backspace action
        if (currentInput.length < previnp.length) {
            keydown({'key': 'Backspace', 'keyCode': 8});
        }

        // Handle Enter key action
        if (event.key === 'Enter') {
            if (currentInput.length > 0) {
                keydown({'key': 'Enter', 'keyCode': 13});
            } else {
                event.preventDefault(); // Prevent action if input is empty
            }
        }

        // Update previous input value
        previnp = currentInput; // Update the previous input value
    });
}

else {
    document.onkeydown = (event)=>{event.preventDefault(); keydown(event)}
}

function changeactive() {
    var lines = document.querySelectorAll('div.text span')
    

    let i = 0;
    while (i < lines.length) {
        lines[i].className = ''
        i++;
    }

    lines[lines.length-1].className = 'cursor'
    
}
function printText(text=null, ishtml=true, newline=true) {
    var textdiv = document.querySelector('div.text')
    if (text !== null) {

        const p_line = document.createElement('span')
        p_line.style.color = 'rgb(204, 198, 198)'
        
        if (!ishtml) {
            let setwith = serializeForInnerHTML(text).replaceAll(' ', '&nbsp;');
            p_line.innerHTML = setwith
        }
        else {
            p_line.innerHTML= text
        }

        textdiv.appendChild(p_line)
    }
    if (newline == true) {
        textdiv.appendChild(document.createElement('br'))
    }
    changeactive()
    setTimeout(() => {textdiv.scrollTo(0, textdiv.scrollHeight)}, 10)

}


/* async function getIP() {
    const text = await (await fetch("https://api.db-ip.com/v2/free/self")).text()
    const ip = JSON.parse(text)['ipAddress']
    return ip
} */


changeactive()

let keyboardcurrent = ''
let enterpressed = false
function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
async function keydown(event) {
    const lines = document.querySelectorAll('div.text span')
    const key = event.key
    if (key.length === 1) {
        if (key !== ' ') {
        lines[lines.length-1].textContent+= key}
        else {
            lines[lines.length-1].innerHTML+= '&nbsp;'
        }
        
        keyboardcurrent += key
    }
    else {
        if (key === 'Backspace') {
            
            const linelast = lines[lines.length-1].innerHTML[lines[lines.length-1].innerHTML.length-1],
                kblast = keyboardcurrent[keyboardcurrent.length-1]
            if (linelast === kblast) {
                lines[lines.length-1].innerHTML = lines[lines.length-1].innerHTML.slice(0, -1)
                
            }
            keyboardcurrent = keyboardcurrent.slice(0, -1)
        }
        else if (key === 'Enter') {
            await execcmd(keyboardcurrent)
        }
    }

}
var previnp = '';
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function serializeForInnerHTML(text) {
    return text
        .replace(/&/g, '&amp;')    // Replace & with &amp;
        .replace(/</g, '&lt;')     // Replace < with &lt;
        .replace(/>/g, '&gt;')     // Replace > with &gt;
        .replace(/"/g, '&quot;')   // Replace " with &quot;
        .replace(/'/g, '&#39;');   // Replace ' with &#39;
}
var commands = {
    'whoami': () => {
        printText('  how   are youcou', false)
    },
    'neofetch': () => {
        printText('<br><img src="/me.png" width=160, height=160 style="padding-left: 20px; margin-bottom: 20px;"></img><div style="padding-left: 190px; margin-top:-160px">OS: Windows 11 IoT LTSC 24H2 (OS Build 26100.1742)<br>RAM: 8 GB<br>SSD: 256 GB<br>Host: HP 250 G10<br>CPU: 13th Gen Intel Core i5-1335U 1.30GHz<br>GPU: Intel UHD Graphics 770</div><br><br><a style="background-color: #383838; color: #ffffff !important" href="https://github.com/mgytr">GitHub</a> <a style="background-color: rgb(255, 100, 100); color: #000000" href="https://youtube.com/@MoneyGrab">YouTube</a> <a style="background-color: rgb(76, 116, 217); color: #FFFFFF" onclick="execcmd(\'discord\')" href="#">Discord</a><br>')
    },
    'projects': () => {
        printText('<a style="background-color: rgb(56, 56, 220); color: #000000" href="https://github.com/mgytr/MangaDownloader">MangaDownloader</a> - CLI for downloading Manga to your Kindle from libgen.li<br><a style="background-color: rgb(56, 56, 220); color: #000000" href="https://github.com/mgytr/SpotifyTUI">SpotifyTUI</a> - TUI for controlling spotify using the Spotify Web API (premium required)<br><a style="background-color: rgb(56, 56, 220); color: #000000" href="/monc0ver">monc0ver</a> - jelbrek ios 1-21 ipados wachos tvos makos visonos fridgeos')
    },
    'clear': () => {
        document.querySelector('div.text').innerHTML = '<span>'
    },
    'help': () => {
        printText('Avalible commands:<br>whoami<br>neofetch<br>discord<br>clear<br>projects<br>help'+(localStorage.getItem('rickrolled') === null ? '<br>clean_system' : ''), true)
    },
    'discord': () => {
        printText('<span style="color: rgb(76, 116, 217)">Discord: @MoneyGrabYT</span>', true)
    }
}
if (localStorage.getItem('rickrolled') === null) {
    commands['clean_system'] = async () => {
        const rickroll = ()=>{window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
        printText('Disinfecting system...', true)
        await sleep(2000)
        let virus_list = ['PUA.Linux.Miner-67823', 'Trojan.Script.Inject-33788', 'Worm.Linux.AutoRun-56102', 'Backdoor.Linux.Agent-70456', 'Worm.Linux.Mirai-5870924-0']
        shuffle(virus_list)
        let did = false;
        for (let i = 0; i < virus_list.length; i++) {
            // unlikely random that is rarely 1 and mostly 0
            let virus = virus_list[i]
            printText(`Removing ${virus}...`, true)
            await sleep(Math.floor(Math.random() * 1000)*1.5)
            if (Math.random() > 0.8 && !did) {
                did = true;
                rickroll()
            }
            if (did) {
                break;
            };
                

        }
        if (!did) {
            rickroll()
            did = true;
        }
        localStorage.setItem('rickrolled', 'true')
        printText('Allow popup for final disinfection')
        
        
    }
}

async function execcmd(cmd) {
    keyboardcurrent = ''
    printText()

    if (Object.keys(commands).includes(cmd)) {
        // check if func is async
        if (typeof commands[cmd] === 'function' && commands[cmd].constructor.name === 'AsyncFunction') {
            await commands[cmd]()
        }

        else {
            commands[cmd]()
        }
    }
    else if (cmd.replaceAll(' ', '') !== '') {

        printText(`${cmd}: command not found`, false)
    }

    cmdprompt()
    let textdiv = document.querySelector('div.text')
}
var ip = ''

async function shell() {
    // cmdprompt = () => {printText(`[${ip}@mgyt.cf]:~ $ `, false)}
    // ip = await getIP() 
    cmdprompt = () => {printText(`[you@mgyt.xyz]:~ $ `, true, false)}
    commands['neofetch']()
    printText('Run help for commands', true)
    printText('Last site update: September 29, 2024')
    if (localStorage.getItem('rickrolled') === null) printText('5 viruses have been detected! Please clean your system using "clean_system"', true)

    cmdprompt()
    let textelem = document.querySelector('body .text')
    textelem.scrollTo(0, textelem.scrollHeight)

    
}

shell()

