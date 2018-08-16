import createIndex from '../../../modules/server/create-index';
import Staff from '../Staff';
import Specialities from '../Specialities';
import Cabinets from '../Cabinets';

createIndex(Staff, { owner: 1 });
createIndex(Staff, { phone: 1 });
createIndex(Specialities, { name: 1 });
createIndex(Cabinets, { name: 1 });
