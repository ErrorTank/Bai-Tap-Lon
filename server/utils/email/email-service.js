const createEmailService = () => {
  let holders = [];
  const deleteHolder = (email) => {
    holders = holders.filter(each => each.email !== email);
  };
  const addHolder = ({email, sendCode, expire}) => {

  };

  return {
    addHolder,
    verify(email, code){
       return holders.find(each => each.email === email && each.code === code)
    }
  }
};

const emailService = createEmailService();

module.exports = emailService;