// Modulos Externos
import inquirer from 'inquirer'
import chalk from 'chalk'

//Modulos Internos
import fs from 'fs'


operation()

function operation(){
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ],      
    },
]).then((answer) => {
    const action = answer['action']

    if (action === 'Criar conta'){
        creationAccount()
    } else if(action === 'Depositar'){
        deposit()
    } else if (action === 'Consultar Saldo'){
    
    } else if (action === 'Sacar') {
    
    } else if (action === 'Sair'){
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
        process.exit()
    }        
    })    
}

// Criar conta
function creationAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))
    
    buildAccount()    
}

function buildAccount(){
    inquirer.prompt([
        {
            name:'accountName',
            message: 'Digite um nome para a sua conta:',
        },
    ])
    .then((answer) => {
       console.info(answer['accountName'])

       const accountName = answer['accountName']

        if (!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Este usuário já existe, escolha outro nome'),
            )
            buildAccount()
        }     

    fs.writeFileSync(
    `accounts/${accountName}.json`,
     '{"balance": 0}',
     function (err) {
    console.log(err)
     },
     )
     console.log(chalk.green('Sua conta foi criada com sucesso!'))
     operation()
    })
    }

//Depositar dinheiro

function deposit(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual nome da sua conta?'
        },
    ]).then((answer) => {
        
        const accountName = answer['accountName']
        
        if(!checkAccount(accountName)){
            return deposit()
        }
        inquirer.prompt([
            {
                name: 'amount',
                message:'Quanto você deseja depositar',
            },
        ]).then((answer) => {
            const amount = answer['amount']

            addAmount(accountName, amount)
            operation()    

        })
    })
}

function checkAccount(accountName){
if (!fs.existsSync(`accounts/${accountName}.json`)){
    console.log(chalk.bgRed.black('Essa conta não existe, escolha outro nome!'))
    return false
}

return true

}

function addAmount(accountName, amount){
const accountData = getAccount(accountName)

if(!amount){
    console.log(
        chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'),
    )
   return deposit()
}
accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
        console.log(err)
    },
)
console.log(chalk.green(`Foi depositado o valor de R$ ${amount} na sua conta`),
)
}

function getAccount(accountName){
const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
    encoding:'utf-8',
    flag: 'r'
})

return JSON.parse(accountJSON)
}