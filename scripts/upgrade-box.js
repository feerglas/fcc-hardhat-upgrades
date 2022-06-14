// const { ethers, network } = require('hardhat');
// const { moveBlocks } = require('../utils/move-block');
//
// const TOKEN_ID = 2;

const { ethers } = require('hardhat');

async function main() {
  const boxProxyAdmin = await ethers.getContract('BoxProxyAdmin');
  const transparentProxy = await ethers.getContract('Box_Proxy');

  const proxyBoxV1 = await ethers.getContractAt(
    'Box',
    transparentProxy.address
  );
  const versionV1 = await proxyBoxV1.version();
  console.log(`---->>>> version before : ${versionV1}`);

  const boxV2 = await ethers.getContract('BoxV2');
  const upgradeTx = await boxProxyAdmin.upgrade(
    transparentProxy.address,
    boxV2.address
  );
  await upgradeTx.wait(1);

  const proxyBoxV2 = await ethers.getContractAt(
    'BoxV2',
    transparentProxy.address
  );
  const versionV2 = await proxyBoxV2.version();

  console.log(`---->>>> version after : ${versionV2}`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
