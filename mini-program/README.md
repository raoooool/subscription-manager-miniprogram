# Frontend (WeChat Mini Program)

这是基于原生微信小程序的前端骨架，已启用 TypeScript，仅包含基础页面与配置，尚未接入业务逻辑。

## 目录

- `project.config.json`：微信开发者工具项目配置，使用 `touristappid` 作为占位。请在接入时替换为真实 AppID。
- `miniprogram/app.*`：全局配置与样式。
- `miniprogram/pages/index`：示例首页（TypeScript）。
- `tsconfig.json`：供类型检查使用，启用了 `miniprogram-api-typings`。

## 开发

1. 在仓库根目录执行 `yarn install`，由 Yarn Workspaces 管理依赖（会安装小程序类型定义）。
2. 打开微信开发者工具，选择“导入项目”，路径指向 `mini-program`，AppID 可用占位符或真实 ID。
3. 如需运行后端服务，使用 `yarn workspace @guasubscription/server start:dev`。
4. 可运行 `yarn workspace @guasubscription/mini-program typecheck` 做 TypeScript 静态检查。
5. 后续可在 `mini-program/miniprogram` 下按业务新增页面、组件与接口调用。
