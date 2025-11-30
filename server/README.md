# Server · 瓜的订阅管理

基于 NestJS + Drizzle ORM + MySQL 的服务端项目。该目录当前完成了阶段 0 的脚手架搭建与技术规范落地。

## 开发环境

- Node.js >= 18.18
- Yarn 1.x
- MySQL 8.x（本地开发可使用 Docker）
- Redis（用于后续会话与调度）

## 初始化步骤

```bash
cd server
yarn install
cp .env.example .env
# 更新 .env 中的连接信息
yarn drizzle:migrate # 如果已有迁移；首次建表可先生成迁移
```

## 常用脚本

```bash
yarn start:dev      # 开发环境热加载
yarn lint           # 代码风格与静态检查
yarn test           # 单元测试
yarn test:e2e       # 端到端测试
yarn drizzle:generate # 基于 schema 生成 SQL 迁移
yarn drizzle:migrate  # 应用迁移
yarn drizzle:studio   # 浏览/验证 Drizzle schema
yarn build          # 构建产物
```

## 目录结构

```
server/
  src/              # NestJS 源码
  src/database/     # Drizzle schema 与连接
  drizzle/migrations/ # Drizzle 迁移产物
  test/             # E2E 测试
  .github/      # 项目级 workflow（仓库根目录）
```

> 下一阶段将按照阶段 1 计划实现认证、用户与订阅基础能力。
