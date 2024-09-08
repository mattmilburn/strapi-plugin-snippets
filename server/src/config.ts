export interface SnippetsPluginConfig {
  contentTypes?: {
    allow: string[];
    deny: string[];
  } | null;
  ignoreUnmatched?: boolean;
  uppercase?: boolean;
}

export const defaultConfig: SnippetsPluginConfig = {
  contentTypes: null,
  ignoreUnmatched: false,
  uppercase: true,
};

export default {
  default: defaultConfig,
  validator: () => {},
};
