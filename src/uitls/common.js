const axios = require('axios')
const ora = require('ora')
const {promisify} = require('util')
let downloadGit = require('download-git-repo')
const {downloadDirectory} = require('./constants')
const path = require('path')
const fs = require('fs')
const ncp = require('ncp')


downloadGit = promisify(downloadGit)

const mapActions = {
    create: {
        alias: 'c',
        description: '建立一个项目',
        examples: [
            'test-cli create <project name>'
        ]
    },
    config: {
        alias: 'conf',
        description: 'config project variable',
        examples: [
            'test-cli config set <K> <V>',
            'test-cli config get <K>'
        ]
    },
    '*': {
        alias: '',
        description: 'command not found',
        examples: []
    }
}

const helpCb = () => {
    console.log('\nExamples:')
    Reflect.ownKeys(mapActions).forEach(action => {
        mapActions[action].examples.forEach(example => {
            console.log(example)
        })
    })
}

const oraLoading = (fn, message) => async (...args) => {
    const spinner = ora(message)
    spinner.start()
    let res = await fn(...args)
    spinner.succeed()
    return res
}

const fetchRepoList = async () => {
    const {
        data
    } = await axios.get('https://api.github.com/orgs/lxy-cli/repos')
    // console.log(data)
    return data
}

const getTagList = async (repo) => {
    const {data} = await axios.get(`https://api.github.com/repos/lxy-cli/${repo}/tags`)
    return data
}

const downDir = async (repo, tag) => {
    console.log('down dir')
    let project = `lxy-cli/${repo}`
    if(tag) {
        project += `#${tag}`
    }
    let dest = `${downloadDirectory}/${repo}`
    console.log('dest 内容', dest)
    console.log('project..', project)
    try {
        await downloadGit(project, dest)
    } catch (error) {
        console.log('下载出现错误..')
        console.log(error)
    }
    return dest
}

const copyTempLocalhost = async (target, projectName) => {
    const resolePath = path.join(path.resolve(), projectName)
    if(!fs.existsSync(path.join(target, 'ask.js'))) {
        await nep(target,  resolePath)
        fs.remove(target)
    } else {
        await new Promise((resolve, reject) => {
            Metal
        })
    }
}

module.exports = {
    mapActions,
    helpCb,
    oraLoading,
    getTagList,
    fetchRepoList,
    downDir
}