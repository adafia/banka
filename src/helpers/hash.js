import bcrypt from 'bcrypt';

const Password = {
  async hash(password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  },

  async compare(password, dbpassword) {
    const result = await bcrypt.compare(password, dbpassword);
    return result;
  }
};

module.exports = Password;
