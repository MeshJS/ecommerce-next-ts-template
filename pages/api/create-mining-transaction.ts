import {
  AppWallet,
  AssetMetadata,
  ForgeScript,
  keepRelevant,
  Mint,
  Transaction,
  KoiosProvider,
} from "@meshsdk/core";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Unit, Quantity } from "@meshsdk/core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recipientAddress = req.body.recipientAddress;
  const utxos = req.body.utxos;
  const koiosProvider = new KoiosProvider("api");
  const paymentToken =
    "8db269c3ec630e06ae29f74bc39edd1f87c819f1056206e879a1cd61446a65644d6963726f555344";
  const paymentTokenQuantity = 5000000;
  const bankWalletAddress =
    "addr1qyjtjxjkhskglfefwe9kanvk7wczft0q6ngyhyh9es0km27q3upff6k44dawpnj5w8w5suq8jxff0w54yv90yte9u46st87vk3";

  const appWallet = new AppWallet({
    networkId: 1,
    fetcher: koiosProvider,
    submitter: koiosProvider,
    key: {
      type: "mnemonic",
      words: [
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
      ],
    },
  });

  // minting script
  const appWalletAddress = appWallet.getPaymentAddress();
  const forgingScript = ForgeScript.withOneSignature(appWalletAddress);

  // define assets
  const assetName = "Basic-Tee-6-Pack_12206";

  const assetMetadata: AssetMetadata = {
    name: "Basic Tee 6-Pack",
    image: "https://ecommerce-template.meshjs.dev/product.jpg",
    mediaType: "image/jpg",
    description: [
      "The 6-Pack includes two black, two white,",
      " and two heather gray Basic Tees.",
    ],
    store: "Mesh Store - https://meshjs.dev/",
  };

  const asset: Mint = {
    assetName: assetName,
    assetQuantity: "1",
    metadata: assetMetadata,
    label: "721",
    recipient: recipientAddress,
  };

  const assetMap = new Map<Unit, Quantity>();
  assetMap.set(paymentToken, paymentTokenQuantity.toString());
  const selectedUtxos = keepRelevant(assetMap, utxos);

  // create the transaction
  const tx = new Transaction({ initiator: appWallet });
  tx.setTxInputs(selectedUtxos);
  tx.mintAsset(forgingScript, asset);
  tx.sendAssets(bankWalletAddress, [
    {
      unit: paymentToken,
      quantity: paymentTokenQuantity.toString(),
    },
  ]);

  tx.setChangeAddress(recipientAddress);
  const _unsignedTx = await tx.build();
  const unsignedTx = await appWallet.signTx(_unsignedTx, true);

  res.status(200).json({ unsignedTx: unsignedTx });
}
