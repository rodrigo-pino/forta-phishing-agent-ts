// Exchange set according to Etherscan
const EXCHANGES = new Set([
  "0x4dc98c79a52968a6c20ce9a7a08d5e8d1c2d5605", // No name tag?
  "0x05f51aab068caa6ab7eeb672f88c180f67f17ec7", // ABCC
  "0x2ddd202174a72514ed522e77972b461b03155525", // Alcumex Exchange
  "0xf0c80fb9fb22bef8269cb6feb9a51130288a671f", // Artis Turba Exchange 1
  "0x94597850916a49b3b152ee374e97260b99249f5b", // Artis Turba Exchange 2
  "0x82a403c14483931b2ff6e4440c8373ccfee698b8", // ArzPaya.com
  "0x03bdf69b1322d623836afbd27679a1c0afa067e9", // AscendEX 1
  "0x4b1a99467a284cc690e3237bc69105956816f762", // AscendEX 2
  "0x986a2fca9eda0e06fbf7839b89bfc006ee2a23dd", // AscendEX 3
  "0x4df5f3610e2471095a130d7d934d551f3dde01ed", // ATAIX
  "0x92dbd8e0a46edd62aa42d1f7902d0e496bddc15a", // Azbit
  "0xadb72986ead16bdbc99208086bd431c1aa38938e", // Beaxy
  "0x258b7b9a1ba92f47f5f4f5e733293477620a82cb", // Beldex
  "0x7a10ec7d68a048bdae36a70e93532d31423170fa", // Bgogo 1
  "0xce1bf8e51f8b39e51c6184e059786d1c0eaf360f", // Bgogo 2
  "0xf73c3c65bde10bf26c2e1763104e609a41702efe", // Bibox
  "0x0bb5de248dbbd31ee6c402c3c4a70293024acf74", // Bidesk 2
  "0xed5cdb0d02152046e6f234ad578613831b9184d4", // Bidesk 3
  "0xa30d8157911ef23c46c0eb71889efe6a648a41f7", // BigONE
  "0x6eff3372fa352b239bb24ff91b423a572347000d", // BIKI.com
  "0xf7793d27a1b76cdf14db7c83e82c772cf7c92910", // Bilaxy 1
  "0xcce8d59affdd93be338fc77fa0a298c2cb65da59", // Bilaxy 2
  "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be", // Binance
  "0x85b931a32a0725be14285b66f1a22178c672d69b", // Binance 10
  "0x708396f17127c42383e3b9014072679b2f60b82f", // Binance 11
  "0xe0f0cfde7ee664943906f17f7f14342e76a5cec7", // Binance 12
  "0x8f22f2063d253846b53609231ed80fa571bc0c8f", // Binance 13
  "0x28c6c06298d514db089934071355e5743bf21d60", // Binance 14
  "0x21a31ee1afc51d94c2efccaa2092ad1028285549", // Binance 15
  "0xdfd5293d8e347dfe59e90efd55b2956a1343963d", // Binance 16
  "0x56eddb7aa87536c09ccc2793473599fd21a8b17f", // Binance 17
  "0x9696f59e4d72e237be84ffd425dcad154bf96976", // Binance 18
  "0x4d9ff50ef4da947364bb9650892b2554e7be5e2b", // Binance 19
  "0xd551234ae421e3bcba99a0da6d736074f22192ff", // Binance 2
  "0x4976a4a02f38326660d17bf34b431dc6e2eb2327", // Binance 20
  "0xd88b55467f58af508dbfdc597e8ebd2ad2de49b3", // Binance 21
  "0x7dfe9a368b6cf0c0309b763bb8d16da326e8f46e", // Binance 22
  "0x345d8e3a1f62ee6b1d483890976fd66168e390f2", // Binance 23
  "0xc3c8e0a39769e2308869f7461364ca48155d1d9e", // Binance 24
  "0x2e581a5ae722207aa59acd3939771e7c7052dd3d", // Binance 25
  "0x44592b81c05b4c35efb8424eb9d62538b949ebbf", // Binance 26
  "0xd5fd1bc99d5801278345e9d29be2225d06c26e93", // Binance 27
  "0xbb3fd383d1c5540e52ef0a7bcb9433375793aeaf", // Binance 28
  "0x06a0048079ec6571cd1b537418869cde6191d42d", // Binance 29
  "0x564286362092d8e7936f0549571a803b203aaced", // Binance 3
  "0x892e9e24aea3f27f4c6e9360e312cce93cc98ebe", // Binance 30
  "0x00799bbc833d5b168f0410312d2a8fd9e0e3079c", // Binance 31
  "0x141fef8cd8397a390afe94846c8bd6f4ab981c48", // Binance 32
  "0x0681d8db095565fe8a346fa0277bffde9c0edbbf", // Binance 4
  "0xfe9e8709d3215310075d67e3ed32a380ccf451c8", // Binance 5
  "0x4e9ce36e442e55ecd9025b9a6e0d88485d628a67", // Binance 6
  "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8", // Binance 7
  "0xf977814e90da44bfa03b6295a0616a897441acec", // Binance 8
  "0x001866ae5b3de6caa5a51543fd9fb64f524f5478", // Binance 9
  "0xab83d182f3485cf1d6ccdd34c7cfef95b4c08da4", // Binance JEX
  "0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503", // Binance: Binance-Peg Tokens
  "0x4b729cf402cfcffd057e254924b32241aedc1795", // Bit-Z
  "0x7c49e1c0e33f3efb57d64b7690fa287c8d15b90a", // Bit2C
  "0x2b49ce21ad2004cfb3d0b51b2e8ec0406d632513", // Bitbee
  "0x5d375281582791a38e0348915fa9cbc6139e9c2a", // BitBlinx
  "0x7a91a362d4f2c9c4627688d5b7090bbb12e5715f", // Bitci
  "0x28ebe764b8f9a853509840645216d3c2c0fd774b", // BiteBTC
  "0x7217d64f77041ce320c356d1a2185bcb89798a0a", // Bitexlive
  "0x57a47cfe647306a406118b6cf36459a1756823d0", // Bitexlive 2
  "0x1151314c646ce4e0efd76d1af4760ae66a9fe30f", // Bitfinex 1
  "0x36a85757645e8e8aec062a1dee289c7d615901ca", // Bitfinex 10
  "0xc56fefd1028b0534bfadcdb580d3519b5586246e", // Bitfinex 11
  "0x0b73f67a49273fc4b9a65dbd25d7d0918e734e63", // Bitfinex 12
  "0x482f02e8bc15b5eabc52c6497b425b3ca3c821e8", // Bitfinex 13
  "0x742d35cc6634c0532925a3b844bc454e4438f44e", // Bitfinex 2
  "0x876eabf441b2ee5b5b0554fd502a8e0600950cfa", // Bitfinex 3
  "0xdcd0272462140d0a3ced6c4bf970c7641f08cd2c", // Bitfinex 4
  "0x4fdd5eb2fb260149a3903859043e962ab89d8ed4", // Bitfinex 5
  "0x1b29dd8ff0eb3240238bf97cafd6edea05d5ba82", // Bitfinex 6
  "0x30a2ebf10f34c6c4874b0bdd5740690fd2f3b70c", // Bitfinex 7
  "0x3f7e77b627676763997344a1ad71acb765fc8ac5", // Bitfinex 8
  "0x59448fe20378357f206880c58068f095ae63d5a5", // Bitfinex 9
  "0x88d34944cf554e9cccf4a24292d891f620e9c94f", // Bithumb 1
  "0x186549a4ae594fc1f70ba4cffdac714b405be3f9", // Bithumb 10
  "0xd273bd546b11bd60214a2f9d71f22a088aafe31b", // Bithumb 11
  "0x558553d54183a8542f7832742e7b4ba9c33aa1e6", // Bithumb 12
  "0x3052cd6bf951449a984fe4b5a38b46aef9455c8e", // Bithumb 2
  "0x2140efd7ba31169c69dfff6cdc66c542f0211825", // Bithumb 3
  "0xa0ff1e0f30b5dda2dc01e7e828290bc72b71e57d", // Bithumb 4
  "0xc1da8f69e4881efe341600620268934ef01a3e63", // Bithumb 5
  "0xb4460b75254ce0563bb68ec219208344c7ea838c", // Bithumb 6
  "0x15878e87c685f866edfaf454be6dc06fa517b35b", // Bithumb 7
  "0x31d03f07178bcd74f9099afebd23b0ae30184ab5", // Bithumb 8
  "0xed48dc0628789c2956b1e41726d062a86ec45bff", // Bithumb 9
  "0xe79eef9b9388a4ff70ed7ec5bccd5b928ebb8bd1", // BitMart
  "0x68b22215ff74e3606bd5e6c1de8c2d68180c85f7", // BitMart 2
  "0x00bdb5699745f5b860228c8f939abf1b9ae374ed", // Bitstamp 1
  "0x1b8a38ea02ceda9440e00c1aeba26ee2dc570423", // BITStorage
  "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98", // Bittrex
  "0x66f820a414680b5bcda5eeca5dea238543f42054", // Bittrex 3
  "0xaa90b4aae74cee41e004bc45e45a427406c4dcae", // BitUN.io 1
  "0xf8d04a720520d0bcbc722b1d21ca194aa22699f2", // BitUN.io 2
  "0xfb9f7f41319157ac5c5dccae308a63a4337ad5d9", // Bity.com
  "0x00cdc153aa8894d08207719fe921fff964f28ba3", // Bitzlato
  "0x25eaff5b179f209cf186b1cdcbfa463a69df4c45", // Blockfolio
  "0x007174732705604bbbf77038332dc52fd5a5000c", // BlockTrades Exchange
  "0xdf8752caa319668006580ddf48db25a23728b926", // Bololex.com
  "0x1c00d840ccaa67c494109f46e55cfeb2d8562f5c", // BTC-Alpha Exchange
  "0x73957709695e73fd175582105c44743cf0fb6f2f", // Bw.com
  "0xd7c866d0d536937bf9123e02f7c052446588189f", // C2CX: Hot Wallet
  "0x88988d6ef12d7084e34814b9edafa01ae0d05082", // CamboChanger 2
  "0x72bcfa6932feacd91cb2ea44b0731ed8ae04d0d3", // Cashierest
  "0x7a56f645dcb513d0326cbaa048e9106ff6d4cd5f", // Catex Exchange
  "0xfd648cc72f1b4e71cbdda7a0a91fe34d32abd656", // ChainX
  "0x96fc4553a00c117c5b0bed950dd625d1c16dc894", // Changelly
  "0x8958618332df62af93053cb9c535e26462c959b0", // Cobinhood 1
  "0x71660c4005ba85c37ccec55d0c4493e66fe775d3", // Coinbase 1
  "0x503828976d22510aad0201ac7ec88293211d23da", // Coinbase 2
  "0xddfabcdc4d8ffc6d5beaf154f18b778f892a0740", // Coinbase 3
  "0x3cd751e6b0078be393132286c442345e5dc49699", // Coinbase 4
  "0xb5d85cbf7cb3ee0d56b3bb207d5fc4b82f43f511", // Coinbase 5
  "0xeb2629a2734e272bcc07bda959863f316f4bd4cf", // Coinbase 6
  "0x9539e0b14021a43cde41d9d45dc34969be9c7cb0", // Coinbene
  "0x33683b94334eebc9bd3ea85ddbda4a86fb461405", // Coinbene: Cold Wallet
  "0xb6ba1931e4e74fd080587688f6db10e830f810d5", // Coindelta
  "0xb9ee1e551f538a464e8f8c41e9904498505b49b0", // Coinex
  "0x33ddd548fe3a082d753e5fe721a26e1ab43e3598", // Coinex 2
  "0x4b01721f0244e7c5b5f63c20942850e447f5a5ee", // CoinExchange.io
  "0xd4bddf5e3d0435d7a6214a0b949c7bb58621f37c", // Coinhako
  "0xa270f3ad1a7a82e6a3157f12a900f1e25bc4fbfd", // CoinMetro Exchange
  "0x167a9333bf582556f35bd4d16a7e80e191aa6476", // Coinone
  "0x1e2fcfd26d36183f1a5d90f0e6296915b02bcb40", // Coinone 2
  "0xd0808da05cc71a9f308d330bc9c5c81bbc26fc59", // Coinswitch
  "0x8705ccfd8a6df3785217c307cbebf9b793310b94", // CoinW
  "0xcb243bf48fb443082fae7db47ec96cb120cd6801", // CoinW 2
  "0x429bf8ec3330e02401d72beade86000d9a2e19eb", // CoinW 3
  "0x6f31d347457962c9811ff953742870ef5a755de3", // CoinW 4
  "0x0d6b5a54f940bf3d52e438cab785981aaefdf40c", // COSS.io 1
  "0x43f07efe28e092a0fe4ec5b5662022b461ffac80", // COSS.io: Warm Wallet
  "0x521db06bf657ed1d6c98553a70319a8ddbac75a3", // CREX24
  "0x6262998ced04146fa42253a5c0af90ca02dfd2a3", // Crypto.com
  "0x46340b20830761efd32832a74d7169b29feb9758", // Crypto.com 2
  "0x5baeac0a0417a05733884852aa068b706967e790", // Cryptopia 1
  "0x2984581ece53a4390d1f568673cf693139c97049", // Cryptopia 2
  "0xe17ee7b3c676701c66b395a35f0df4c2276a344e", // DigiFinex
  "0x608f94df1c1d89ea13e5984d7bf107df137a6541", // Eigen Fx
  "0xeb9ebf2c624ebee42e0853da6443ddc6c8020de7", // Eigen Fx 2
  "0x8d76166c22658a144c0211d87abf152e6a2d9d95", // Eterbase
  "0xd3808c5d48903be1490989f3fce2a2b3890e8eb6", // Exchange A
  "0x1fd6267f0d86f62d88172b998390afee2a1f54b6", // Exmo 1
  "0xd7b9a9b2f665849c4071ad5af77d8c76aa30fb32", // Exmo 2
  "0x94fe3ad91dacba8ec4b82f56ff7c122181f1535d", // Faa.st
  "0x915d7915f2b469bb654a7d903a5d4417cb8ea7df", // FCoin
  "0x4e5b2e1dc63f6b91cb6cd759936495434c7e972f", // FixedFloat
  "0x14301566b9669b672878d86ff0b1d18dd58054e9", // Flata.Exchange
  "0x91e18ee76483fa2ec5cfe2959df46673c2565be0", // Flybit
  "0x0021845f4c2604c58f9ba5b7bff58d16a2ab372c", // Folgory Exchange
  "0x2faf487a4414fe77e2327f0bf4ae2a264a776ad2", // FTX Exchange
  "0xc098b2a3aa256d2140208c3de6543aaef5cd3a94", // FTX Exchange 2
  "0x0d0707963952f2fba59dd06f2b425ace40b492fe", // Gate.io
  "0x7793cd85c11a924478d358d49b05b37e91b5810f", // Gate.io 2
  "0x1c4b70a3968436b9a0a9cf5205c787eb81bb558c", // Gate.io 3
  "0x9f5ca0012b9b72e8f3db57092a6f26bf4f13dc69", // GBX
  "0xd24400ae8bfebb18ca49be86258a3c749cf46853", // Gemini
  "0x9fb01a2584aac5aae3fab1ed25f86c5269b32999", // GGBTC.com
  "0x9c67e141c0472115aa1b98bd0088418be68fd249", // HitBTC 1
  "0x59a5208b32e627891c389ebafc644145224006e8", // HitBTC 2
  "0xa12431d0b9db640034b0cdfceef9cce161e62be4", // HitBTC 3
  "0x980a4732c8855ffc8112e6746bd62095b4c2228f", // Hoo.com
  "0xd0ec209ad2134899148bec8aef905a6e9997456a", // Hoo.com 2
  "0x993b7fcba51d8f75c2dfaec0d17b6649ee0c9068", // Hoo.com 3
  "0xec293b9c56f06c8f71392269313d7e2da681d9ac", // Hoo.com 4
  "0x0093e5f2a850268c0ca3093c7ea53731296487eb", // Hoo.com 5
  "0x008932be50098089c6a075d35f4b5182ee549f8a", // Hoo.com 6
  "0x274f3c32c90517975e29dfc209a23f315c1e5fc7", // Hotbit
  "0x8533a0bd9310eb63e7cc8e1116c18a3d67b1976a", // Hotbit 2
  "0x562680a4dc50ed2f14d75bf31f494cfe0b8d10a1", // Hotbit 3
  "0xab5c66752a9e8167967685f1450532fb96d5d24f", // Huobi 1
  "0xe93381fb4c4f14bda253907b18fad305d799241a", // Huobi 10
  "0xfa4b5be3f2f84f56703c42eb22142744e95a2c58", // Huobi 11
  "0x46705dfff24256421a05d056c29e81bdc09723b8", // Huobi 12
  "0x32598293906b5b17c27d657db3ad2c9b3f3e4265", // Huobi 13
  "0x5861b8446a2f6e19a067874c133f04c578928727", // Huobi 14
  "0x926fc576b7facf6ae2d08ee2d4734c134a743988", // Huobi 15
  "0xeec606a66edb6f497662ea31b5eb1610da87ab5f", // Huobi 16
  "0x7ef35bb398e0416b81b019fea395219b65c52164", // Huobi 17
  "0x229b5c097f9b35009ca1321ad2034d4b3d5070f6", // Huobi 18
  "0xd8a83b72377476d0a66683cde20a8aad0b628713", // Huobi 19
  "0x6748f50f686bfbca6fe8ad62b22228b87f31ff2b", // Huobi 2
  "0x90e9ddd9d8d5ae4e3763d0cf856c97594dea7325", // Huobi 20
  "0x18916e1a2933cb349145a280473a5de8eb6630cb", // Huobi 21
  "0x6f48a3e70f0251d1e83a989e62aaa2281a6d5380", // Huobi 22
  "0xf056f435ba0cc4fcd2f1b17e3766549ffc404b94", // Huobi 23
  "0x137ad9c4777e1d36e4b605e745e8f37b2b62e9c5", // Huobi 24
  "0x5401dbf7da53e1c9dbf484e3d69505815f2f5e6e", // Huobi 25
  "0x034f854b44d28e26386c1bc37ff9b20c6380b00d", // Huobi 26
  "0x0577a79cfc63bbc0df38833ff4c4a3bf2095b404", // Huobi 27
  "0x0c6c34cdd915845376fb5407e0895196c9dd4eec", // Huobi 28
  "0x794d28ac31bcb136294761a556b68d2634094153", // Huobi 29
  "0xfdb16996831753d5331ff813c29a93c76834a0ad", // Huobi 3
  "0xfd54078badd5653571726c3370afb127351a6f26", // Huobi 30
  "0xb4cd0386d2db86f30c1a11c2b8c4f4185c1dade9", // Huobi 31
  "0x4d77a1144dc74f26838b69391a6d3b1e403d0990", // Huobi 32
  "0x28ffe35688ffffd0659aee2e34778b0ae4e193ad", // Huobi 33
  "0xcac725bef4f114f728cbcfd744a731c2a463c3fc", // Huobi 34
  "0x73f8fc2e74302eb2efda125a326655acf0dc2d1b", // Huobi 35
  "0x0a98fb70939162725ae66e626fe4b52cff62c2e5", // Huobi 36
  "0xf66852bc122fd40bfecc63cd48217e88bda12109", // Huobi 37
  "0x49517ca7b7a50f592886d4c74175f4c07d460a70", // Huobi 38
  "0x58c2cb4a6bee98c309215d0d2a38d7f8aa71211c", // Huobi 39
  "0xeee28d484628d41a82d01e21d12e2e78d69920da", // Huobi 4
  "0x5c985e89dde482efe97ea9f1950ad149eb73829b", // Huobi 5
  "0xdc76cd25977e0a5ae17155770273ad58648900d3", // Huobi 6
  "0xadb2b42f6bd96f5c65920b9ac88619dce4166f94", // Huobi 7
  "0xa8660c8ffd6d578f657b72c0c811284aef0b735e", // Huobi 8
  "0x1062a747393198f70f71ec65a582423dba7e5ab3", // Huobi 9
  "0x3c11c3025ce387d76c2eddf1493ec55a8cc2a0f7", // Idax.global
  "0x51836a753e344257b361519e948ffcaf5fb8d521", // Indodax 1
  "0x9cbadd5ce7e14742f70414a6dcbd4e7bb8712719", // Indodax 2
  "0xb1a34309af7f29b4195a6b589737f86e14597ddc", // IndoEx LTD
  "0x352bdabe484499e4c25c3536cc3eda1edbc5ad29", // KickEX
  "0x2910543af39aba0cd09dbb2d50200b3e800a63d2", // Kraken
  "0xae2d4617c862309a3d75a0ffb358c7a5009c673f", // Kraken 10
  "0x43984d578803891dfa9706bdeee6078d80cfc79e", // Kraken 11
  "0x66c57bf505a85a74609d2c83e94aabb26d691e1f", // Kraken 12
  "0xda9dfa130df4de4673b89022ee50ff26f6ea73cf", // Kraken 13
  "0x0a869d79a7052c7f1b55a8ebabbea3420f0d1e13", // Kraken 2
  "0xe853c56864a2ebe4576a807d26fdc4a0ada51919", // Kraken 3
  "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0", // Kraken 4
  "0x89e51fa8ca5d66cd220baed62ed01e8951aa7c40", // Kraken 7
  "0xc6bed363b30df7f35b601a5547fe56cd31ec63da", // Kraken 8
  "0x29728d0efd284d85187362faa2d4d76c2cfc2612", // Kraken 9
  "0xe8a0e282e6a3e8023465accd47fae39dd5db010b", // Kryptono 1
  "0x2b5634c42055806a59e9107ed44d43c426e58258", // KuCoin
  "0x689c56aef474df92d44a1b70850f808488f9769c", // KuCoin 2
  "0xa1d8d972560c2f8144af871db508f0b0b10a3fbf", // KuCoin 3
  "0x4ad64983349c49defe8d7a4686202d24b25d0ce8", // KuCoin 4
  "0x1692e170361cefd1eb7240ec13d048fd9af6d667", // KuCoin 5
  "0xd6216fc19db775df9774a6e33526131da7d19a2c", // KuCoin 6
  "0xe59cd29be3be4461d79c0881d238cbe87d64595a", // Kucoin 7
  "0x899b5d52671830f567bf43a14684eb14e1f945fe", // KuCoin 8
  "0xea81ce54a0afa10a027f65503bd52fba83d745b8", // Kuna.io
  "0x77ab999d1e9f152156b4411e1f3e2a42dab8cd6d", // Kuna.io 2
  "0x0861fca546225fbf8806986d211c8398f7457734", // LAToken
  "0x7891b20c690605f4e370d6944c8a5dbfac5a451c", // LAToken 2
  "0x1b6c1a0e20af81b922cb454c3e52408496ee7201", // LAToken 3
  "0x8271b2e8cbe29396e9563229030c89679b9470db", // Liqui.io 1
  "0x5e575279bf9f4acf0a130c186861454247394c06", // Liqui.io 2
  "0xedbb72e6b3cf66a792bff7faac5ea769fe810517", // Liquid 1
  "0xdf4b6fb700c428476bd3c02e6fa83e110741145b", // Liquid 2
  "0xdb2cad4f306b47c9b35541988c7656f1bb092e15", // Liquid 3
  "0x9cc2dce817093ceea82bb67a4cf43131fa354c06", // Liquid 4
  "0x243bec9256c9a3469da22103891465b47583d9f1", // Livecoin.net
  "0xaf1931c20ee0c11bea17a41bfbbad299b2763bc0", // Luno 1
  "0x416299aade6443e6f6e8ab67126e65a7f606eef5", // Luno 2
  "0xe03c23519e18d64f144d2800e30e81b0065c48b5", // Mercatox
  "0xac338d9faac562df26d702880c796e1024e2698a", // MinedTrade.com
  "0x75e89d5979e4f6fba9f97c104c2f0afb3f1dcb88", // MXC
  "0x0211f3cedbef3143223d3acf0e589747933e8527", // MXC 2
  "0xae7006588d03bd15d6954e3084a7e644596bc251", // NEXBIT Pro
  "0x6cc5f688a315f3dc28a7781717a9a798a59fda7b", // OKEx
  "0x236f9f97e0e62388479bf9e5ba4889e46b0273c3", // OKEx 2
  "0xa7efae728d2936e78bda97dc267687568dd593f3", // OKEx 3
  "0x2c8fbb630289363ac80705a1a61273f76fd5a161", // OKEx 4
  "0x59fae149a8f8ec74d5bc038f8b76d25b136b9573", // OKEx 5
  "0x98ec059dc3adfbdd63429454aeb0c990fba4a128", // OKEx 6
  "0x5041ed759dd4afc3a72b8192c143f72f4724081a", // OKEx 7
  "0x03e3ff995863828554282e80870b489cc31dc8bc", // OMGFIN Exchange
  "0xaeec6f5aca72f3a005af1b3420ab8c8c7009bac8", // OTCBTC
  "0xbd8ef191caa1571e8ad4619ae894e07a75de0c35", // Paribu 1
  "0x2bb97b6cf6ffe53576032c11711d59bd056830ee", // Paribu 2
  "0xfb90501083a3b6af766c8da35d3dde01eb0d2a68", // Paribu 3
  "0xabc74170f3cb8ab352820c39cc1d1e05ce9e41d3", // Paribu 4
  "0x9acbb72cf67103a30333a32cd203459c6a9c3311", // Paribu 5
  "0xd4dcd2459bb78d7a645aa7e196857d421b10d93f", // Peatio
  "0x32be343b94f860124dc4fee278fdcbd38c102d88", // Poloniex
  "0xb794f5ea0ba39494ce839613fffba74279579268", // Poloniex 3
  "0xa910f92acdaf488fa6ef02174fb86208ad7722ba", // Poloniex 4
  "0xaa9fa73dfe17ecaa2c89b39f0bb2779613c5fc3b", // Poloniex: BAT
  "0x2fa2bc2ce6a4f92952921a4caa46b3727d24a1ec", // Poloniex: BNT
  "0x31a2feb9b5d3b5f4e76c71d6c92fc46ebb3cb1c1", // Poloniex: CVC
  "0x6b71834d65c5c4d8ed158d54b47e6ea4ff4e5437", // Poloniex: FOAM
  "0x48d466b7c0d32b61e8a82cd2bcf060f7c3f966df", // Poloniex: GNO
  "0x0536806df512d6cdde913cf95c9886f65b1d3462", // Poloniex: GNT
  "0x8d451ae5ee8f557a9ce7a9d7be8a8cb40002d5cb", // Poloniex: KNC
  "0xbd2ec7c608a06fe975dbdca729e84dedb34ecc21", // Poloniex: LOOM
  "0xc0e30823e5e628df8bc9bf2636a347e1512f0ecb", // Poloniex: MANA
  "0x65f9b2e4d7aaeb40ffea8c6f5844d5ad7da257e0", // Poloniex: NXC
  "0x36b01066b7fa4a0fdb2968ea0256c848e9135674", // Poloniex: OMG
  "0xab11204cfeaccffa63c2d23aef2ea9accdb0a0d5", // Poloniex: REP
  "0x6795cf8eb25585eadc356ae32ac6641016c550f2", // Poloniex: SNT
  "0xfbf2173154f7625713be22e0504404ebfe021eae", // Poloniex: STORJ
  "0x6f803466bcd17f44fa18975bf7c509ba64bf3825", // Poloniex: USDC
  "0xead6be34ce315940264519f250d8160f369fa5cd", // Poloniex: ZRX
  "0xd344539efe31f8b6de983a0cab4fb721fc69c547", // QuantaEx 1
  "0x5ca39c42f4dee3a5ba8fec3ad4902157d48700bf", // QuantaEx 2
  "0x2a048d9a8ffdd239f063b09854976c3049ae659c", // QuantaEx 3
  "0xb8cf411b956b3f9013c1d0ac8c909b086218207c", // Remitano 1
  "0x2819c144d5946404c0516b6f817a960db37d4929", // Remitano 2
  "0x120a270bbc009644e35f0bb6ab13f95b8199c4ad", // ShapeShift 1
  "0x9e6316f44baeeee5d41a1070516cc5fa47baf227", // ShapeShift 2
  "0x70faa28a6b8d6829a4b1e649d26ec9a2a39ba413", // ShapeShift 3
  "0x563b377a956c80d77a7c613a9343699ad6123911", // ShapeShift 4
  "0xd3273eba07248020bf98a8b560ec1576a612102f", // ShapeShift 5
  "0x3b0bc51ab9de1e5b7b6e34e5b960285805c41736", // ShapeShift 6
  "0xeed16856d551569d134530ee3967ec79995e2051", // ShapeShift 7
  "0x324cc2c9fb379ea7a0d1c0862c3b48ca28d174a4", // SouthXchange
  "0xa96b536eef496e21f5432fd258b6f78cf3673f74", // Switchain
  "0xea3a46bd1dbd0620d80037f70d0bf7c7dc5a837c", // TAGZ 1
  "0xed8204345a0cf4639d2db61a4877128fe5cf7599", // TAGZ 2
  "0x3613ef1125a078ef96ffc898c4ec28d73c5b8c52", // Tidex 1
  "0x0a73573cf2903d2d8305b1ecb9e9730186a312ae", // Tidex 2
  "0x0068eb681ec52dbd9944517d785727310b494575", // Tokocrypto
  "0xb2cc3cdd53fc9a1aeaf3a68edeba2736238ddc5d", // TopBTC
  "0x1119aaefb02bf12b84d28a5d8ea48ec3c90ef1db", // Trade.io
  "0x2f1233ec3a4930fd95874291db7da9e90dfb2f03", // Uex
  "0x390de26d772d2e2005c6d1d24afc902bae37a4bb", // Upbit
  "0xba826fec90cefdf6706858e5fbafcb27a290fbe0", // Upbit 2
  "0x5e032243d507c743b061ef021e2ec7fcc6d3ab89", // Upbit 3
  "0xb436c96c6de1f50a160ed307317c275424dbe4f2", // Vinex
  "0x39f6a6c85d39d5abad8a398310c52e7c374f2ba3", // WhiteBIT
  "0xf5bec430576ff1b82e44ddb5a1c93f6f9d0884f3", // Yobit.net
  "0xd94c9ff168dc6aebf9b6cc86deff54f3fb0afc33", // Yunbi 1
  "0x42da8a05cb7ed9a43572b5ba1b8f82a0a6e263dc", // Yunbi 2
  "0x700f6912e5753e91ea3fae877a2374a2db1245d7", // Yunbi 3
  "0x60d0cc2ae15859f69bf74dadb8ae3bd58434976b", // ZB.com
]);

export default EXCHANGES;
