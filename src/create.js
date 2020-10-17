const inquirer = require('inquirer')

const {oraLoading, getTagList, fetchRepoList, downDir} = require('./uitls/common')


module.exports = async (projectName) => {
    let repos = await oraLoading(fetchRepoList, '正在链接到你的仓库....')()
    repos = repos.map(item => item.name)
    console.log(repos)
    const {repo} = await inquirer.prompt([{
        type: 'list',
        name: 'repo',
        message: '请选择一个模板',
        default: true,
        choices: repos
    }])
    let tags = await oraLoading(getTagList, `正在连接你的选择的仓库${repo}的版本号...`)(repo)
    tags = tags.map(item => item.name)

    const {tag} = await inquirer.prompt([{
        type: 'list',
        name: 'tag',
        message: '请选择一个项目版本',
        choices: tags
    }])

    const target = await oraLoading(downDir, '下载项目...')(repo, tag)
    console.log(`项目名字是${projectName}`)
    console.log(`选择的仓库名称是${repo}`)
    // console.log(`仓库${repo}对应的tag列表:${tags}`)
    console.log(`选择的tag是${tag}`)
}


