const VendingMachine = artifacts.require("VendingMachine");

contract("VendingMachine", (accounts) =>{
    before (async() => {
        instance = await VendingMachine.deployed()
    })

    it('ensure that starting balance of the candies in vending machine is 100', async() =>{
        let balance = await instance.getVendingMachineBalance()
        assert.equal(balance, 100, 'The initial balance should be 100.')
    })

    it('ensure that balance of the candies in vending machine can be updated', async() =>{
        await instance.restock(100)
        let balance = await instance.getVendingMachineBalance()
        assert.equal(balance, 200, 'The balance should be 200 after restocking.')
    })

    it('allows candies to be purchased', async() =>{
        await instance.purchase(10, {from: accounts[0], value: web3.utils.toWei('1','ether')})

        let balance = await instance.getVendingMachineBalance()
        assert.equal(balance, 190, 'The balance should be 190 after sale.')
    })
})