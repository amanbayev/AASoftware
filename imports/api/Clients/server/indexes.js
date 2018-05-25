import createIndex from '../../../modules/server/create-index';
import Clients from '../Clients';

createIndex(Clients, { owner: 1 });
createIndex(Clients, { phone: 1 });
