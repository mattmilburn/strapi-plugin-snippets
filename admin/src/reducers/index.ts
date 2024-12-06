import config from './config';
import { PLUGIN_ID } from '../constants';

const reducers = {
  [`${PLUGIN_ID}_config`]: config,
};

export default reducers;
