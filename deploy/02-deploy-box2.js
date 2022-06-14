const { network } = require('hardhat');
const { developmentChains } = require('../helper-hardhat-config');
const { verify } = require('../utils/verify');

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log('####### deploy BoxV2 #######');
  const boxv2 = await deploy('BoxV2', {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
    // proxy: {
    //   proxyContract: 'OpenZeppelinTransparentProxy',
    //   viaAdminContract: {
    //     name: 'BoxProxyAdmin',
    //     artifact: 'BoxProxyAdmin',
    //   },
    // },
  });

  // Verify the deployment
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    console.log('####### verify BoxV2 #######');
    await verify(boxv2.address, []);
  }

  console.log('####### end BoxV2 #######');
};
