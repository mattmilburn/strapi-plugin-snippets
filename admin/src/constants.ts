import pluginId from './utils/pluginId';

export const ACTION_RESOLVE_CONFIG = `${pluginId}/resolve-config`;

export const REGEX_NON_ALPHANUMERIC = /[^a-zA-Z0-9_]/g;
export const REGEX_ALPHANUMERIC_VAR = /^[a-zA-Z][a-zA-Z0-9_]+$/;

export const UID_SNIPPET = 'plugin::snippets.snippet';
