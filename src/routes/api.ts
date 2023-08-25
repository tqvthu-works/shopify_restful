import Express from 'express';
import AuthRouter from '@routes/api/auth';
import ShopRouter from '@routes/api/shop';
import WebhookRouter from '@routes/api/webhook';

const ApiRouter = Express.Router();
ApiRouter.use('/home', (req, res, next) => {
    res.send(`
  <html>
      <body>
          <h1>Khầy chào các anh em! </h1>
          <img src="https://t.vietgiaitri.com/2022/4/1/bien-cang-nam-idol-dinh-dam-bi-nghi-ngo-gian-lan-thi-cu-do-cap-3-nho-dac-quyen-ngoi-sao-379-6385563.jpeg" alt="Sample Image">
      </body>
  </html>
`);
});
ApiRouter.use(AuthRouter);
ApiRouter.use('/shops', ShopRouter);
ApiRouter.use('/webhooks', WebhookRouter);

export { ApiRouter };
