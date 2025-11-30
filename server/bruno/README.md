# Bruno Collection · 瓜的订阅管理 API

此目录存放基于 [Bruno](https://www.usebruno.com/) 的接口调试集合，覆盖 `docs/服务端设计与施工方案.md` 中规划的主要 API。

## 使用方法

1. 安装 Bruno 客户端并导入此目录（`server/bruno`）。
2. 复制 `env/local.env` 为其他环境（例如 `env/dev.env`），补充接口地址与令牌：
   ```ini
   base_url=http://localhost:3000
   wechat_code=replace-with-mini-program-code
   access_token=replace-with-access-token
   refresh_token=replace-with-refresh-token
   ```
3. 在 Bruno 中选择对应环境，使用集合内的请求快速联调：
   - `Auth`：微信登录、刷新、退出
   - `Subscriptions`：订阅 CRUD
   - `Reminders`：提醒配置
   - `Stats`：统计接口
   - `Templates`：模板库
   - `System`：健康检查

> 请求体和路径参数均提供示例值，实际使用时请根据场景替换。
