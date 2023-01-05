const { Wallet, Earning } = require('../models');
const { StatusCodes } = require('http-status-codes');

// allowed for the wallet owner
const findWallet = async (req, res) => {
  const id = req.params.id;
  if(req.user.userId != id){
    res.status(401).json({msg:"you are not authorized to access this data"});
  }
  Wallet.findOne({owner:id}, (err, wallet) => {
    if (err) {
      res.status(StatusCodes.NOT_FOUND).send(err);
    } else {
      res.status(StatusCodes.OK).json(wallet);
    }
  });
};

const findEarnings = async (req,res)=>{
  const id = req.user.userId;
  Earning.find({Instructor:id}, (err,data)=>{
    if(err){
      res.status(StatusCodes.NOT_FOUND).send(err);
    }else{
      res.status(StatusCodes.OK).json(data);
    }
  });
}
// allowed only for admin
const addWallet = async (req, res) => {
  const { owner, balance } = req.body;
  Wallet.create({ owner: owner, balance: balance }, (err, wallet) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).send(err);
    } else {
      res.status(StatusCodes.CREATED).json({ wallet });
    }
  });
};

// allowed only for admin
const updateWallet = async (req, res) => {
  const { owner, balance } = req.body;
  const id = req.params.id;
  Wallet.findByIdAndUpdate(
    id,
    { owner: owner, balance: balance },
    (err, wallet) => {
      if (err) {
        res.status(StatusCodes.BAD_REQUEST).send(err);
      } else {
        res.status(StatusCodes.OK).json({ wallet });
      }
    }
  );
};

// allowed only for admin
const allWallets = async (req, res) => {
  console.log('all wallets');
  Wallet.find({}, (err, data) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).send(err);
    } else {
      res.status(StatusCodes.OK).json({ data });
    }
  });
};

// allowed only for admin
const deleteWallet = async (req, res) => {
  const id = req.params.id;
  Wallet.findByIdAndDelete(id, (err, wallet) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).send(err);
    } else {
      res.status(StatusCodes.ACCEPTED).json({ wallet });
    }
  });
};

module.exports = {
  findWallet,
  addWallet,
  updateWallet,
  allWallets,
  deleteWallet,
  findEarnings,
};
