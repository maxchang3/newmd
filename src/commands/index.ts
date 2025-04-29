import { Builtins } from 'clipanion'
import { CreateCommand } from './create'

export const commands = [CreateCommand, Builtins.VersionCommand, Builtins.DefinitionsCommand]
