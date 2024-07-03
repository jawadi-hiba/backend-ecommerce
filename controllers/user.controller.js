export const getUsers = (req, res) => {
  res.json({ name: "userName" });
};

export const allAccess = (req, res) => {
  res.status(200).send("public content .");
};

export const userBoard = (req, res) => {
  res.status(200).send("User content.");
};

export const adminBoard = (req, res) => {

  res.status(200).send("admin content.");
};

export const superAdminBoard = (req, res) => {
  res.status(200).send("superAdmin content.");
};

