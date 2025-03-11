import type { LogLevel } from '@/consts'
import type { Ansis } from 'ansis'
import type { Writable } from 'node:stream'
import process from 'node:process'
import { LOG_LEVELS } from '@/consts'
import c from 'ansis'

interface LoggerContext {
    stdout: Writable
    stderr: Writable
}

class Logger {
    context: LoggerContext

    static colors: Record<LogLevel, Ansis> = {
        DEBUG: c.bgCyan,
        INFO: c.bgGreen,
        WARN: c.bgYellow,
        ERROR: c.bgRed,
        SILENT: c.bgGray,
    }

    static errorLevels = new Set<LogLevel>(['WARN', 'ERROR'])

    static prefixes: Record<LogLevel, string> = Object.fromEntries(
        LOG_LEVELS.map(level => [level, Logger.colors[level](` ${level} `)]),
    ) as Record<LogLevel, string>

    constructor(context: LoggerContext) {
        this.context = context
    }

    getStream(level: LogLevel) {
        return Logger.errorLevels.has(level) ? this.context.stderr : this.context.stdout
    }

    log(level: LogLevel, message: string) {
        const isErrorLevel = Logger.errorLevels.has(level)
        const stream = this.getStream(level)
        const color = isErrorLevel ? c.red : c.reset

        stream.write(`${Logger.prefixes[level]}${color(` ${message}\n`)}`)
    }

    debug = (message: string) => this.log('DEBUG', message)
    info = (message: string) => this.log('INFO', message)
    warn = (message: string) => this.log('WARN', message)
    error = (message: string) => this.log('ERROR', message)
}

export const log = new Logger({
    stdout: process.stdout,
    stderr: process.stderr,
})

export const link = c.cyan
