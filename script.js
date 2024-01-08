function changeactive() {
    var lines = document.querySelectorAll('div.text span')
    

    let i = 0;
    while (i < lines.length) {
        lines[i].className = ''
        console.log(i)
        i++;
    }

    lines[lines.length-1].className = 'cursor'
    console.log(lines)

    
}
function printText(text=null, newline=true, textcolor='rgb(204, 198, 198)') {
    var textdiv = document.querySelector('div.text')
    if (text !== null) {

        const p_line = document.createElement('span')
        p_line.style.color = textcolor
        p_line.innerHTML = text

        textdiv.appendChild(p_line)
    }
    if (newline == true) {
        textdiv.appendChild(document.createElement('br'))
    }
    changeactive()

}


/* async function getIP() {
    const text = await (await fetch("https://api.db-ip.com/v2/free/self")).text()
    const ip = JSON.parse(text)['ipAddress']
    return ip
} */


changeactive()

let keyboardcurrent = ''
let enterpressed = false

async function keydown(event) {
    const lines = document.querySelectorAll('div.text span')
    const key = event.key
    if (key.length === 1) {
        lines[lines.length-1].innerHTML += key
        keyboardcurrent += key
    }
    else {
        if (key === 'Backspace') {
            
            const linelast = lines[lines.length-1].innerHTML[lines[lines.length-1].innerHTML.length-1],
                kblast = keyboardcurrent[keyboardcurrent.length-1]
            console.log(`${lines[lines.length-1].innerHTML} ${linelast} ${kblast}`)
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
document.addEventListener('keydown', (event) => {keydown(event)})


var commands = {
    'whoami': () => {
        printText('you')
    },
    'neofetch': () => {
        printText('<br><img src="/me.jpg" width=160, height=160 style="padding-left: 20px"></img><div style="padding-left: 220px; margin-top:-160px">OS: MGos<br>Kernel: JavaScript<br>RAM: 8 GB<br>SSD: 128 GB<br>Host: Apple MacBook Air 2018 13-inch<br>Shell: Mash<br>CPU: Intel i5-8210Y (4) @ 1.610GHz<br>GPU: Intel(R) UHD Graphics 617</div><br><br><a style="background-color: rgb(255, 100, 100); color: #000000" href="https://youtube.com/@MoneyGrab">YouTube</a> <a style="background-color: rgb(76, 116, 217); color: #FFFFFF" onclick="execcmd(\'discord\')" href="#">Discord</a><br>')
    },
    'projects': () => {
        printText('<a style="background-color: rgb(56, 56, 220); color: #000000" href="/coolstore">CoolStore</a> - Cool iOS apps not in the App Store<br><a style="background-color: rgb(56, 56, 220); color: #000000" href="/monc0ver">monc0ver</a> - Fake iOS jailbreak what you can use to troll someone')
    },
    'clear': () => {
        document.querySelector('div.text').innerHTML = '<span>'
    },
    'help': () => {
        printText('Avalible commands:<br>whoami<br>neofetch<br>discord<br>clear<br>projects<br>help<br>')
    },
    'discord': () => {
        printText('Discord: @MoneyGrabYT', true, 'rgb(76, 116, 217)')
    }
}

async function execcmd(cmd) {
    keyboardcurrent = ''
    printText()

    if (Object.keys(commands).includes(cmd)) {
        commands[cmd]()
    }
    else if (cmd.trim() !== '') {

        printText(`${cmd}: command not found`)
    }

    cmdprompt()
    setTimeout(() => {window.scrollTo(0, document.body.scrollHeight)}, 10)
}
var ip = ''
async function shell() {
    // cmdprompt = () => {printText(`[${ip}@mgyt.cf]:~ $ `, false)}
    // ip = await getIP() 
    cmdprompt = () => {printText(`[you@mgyt.cf]:~ $ `, false)}
    commands['neofetch']()
    printText('Last site update: 1/8/2024')

    cmdprompt()
    window.scrollTo(0, document.body.scrollHeight)

    
}

shell()

