# Cslper

自用的 Typst 引用文献处理脚本。

在 GB/T 7714 标准中，中英文引文需要分别使用 `等` 或 `et al.` ，这一功能需要 CSL-M 扩展才能实现。Typst 使用的 CSL 解析器 [citationberg](https://github.com/typst/citationberg) 暂不支持 [CSL-M](https://citeproc-js.readthedocs.io/en/latest/csl-m/index.html) 扩展，因此需要“曲线”实现。

注：本 Repo 只支持编号式（引用是上标 [1] [2-3] 这种），不支持作者年份式。

## 食用方法

0. `git clone` 到本地。

1. 安装 [Deno](https://deno.com) 。当然也可以用 Node 搭配自己喜欢的包管理器等等，需要自己改一下代码。

2. 将自己的引文库导出为 CSL JSON 格式。如果是 Zotero 用户，请在 `导出文献库` 或 `导出条目` 内选择 `CSL JSON` 或 `Better CSL JSON` （若安装了 Better BibTex 插件）。

3. 准备好符合要求的 CSL 格式文件，可以到 https://github.com/redleafnew/Chinese-STD-GB-T-7714-related-csl 搜寻。

4. 修改 `main.ts` 内开头的两行内容，使其指向上两步中准备的文件。

5. 运行 `deno convert`，会生成 `bibout.bib`。

6. 到 Typst 里，使用

```typst
#bibliography("bibout.bib", style: "tab.csl")
```

其中 `tab.csl` 是本 Repo 里的 `tab.csl` 文件。

## 附注

参考 https://github.com/cherichy/BUAA-typst/blob/main/typstcite.md 。

原本想 WASM 缝个 citation.js 到 typst，后来发现凑合一下也不是不能用.jpg
