// export const generateToken =(user,message,statusCode,res)=>{
//     const token =user.generateJsonWebToken();
//     res.status(statusCode).cookie("token",token,{
//         expires:new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
//     ),
//     httpOnly:true
//     }).json({
//         success:true,
//         message,
//         token,
//         user,
//     })
// }

export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const isProd = process.env.NODE_ENV === "production";

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24*60*60*1000
      ),
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
      // domain: isProd ? ".your-frontend-domain.com" : undefined,
    })
    .json({ success: true, message, token, user });
};
