import jwt from "jsonwebtoken";



export const generatedToken = async (data) => {
  if (!process.env.JWT_SECRET)
    return console.log("provide the JWT Secret key for generating token");
      

  const newToken = jwt.sign({ _id: data._id,isAdmin:data?.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  return newToken
};
