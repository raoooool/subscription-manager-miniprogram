Page({
  data: {
    activeTab: "general",
    statusBarHeight: 0,
    menuButtonHeight: 0,
    menuButtonTop: 0,
    navBarHeight: 0,
    todayDate: "",
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();

    // 计算导航栏高度：胶囊按钮底部到状态栏底部的距离
    const navBarHeight =
      menuButtonInfo.bottom + 10 - systemInfo.statusBarHeight;

    // 格式化今天的日期
    const today = new Date();
    const month = today.toLocaleString("en-US", { month: "long" });
    const day = today.getDate();
    const todayDate = `${month} ${day}`;

    this.setData({
      statusBarHeight: systemInfo.statusBarHeight,
      menuButtonHeight: menuButtonInfo.height,
      menuButtonTop: menuButtonInfo.top,
      navBarHeight: navBarHeight,
      todayDate: todayDate,
    });
  },

  switchTab(e: any) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab,
    });
  },
});
