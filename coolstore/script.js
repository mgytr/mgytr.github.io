function onAppsPageClick() {
    document.querySelector('.aboutPage').className = 'aboutPage'
    document.querySelector('.appsPage').className = 'appsPage visible'
    const svgApps = document.querySelector('.appsicon')
    const containerApps = svgApps.parentElement
    svgApps.className = 'appsicon selectedSvg'
    containerApps.className = 'page selected'
    const svgAbout = document.querySelector('.abouticon')
    const containerAbout = svgAbout.parentElement
    svgAbout.className = 'abouticon'
    containerAbout.className = 'page'  
}

function onAboutPageClick() {
    document.querySelector('.appsPage').className = 'appsPage'    
    document.querySelector('.aboutPage').className = 'aboutPage visible'

    const svgAbout = document.querySelector('.abouticon')
    const containerAbout = svgAbout.parentElement
    svgAbout.className = 'abouticon selectedSvg'
    containerAbout.className = 'page selected'
    const svgApps = document.querySelector('.appsicon')
    const containerApps = svgApps.parentElement
    svgApps.className = 'appsicon'
    containerApps.className = 'page'
}

function downloadURL(url) {
    const inspopup = document.createElement('div')

    inspopup.style.position = 'fixed'
    inspopup.style.left = '0'
    inspopup.style.right = '0'
    inspopup.style.top = '0'
    inspopup.style.bottom = '0'
    inspopup.style.width = '100%'
    inspopup.style.height = '100%'
    inspopup.style.backgroundColor = 'rgba(0, 0, 0, 0.45)'
    inspopup.style.zIndex = '9999999999999999999999999999999999999999'
    inspopup.style.display = 'flex'
    inspopup.style.justifyContent = 'center'
    inspopup.style.alignItems = 'center'

    const installbox = document.createElement('div')
    

    installbox.style.width = '310px'
    installbox.style.height = '75px'
    installbox.style.borderRadius = '12px'
    installbox.style.backgroundColor = '#1f1f1f'

    installbox.style.display = 'flex'
    installbox.style.alignItems = 'center'

    installbox.innerHTML = '<img src="load.gif" height="25px" style="position: fixed;padding-left: 25px"><div style="display: flex; width: 100%; justify-content: center"><p>Downloading</p></div>'
    inspopup.appendChild(installbox)

    document.body.appendChild(inspopup)
    setTimeout(() => {
        document.location = url
        setTimeout(() => [
            inspopup.remove()
        ])
    }, 1000)
}
function installURL(url) {
    const inspopup = document.createElement('div')

    inspopup.style.position = 'fixed'
    inspopup.style.left = '0'
    inspopup.style.right = '0'
    inspopup.style.top = '0'
    inspopup.style.bottom = '0'
    inspopup.style.width = '100%'
    inspopup.style.height = '100%'
    inspopup.style.backgroundColor = 'rgba(0, 0, 0, 0.45)'
    inspopup.style.zIndex = '9999999999999999999999999999999999999999'
    inspopup.style.display = 'flex'
    inspopup.style.justifyContent = 'center'
    inspopup.style.alignItems = 'center'

    const installbox = document.createElement('div')
    

    installbox.style.width = '310px'
    installbox.style.height = '75px'
    installbox.style.borderRadius = '12px'
    installbox.style.backgroundColor = '#1f1f1f'

    installbox.style.display = 'flex'
    installbox.style.alignItems = 'center'

    installbox.innerHTML = '<img src="load.gif" height="25px" style="position: fixed;padding-left: 25px"><div style="display: flex; width: 100%; justify-content: center"><p>Installing</p></div>'
    inspopup.appendChild(installbox)

    document.body.appendChild(inspopup)
    setTimeout(() => {
        document.location = url
        setTimeout(() => [
            inspopup.remove()
        ])
    }, 1000)
}
function openDropdown(opener) {
    const elemsDiv = opener.parentElement.querySelector('.elems')
    if (elemsDiv.className === 'elems') {

        elemsDiv.className = 'elems visible'
        opener.querySelector('.iconopenclose').className = 'iconopenclose iconopenclose_opened'
        elemsDiv.style.maxHeight = 'none'
        const height = elemsDiv.clientHeight
        elemsDiv.style.maxHeight = '0px'
        console.log(height)
        for (let i = 0; i < height+1; i++) {

            console.log(i*1.2)
            setTimeout(() => {
            console.log(`Height: ${i}`)
            elemsDiv.style.maxHeight = i + 'px'}, i/2)
        }
    }
    else {

        opener.querySelector('.iconopenclose').className = 'iconopenclose'
        const height = elemsDiv.clientHeight
        for (let i = 0; i < height; i++) {
            setTimeout(() => {

            if (height-i-1  === 0) {
                elemsDiv.className = 'elems'
            }
            elemsDiv.style.maxHeight = height-i-1 + 'px'}, i/2)

        }
        
    }


}
