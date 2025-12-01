type Stat = {
  label: string;
  value: string;
  tag: string;
};

type Upcoming = {
  name: string;
  amount: string;
  date: string;
  cycle: string;
  autopay: boolean;
};

type KitBadge = {
  label: string;
  tone: string;
};

type FeatureBlock = {
  title: string;
  description: string;
  tone: string;
};

Page({
  data: {
    stats: [
      { label: '活跃订阅', value: '12', tag: '实时更新' },
      { label: '本月支出', value: '¥489.00', tag: '自动扣款' },
      { label: '提醒覆盖率', value: '92%', tag: '短信 + 通知' }
    ] as Stat[],
    upcoming: [
      { name: 'Notion', amount: '¥36.00', date: '03-10', cycle: '月付', autopay: true },
      { name: 'Apple One', amount: '¥68.00', date: '03-12', cycle: '家庭', autopay: true },
      { name: 'Figma', amount: '¥188.00', date: '03-21', cycle: '团队', autopay: false }
    ] as Upcoming[],
    kitBadges: [
      { label: 'Input', tone: 'tone-pink' },
      { label: 'Card', tone: 'tone-yellow' },
      { label: 'Drawer', tone: 'tone-blue' },
      { label: 'Sheet', tone: 'tone-mint' },
      { label: 'Tooltip', tone: 'tone-purple' },
      { label: 'Skeleton', tone: 'tone-gray' }
    ] as KitBadge[],
    featureBlocks: [
      {
        title: '块状留白 + 粗边框',
        description: '借鉴 neo-brutalism-ui-library 的卡片和标签，强化立体感与可点击性。',
        tone: 'tone-yellow'
      },
      {
        title: '组件化输入模组',
        description: '表单采用 Input、Tag、Drawer 组合示例，方便移植到 API 场景。',
        tone: 'tone-blue'
      },
      {
        title: '提醒链路预览',
        description: '扣款、自动扣款和提醒状态分层展示，方便核对与扩展。',
        tone: 'tone-pink'
      }
    ] as FeatureBlock[]
  },
  onLoad() {},
  onShow() {},
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },
  goToAddSubscription() {
    wx.navigateTo({ url: '/pages/add-subscription/add-subscription' });
  }
});
