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
        choices: ['Criar conta','Consultar Saldo','Depositar','Sacar','Sair'],      
    },
]).then((answer) => {
    const action = answer['action']
if (action === 'Criar conta'){
    creationAccount()
}
    
})
.catch((err) => console.log(err))
}

// Criar conta
function creationAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))

    buildAccount()
    return
}

function buildAccount(){
    inquirer.prompt([
        {
            name:'accountName',
            message: 'Digite um nome para a sua conta:',
        },
    ])
    .then((answer) => {
       const accountName = answer['accountName']

       console.info(accountName)

        if (!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Usuario já existe!')
            )
            buildAccount()

        }       
    fs.writeFileSync(`accounts/${accountName}.json`,
     '{"balance": 0}',
     function (err) {
        Console.log(err)
     },
     )
     console.log(chalk.green('Sua conta foi criada com sucesso!'))
     operation()
    })
    .catch(err => console.log(err))
}