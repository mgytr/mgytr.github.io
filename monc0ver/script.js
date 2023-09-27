function optionsPopup () {
    const elem = document.querySelector('.optionsPopup')
    elem.className = 'optionsPopup visible'
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fakeJailbreakConsole () {
    const console = document.querySelector('.logs')


    document.querySelector('.jailbreakbtn').innerText = 'Jailbreaking'
    document.querySelector('.jailbreakbtn').setAttribute('disabled',  '')
    console.innerText += 'Ensuring resources\n'
    await sleep(300)
    console.innerText += 'Exploited kernel\n'
    await sleep(200)
    console.innerText += 'Initialized\n'
    await sleep(200)
    console.innerText += 'Found kernel slides\n0x2915723\n'
    await sleep(400)
    console.innerText += 'Obtaining root priviligies\n'
    await sleep(2000)
    console.innerText += 'Installing packages\n'
    await sleep(5000)
    console.innerText += 'Done! The device will soft-reboot in 5 seconds.'
    await sleep(5000)
    const elem = document.createElement('div')
    elem.style.backgroundColor = 'black'
    elem.style.width = '100%'
    elem.style.height = '100%'
    elem.style.zIndex = '999999999999'
    elem.style.position = 'absolute'
    elem.style.left = '0'
    elem.style.top = '0'
    document.body.appendChild(elem)
    await sleep(8000)
    window.location.replace('done.html')

    
    



}