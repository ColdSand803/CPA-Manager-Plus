# 配色主题包

这里放的是**配色包**，和顶栏原有的明暗切换（`data-theme`）是正交的两层：

| 层 | 属性 | 取值 | 负责什么 |
| --- | --- | --- | --- |
| 明暗 | `data-theme` | `white` / `dark` / 未设置 | 亮色还是暗色 |
| 配色包 | `data-palette` | `default` / `mono` | 用哪一套中性色与强调色 |

两者可以任意组合，`mono` 包同时提供亮色和暗色两套值。

## 边界（重要）

配色包**只改颜色 token**，不碰这些：

- 语义状态色 —— `--color-success` / `--color-warning` / `--color-danger` / `--color-info`
  及其 `--data-{green,amber,red,slate}-*` 色阶、`--data-badge-*` 徽章色，全部原样保留。
  看板要靠这些颜色区分「正常 / 告警 / 超额 / 失败」，去色会直接降低可读性。
- 动效 —— 过渡时长、缓动、动画一律不动。
- 层级 —— 圆角、间距、阴影、`--app-gap`、`--app-card-padding` 不动。
- 信息密度 —— 布局、栅格、字号不动。

所以一个配色包能改的，实际上只有：背景、表面、边框、文字分档、主色（`--data-blue-*` 与 `--app-accent`）、
侧栏与输入框底色、玻璃拟态相关变量。

## 现有包

### `default`

现状配色，等价于不加 `data-palette`。定义为空块即可，靠 `themes.scss` 的 `:root` /
`[data-theme]` 兜底。保留这个 key 是为了让切换器有一个明确的「默认」选项。

### `mono`

参考 antfu 博客的极简单色风：中性灰阶、几乎没有品牌色、边框统一用带 alpha 的灰
（`#8884` 一类），暗色底用 `#050505` 而不是纯黑。强调色降到近似中性，但**状态色不变**。

## 加一个新包

1. 在本目录新建 `<name>.scss`
2. 用属性选择器包裹，亮色暗色分别写：

```scss
[data-palette='<name>'] {
  // 亮色 token
}

[data-palette='<name>'][data-theme='dark'] {
  // 暗色 token
}
```

3. 在 `index.scss` 里 `@use` 进来
4. 在 `src/theme/palettes.ts` 的 `PALETTES` 数组里登记 key 和 i18n 文案 key
5. 四个语言包补 `palette.<name>` 文案：`zh-CN` / `zh-TW` / `en` / `ru`

不要在包里写选择器以外的规则（组件样式、布局），那些不属于配色层。
