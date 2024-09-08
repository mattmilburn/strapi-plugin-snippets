import config, { type ConfigService } from './config';
import snippets, { type SnippetsService } from './snippets';
import validation, { type ValidationService } from './validation';

export type SnippetsServices = {
  config: ConfigService,
  snippets: SnippetsService,
  validation: ValidationService,
};

export default {
  config,
  snippets,
  validation,
};
