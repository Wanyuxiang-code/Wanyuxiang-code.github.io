# Yuxiang Wan's Personal Homepage

**Live Site:** [wanyuxiang-code.github.io](https://wanyuxiang-code.github.io)

## 如何编辑内容

所有内容都在 `_data/` 文件夹中，使用简单的 YAML 格式：

| 文件 | 内容 |
|------|------|
| `_data/profile.yml` | 个人信息、头像、社交链接、关于我 |
| `_data/news.yml` | 新闻动态 |
| `_data/education.yml` | 教育经历 |
| `_data/experience.yml` | 研究/工作经历 |
| `_data/projects.yml` | 项目列表 |
| `_data/publications.yml` | 论文发表 |
| `_data/awards.yml` | 荣誉奖项 |

### 示例：添加一条新闻

编辑 `_data/news.yml`，添加：
```yaml
- date: "Jan 2025"
  text: "🎉 这是一条新的新闻！"
```

### 示例：添加一个奖项

编辑 `_data/awards.yml`，添加：
```yaml
- year: "2025"
  title: "奖项名称"
  organization: "颁发机构"
  description: "描述（可选）"
```

## 本地预览

```bash
# 需要安装 Jekyll
bundle install
bundle exec jekyll serve
# 打开 http://localhost:4000
```

## 样式修改

| 修改项 | 文件位置 |
|--------|----------|
| Hero 背景图 | `assets/css/main.css` → `.hero-background` |
| 配色 | `assets/css/main.css` → `:root` 变量 |

## License

MIT
