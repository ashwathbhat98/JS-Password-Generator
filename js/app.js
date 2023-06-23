const form = document.getElementById('generator')
const passHolder = document.querySelector('#password input')
const copyText = document.getElementById('copyText')
const passLengthSlider = document.getElementById('passLengthSlider')
const passLengthNumber = document.getElementById('passLengthNumber')
const uppercase = document.getElementById('includeUppercase')
const numbers = document.getElementById('includeNumbers')
const symbols = document.getElementById('includeSymbols')

const lowerCaseCharCodes = Array.from(Array(26), (_, i) => 97 + i)
const upperCaseCharCodes = Array.from(Array(26), (_, i) => 65 + i)
const numberCharCodes = Array.from(Array(10), (_, i) => 48 + i)
const symbolCharCodes = Array.from(Array(32), (_, i) => {
    if (i < 10) return 33 + i
    if (i < 32) return 58 + i - 10
    return 91 + i - 32
})

const generatePassword = async (passLength, includeUppercase, includeNumbers, includeSymbols) => {
    const charCodes = [...lowerCaseCharCodes]

    if (includeUppercase) charCodes.push(...upperCaseCharCodes)
    if (includeNumbers) charCodes.push(...numberCharCodes)
    if (includeSymbols) charCodes.push(...symbolCharCodes)

    const passwordCharacters = []

    for (let i = 0; i < passLength; i++) {
        const character = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(character))
    }

    return passwordCharacters.join('')
}

const characterCodeGenerator = (low, high) => Array.from(Array(high - low + 1), (_, i) => low + i)

const copyPass = async (e) => {
    passHolder.select()
    passHolder.setSelectionRange(0, 99999)

    const copied = await document.execCommand('copy')

    if (copied) {
        e.target.innerText = 'Copied!'
    }

    setTimeout(() => {
        e.target.innerText = 'Copy'
    }, 3000)
}

const syncPassLengthInput = (e) => {
    const value = e.target.value

    passLengthSlider.value = value
    passLengthNumber.value = value
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const passLength = passLengthNumber.value
    const includeUppercase = uppercase.checked
    const includeNumbers = numbers.checked
    const includeSymbols = symbols.checked

    const password = await generatePassword(passLength, includeUppercase, includeNumbers, includeSymbols)
    passHolder.value = password
})