import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // max 100 request per-hour
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;
