module.exports = async function (image, name) {
  const fileName = `${name}.${image.name.split(".").at(-1)}`;
  await image.mv(`./public/${fileName}`);
  return fileName;
};
