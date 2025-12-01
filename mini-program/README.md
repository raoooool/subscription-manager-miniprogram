# Frontend (WeChat Mini Program)

这是基于原生微信小程序的前端骨架，已启用 TypeScript，仅包含基础页面与配置，尚未接入业务逻辑。页面默认视觉为 Neobrutalism（高饱和色块、粗描边与投影），样式参考 [neobrutalism-components](https://github.com/ekmas/neobrutalism-components) 并做了小程序适配。

## 目录

- `project.config.json`：微信开发者工具项目配置，使用 `touristappid` 作为占位。请在接入时替换为真实 AppID。
- `miniprogram/app.*`：全局配置与样式。
- `miniprogram/styles/tailwind.css`：Tailwind 入口，包含 Neo Brutalism 的组件样式（卡片、按钮、标签、输入等）。
- `miniprogram/pages/index`：示例首页（TypeScript）。
- `tsconfig.json`：供类型检查使用，启用了 `miniprogram-api-typings`。

## 开发

1. 在仓库根目录执行 `yarn install`，由 Yarn Workspaces 管理依赖（会安装小程序类型定义）。
2. 打开微信开发者工具，选择“导入项目”，路径指向 `mini-program`，AppID 可用占位符或真实 ID。
3. 启动样式监听：`yarn workspace @guasubscription/mini-program dev`（Tailwind 编译到 `miniprogram/styles/tailwind.wxss`，微信开发者工具会自动热更新）。
4. 生产样式构建：`yarn workspace @guasubscription/mini-program build`。
5. 如需运行后端服务，使用 `yarn workspace @guasubscription/server start:dev`。
6. 可运行 `yarn workspace @guasubscription/mini-program typecheck` 做 TypeScript 静态检查。
7. 后续可在 `mini-program/miniprogram` 下按业务新增页面、组件与接口调用。

### Tailwind 使用说明

- Tailwind 配置位于 `mini-program/tailwind.config.js`，关闭了 `preflight`，扩展了 Neo Brutalism 相关的色板和阴影。
- 组件层样式集中在 `miniprogram/styles/tailwind.css`，使用 `@layer components` + `@apply` 定义 `nb-card`、`nb-button`、表单/标签等基类，页面可直接复用。
- 全局 WXSS 通过 `miniprogram/app.wxss` 引入编译产物 `styles/tailwind.wxss`，无需在各页面单独导入。
- 如在 WXML 中直接使用 Tailwind 原子类，避免带冒号/斜杠的写法（如 `md:`、`w-1/2`），优先使用简单短横线命名的工具类。
