import { Meteor } from 'meteor/meteor'
import Clients from '../../api/Clients/Clients'

if (Meteor.users.find().count() === 0) {
  let cUser = Accounts.createUser({
    username: 'talgat',
    email: 'amanbayev@gmail.com',
    password: '4thebest',
    profile: {
      first_name: 'Талгат',
      last_name: 'Аманбаев',
      company: 'Grow IT'
    }
  })
  Roles.addUsersToRoles(cUser, 'admin')
  console.log('admin user added')
}
