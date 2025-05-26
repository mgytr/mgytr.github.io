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
            p_line.style.whiteSpace = 'pre'
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
        printText('you', false)
    },
'fastfetch': () => {
    if (!statsData) {
        printText("Stats not loaded yet...", false);
        return;
    }
    printText("", true);

    const { ramused, ramtotal, rampercentage, vramused, vramtotal, vrampercentage, disks, pacman, flatpak, uptime } = statsData;

    const color = '#F2AEFD';

    // Wrap dash + next char with colored span
    function colorDashPair(line) {
        return line.replace(/(─ .)/, match => `<span style="color:${color}">${match}</span>`);
    }

    // Wrap percentages (e.g. 55%) with colored span
    function colorPercentages(line) {
        return line.replace(/(\d+%)/g, `<span style="color:${color}">$1</span>`);
    }

    // Compose info lines with colors applied
    const infoLines = [
        "┌── hardware",
        colorDashPair(colorPercentages(`─  ◎ AMD Ryzen 7 5700X3D (16) @ 4.15 GHz`)),
        colorDashPair(colorPercentages(`─  ◎ NVIDIA GeForce RTX 4070 (5888) @ 3.10 GHz (${vramused.toFixed(2)} GiB / ${vramtotal.toFixed(2)} GiB, ${vrampercentage}%) [Discrete]`)),
        colorDashPair(colorPercentages(`─  ◎ ${ramused.toFixed(2)} GiB / ${ramtotal.toFixed(2)} GiB (${rampercentage}%)`)),
        ...disks.map(d => {
            const ext = d.external ? " [External]" : "";
            return colorDashPair(colorPercentages(`─    ◎ ${d.used.toFixed(2)} GiB / ${d.total.toFixed(2)} GiB (${d.percentage}%) - ${d.fstype}${ext}`));
        }),
        "┌── system",
        colorDashPair(`─ 󰏓  ◎ ${pacman} (pacman), ${flatpak} (flatpak)`),
        colorDashPair(`─   ◎ ${uptime}`)
    ];

    const logoLines = [
        "       /\\",
        "      /  \\",
        "     /    \\",
        "    /      \\",
        "   /   ,,   \\",
        "  /   |  |   \\",
        " /_-''    ''-_\\"
    ];

    const textColumn = 18; // column where text starts

    let finalOutput = "";
    const totalLines = Math.max(logoLines.length, infoLines.length);

    for (let i = 0; i < totalLines; i++) {
        const logoPart = logoLines[i] || "";
        const infoPart = infoLines[i] || "";

        const paddingCount = Math.max(1, textColumn - logoPart.length);
        const padding = "&nbsp;".repeat(paddingCount);

        // Only replace spaces in logoPart, keep infoPart untouched (to preserve HTML spans)
        const htmlLogo = logoPart.replace(/ /g, "&nbsp;");
        const coloredLogo = `<span style="color:${color}">${htmlLogo}</span>`;
        const line = `${coloredLogo}${padding}${infoPart}`;

        printText(line, true, true);
    }


    // Footer with links, also HTML
    printText('<a style="background-color: #F2ADFD; color: #ffffff !important" href="https://github.com/mgytr">GitHub</a> <a style="background-color: #F2ADFD; color: #FFFFFF" onclick="execcmd(\'discord\')" href="#">Discord</a> <a style="background-color: #F2ADFD; color: #ffffff" href="https://blog.mgyt.xyz/">Blog</a><br>', true);
},


    'projects': () => {
        printText('<a style="background-color: rgb(56, 56, 220); color: #000000" href="https://github.com/mgytr/MangaDownloader">MangaDownloader</a> - CLI for downloading Manga to your Kindle from libgen.li<br><a style="background-color: rgb(56, 56, 220); color: #000000" href="https://github.com/mgytr/SpotifyTUI">SpotifyTUI</a> - TUI for controlling spotify using the Spotify Web API (premium required)')
    },
    'clear': () => {
        document.querySelector('div.text').innerHTML = '<span>'
    },
    'help': () => {
        printText('Avalible commands:<br>whoami<br>fastfetch<br>discord<br>clear<br>projects<br>help'+(localStorage.getItem('rickrolled') === null ? '<br>clean_system' : ''), true)
    },
    'discord': () => {
        printText('<span style="color: rgb(76, 116, 217)">Discord: @mgytr_</span>', true)
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
// var ip = ''

let statsData = null;

async function fetchStats() {
    try {
        const response = await fetch("https://pcstats.mgyt.xyz/get");
        statsData = await response.json();
    } catch (error) {
        console.error("Failed to fetch system stats:", error);
    }
}


async function shell() {
    // cmdprompt = () => {printText(`[${ip}@mgyt.cf]:~ $ `, false)}
    // ip = await getIP() 
    await fetchStats();
    setInterval(fetchStats, 35000); // update every 35 sec
cmdprompt = () => {
  const user = 'you';            
  const cwd = '~ ';              

  const part1Bg = '#FFAEFE';
  const part1Text = '#2E2E2E';
  const part2Bg = '#FF86FF';
  const part2Text = '#FFFFFE';

  const leftTriangle = ''; 
  const rightTriangle = '';

  const promptHtml =
    `<span style="color:${part1Bg}; padding:0 0px;">${leftTriangle}</span>` +
    `<span style="background-color:${part1Bg}; color:${part1Text}; padding:0 8px;">${user}</span>` +
    `<span style="background-color:${part2Bg}; color:${part1Bg};">${rightTriangle}</span>` +
    `<span style="background-color:${part2Bg}; color:${part2Text}; padding:0 5px;">${cwd}</span>` +
    `<span style="color:${part2Bg}; padding: 0;">${rightTriangle}</span>`;

  printText(promptHtml, true, false);
  printText('', false, false)
};


    commands['fastfetch']();
    printText('Run help for commands', true);
    printText('Last site update: May 26, 2025')
    if (localStorage.getItem('rickrolled') === null) printText('6 viruses have been detected! Please clean your system using "clean_system"', true)

    cmdprompt()
    let textelem = document.querySelector('body .text')
    textelem.scrollTo(0, textelem.scrollHeight)
    
    
}


shell();