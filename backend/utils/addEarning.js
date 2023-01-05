const { Earning,Wallet } = require("../models");



async function addEarning(balance,instructor){
    let date = new Date();
    const year = date.getFullYear();
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
    const month = months[date.getMonth()];
    date = year+month;
    let earning = await Earning.findOne({Instructor:instructor,monthDate:date});
    if(!earning){
        earning = await Earning.create({Instructor:instructor,monthDate:date,earning:balance});
    }else{
        await Earning.updateOne({Instructor:instructor,monthDate:date,earning:(balance+earning.earning)});
    }
}

async function addWallet(balance,instructor){
    let wallet = await Wallet.findOne({owner:instructor});
    if(!wallet){
        wallet = await Wallet.create({owner:instructor,balance:balance});
    }else{
        await Wallet.updateOne({owner:instructor,balance:(balance+wallet.balance)});
    }
}

module.exports = {addEarning,addWallet};






