import _ from 'lodash';
import { fetchById, update } from '../database/functions';
import debug from '../helpers/debug';


const Admin = {
  async makeCashier(req, res) {
    const { id } = req.params
    if (isNaN(id)) return res.status(400).send({ message: 'user id must be a number'});

    const user = await fetchById('users', parseInt(id));
    if (user.error) return debug(user);
    if (user.length === 0) return res.status(404).send({ message: `User with the specified id does not exist` });
    if (user[0].iscashier) return res.status(409).send({ message: 'User with the specified id is already a cashier' });
    
    const obj = {
      isCashier: true,
      id: id
    };
    const cashier = await update('users', obj);
    
    return res.status(200).send({ message: 'User has been made a Cashier successfully', cashier: _.omit(cashier, 'password') });
  },

  async makeAdmin(req, res) {
    const { id } = req.params
    if (isNaN(id)) return res.status(400).send({ message: 'user id must be a number'});

    const user = await fetchById('users', parseInt(id));
    if (user.error) return debug(user);
    if (user.length === 0) return res.status(404).send({ message: `User with the specified id does not exist` });
    if (user[0].isadmin) return res.status(409).send({ message: 'User with the specified id is already an admin' });
    
    const obj = {
      isAdmin: true,
      id: id
    }
    const admin = await update('users', obj);
    
    return res.status(200).send({ message: 'User has been made an Admin successfully', admin: _.omit(admin, 'password') });
  },
};

export default Admin;
