const Secret = require('../models/secret');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

// send secrets' status for home page list
exports.getAllStatus = async (req, res) => {
  const allSecrets = await Secret.find();
  if (!allSecrets.length) {
    res.sendStatus(404);
    return;
  }
  allSecrets.forEach(async el => {
    // if there are no more viewing option then remove that collection
    if (
      el.remainingViews <= 0 ||
      new Date(el.expiresAt).getMinutes() - new Date().getMinutes() <= 0
    ) {
      await Secret.findByIdAndRemove(el._id.toString());
    }
  });
  // reduce the data to not sending back the raw secret message
  const reducedData = allSecrets.map(el => {
    return {
      hash: el.hash,
      remainingViews: el.remainingViews,
      createdAt: el.createdAt,
      expiresAt: el.expiresAt,
    };
  });
  res.status(200).json(reducedData);
};

// get the requested collection
exports.getSecret = async (req, res) => {
  const secret = await Secret.findOne({ hash: req.params.secret });
  // decrease the remaining view by 1
  await Secret.updateOne(
    { hash: req.params.secret },
    { $inc: { remainingViews: -1 } }
  );
  // if there are no more viewing option then remove that collection
  if (
    secret?.remainingViews <= 0 ||
    new Date(secret?.expiresAt).getMinutes() - new Date().getMinutes() < 0
  ) {
    await Secret.findByIdAndRemove(secret?._id.toString());
  }
  let decrypted = 'Nothing to see here';
  if (secret) {
    decrypted = cryptr.decrypt(secret?.hash);
  }
  res.status(200).json({ secretText: decrypted });
  return;
};

// post a new secret message to DB
exports.postSecret = async (req, res) => {
  const { secret } = req.body;
  if (!secret) {
    res.sendStatus(404);
    return;
  }
  // turn the "expire after" input number to a valid Date type
  const date = new Date();
  date.setMinutes(date.getMinutes() + secret?.expireAfter);
  const laterDate = new Date(date);

  // if the "expire after" input value is zero the data never expires by time
  const expiresAtValue = secret?.expireAfter > 0 ? laterDate : [null];

  const hashedSecret = cryptr.encrypt(secret?.secret);
  // create the new collection from the model
  const newSecret = new Secret({
    hash: hashedSecret,
    secretText: secret?.secret,
    remainingViews: secret?.expireAfterViews,
    createdAt: new Date(),
    expiresAt: expiresAtValue,
  });
  const savedNewSecret = await newSecret.save();

  res.status(200).json(savedNewSecret);
};
