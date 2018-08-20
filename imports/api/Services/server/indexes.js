import createIndex from '../../../modules/server/create-index';
import Services from '../Services';

createIndex(Services, { owner: 1 });
createIndex(Services, { name: 1 });
