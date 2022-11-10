import { Request, Response } from 'express';

const getNotices = (req: Request, res: Response) => {
  res.json({
    data: [
      {
        id: '000000001',
        avatar: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/MSbDR4FR2MUAAAAAAAAAAAAAFl94AQBr',
        title: '你收到了 14 份新周报',
        datetime: '2017-08-09',
        type: 'notification',
      },
    ],
  });
};

export default {
  'GET /api/notices': getNotices,
};
