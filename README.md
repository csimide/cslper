# Cslper

自用的 Typst 引用文献处理脚本。

在 GB/T 7714 标准中，中英文引文需要分别使用 `等` 或 `et al.` ，这一功能需要 CSL-M 扩展才能实现。Typst 使用的 CSL 解析器 [citationberg](https://github.com/typst/citationberg) 暂不支持 [CSL-M](https://citeproc-js.readthedocs.io/en/latest/csl-m/index.html) 扩展，因此需要“曲线”实现。

> [!NOTE]
>
> 如果使用 GB/T 7714-2015-numeric 及其衍生格式，建议使用
> https://github.com/nju-lug/modern-nju-thesis/issues/3
> 方案。此 Repo 仅保留备查。

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

## 原理解释

- `main.ts` 使用 `citation-js` 将输入文件的所有参考文献条目都按指定的 CSL 处理成符合要求的格式，作为该条目的 `title` 生成新的 bibtex 文件。使用停用词法和 `language` 字段内是否包含 `en` 来判定参考文献的语种，并选用 `et al.` 或 `等`。

- `tab.csl` 是一个编号式的 CSL 引注文件，但参考文献表部分只显示 bib 中的 `title` 部分。

这两者结合，相当于使用脚本生成符合要求的引注条目，再在 typst 中引用。

## 附注

参考 https://github.com/cherichy/BUAA-typst/blob/main/typstcite.md 。

本 Repo 中 `locates-zh-CN.xml` 来自 [citation-style-language/locales@6de1dc29](https://github.com/citation-style-language/locales/blob/6de1dc298a357ef89b965c975eed967f211028c0/locales-zh-CN.xml)，采用 Creative Commons Attribution-ShareAlike 3.0 协议授权使用。原贡献者列表在此文件内。

原本想 WASM 缝个 citation.js 到 typst，后来发现凑合一下也不是不能用.jpg
