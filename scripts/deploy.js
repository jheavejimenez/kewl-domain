const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("jhv");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
      let txn = await domainContract.register("kewl domain",  {value: hre.ethers.utils.parseEther('0.1')});
      await txn.wait();
    console.log("Minted domain kewl domain");
  
    txn = await domainContract.setRecord("kewl domain", "You are kewl");
    await txn.wait();
    console.log("Set record for kewl.jhv");
  
    const address = await domainContract.getAddress("kewl domain");
    console.log("Owner of domain kewl domain:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
  