/** @format */

// module.exports.storeReturnTo = (req, res, next) => {
//      // If there's a returnTo in session, make it available in res.locals
//      if (req.session.returnTo) {
//           res.locals.returnTo = req.session.returnTo;
//      }
//      // // only store the url if it is not login or register
//      //only store the url if it is not login or register
//      if (!["/login", "/"].includes(req.originalUrl)) {
//           // req.session.returnTo = req.originalUrl;
//           res.locals.returnTo = req.originalUrl;
//      }
//      next();
// };

// Middleware to preserve returnTo during login (copies to locals)
module.exports.storeReturnTo = (req, res, next) => {
     if (req.session.returnTo) {
          res.locals.returnTo = req.session.returnTo;
     }
     next();
};
