import createIndex from '../../../modules/server/create-index';
import Staff from '../Staff';

createIndex(Staff, { owner: 1 });
createIndex(Staff, { phone: 1 });
