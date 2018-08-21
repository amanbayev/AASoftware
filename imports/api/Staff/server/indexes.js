import createIndex from '../../../modules/server/create-index';
import Staff from '../Staff';
import Specialities from '../Specialities';
import Cabinets from '../Cabinets';
import Appointments from '../Appointments';

createIndex(Staff, { owner: 1 });
createIndex(Staff, { phone: 1 });
createIndex(Specialities, { name: 1 });
createIndex(Cabinets, { name: 1 });

createIndex(Appointments, { clientId: 1 });
createIndex(Appointments, { doctorId: 1 });
createIndex(Appointments, { date: 1 });
