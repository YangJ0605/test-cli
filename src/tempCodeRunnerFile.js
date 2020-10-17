var inquirer = require('inquirer')

inquirer.prompt([
    {
        type: 'confirm',
        name: 'test',
        message: '你肯定使用这个吗?',
        default: true
    }
]).then(res => {
    onscroll.log(`结果为：${res}`)
})