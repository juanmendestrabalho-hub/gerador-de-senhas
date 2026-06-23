// Seleção dos elementos do DOM
const passwordDisplay = document.getElementById('password-display');
const copyBtn = document.getElementById('copy-btn');
const lengthSlider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');

const uppercaseCb = document.getElementById('uppercase-cb');
const lowercaseCb = document.getElementById('lowercase-cb');
const numbersCb = document.getElementById('numbers-cb');
const symbolsCb = document.getElementById('symbols-cb');
const generateBtn = document.getElementById('generate-btn');

// Dicionários de caracteres
const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

// Atualiza o contador visual do slider
lengthSlider.addEventListener('input', (e) => {
    lengthVal.textContent = e.target.value;
});

// Função principal de geração
function generatePassword() {
    let allowedChars = '';
    let password = '';

    // Verifica quais opções estão marcadas
    if (uppercaseCb.checked) allowedChars += charSets.uppercase;
    if (lowercaseCb.checked) allowedChars += charSets.lowercase;
    if (numbersCb.checked) allowedChars += charSets.numbers;
    if (symbolsCb.checked) allowedChars += charSets.symbols;

    // Validação caso o usuário desmarque tudo
    if (allowedChars === '') {
        passwordDisplay.textContent = 'Selecione uma opção!';
        passwordDisplay.style.color = '#ef4444'; // Cor vermelha de erro
        return;
    }

    const passwordLength = parseInt(lengthSlider.value);

    // Sorteio dos caracteres
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    // Exibe a senha gerada
    passwordDisplay.textContent = password;
    passwordDisplay.style.color = '#f8fafc'; // Reseta para a cor padrão
}

// Função para copiar a senha para a área de transferência
function copyToClipboard() {
    const password = passwordDisplay.textContent;
    
    // Evita copiar mensagens de erro ou prompts iniciais vazios
    if (password === 'Selecione uma opção!' || password === '') return;

    navigator.clipboard.writeText(password).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copiado!';
        copyBtn.style.backgroundColor = '#22c55e'; // Verde de sucesso
        
        // Reseta o botão após 2 segundos
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
    });
}

// Event Listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

// Gera uma senha automaticamente ao carregar a página pela primeira vez
generatePassword();
