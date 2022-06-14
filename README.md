Playing around with upgradable contracts.

1. Upgrade Box -> BoxV2
2. Proxy points to Box
3. Update, so that proxy points to BoxV2

We need to deploy a proxy. Multiple ways:
1. Deploy manually
2. use hardhat-deploy's built-in proxies
3. use openzeppelin upgrades plugin
