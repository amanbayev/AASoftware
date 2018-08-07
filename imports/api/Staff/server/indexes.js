import createIndex from '../../../modules/server/create-index';
import Staff from '../Staff';
import Specialities from '../Specialities';

createIndex(Staff, { owner: 1 });
createIndex(Staff, { phone: 1 });
createIndex(Specialities, { name: 1 });
