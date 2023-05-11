module.exports = async function (image, name) {
  const env = process.env.NODE_ENV;
  const fileName = `${name}.${image.mimetype.split("/").at(-1)}`;
  await image.mv(`./${env === "test" ? "tests/img" : "public"}/${fileName}`);
  return fileName;
};
