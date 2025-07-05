import process from 'node:process'
import { Cli } from 'clipanion'
import { commands } from '@/commands'
import { packageJson } from '@/consts'

const initCli = () => {
    const [_node, _app, ...args] = process.argv

    const cli = new Cli({
        binaryLabel: `NewMD`,
        binaryName: `newmd`,
        binaryVersion: packageJson.version,
    })

    commands.forEach((command) => cli.register(command))
    cli.runExit(args)
}

initCli()
