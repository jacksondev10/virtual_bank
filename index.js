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
]).then().catch((err) => console.log(err))
}