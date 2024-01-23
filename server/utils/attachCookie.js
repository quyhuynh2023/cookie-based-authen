const attachCookie = ({ res, sessionId }) => {
  
  res.cookie("session.id", sessionId, {
    httpOnly: true,
  });
};

export default attachCookie;
