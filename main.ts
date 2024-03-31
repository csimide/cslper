import { Cite, plugins } from "npm:@citation-js/core";
import "npm:@citation-js/plugin-csl";
import "npm:@citation-js/plugin-bibtex";

// 请在这里提供 CSL JSON 格式的引用文献表
const csljson = await Deno.readTextFile("csljson.json");

// 请在这里定义 CSL 格式文件
const template = await Deno.readTextFile(
  "000gb-t-7714-2015-numeric-bilingual.csl",
);

const cn_stopwords_regex = /[以定的理研分究析控基用方设计中]/;

const bibs = JSON.parse(csljson);

const templateName = "custom1";

let config = plugins.config.get("@csl");
config.templates.add(templateName, template);
config.locales.add("zh-CN", await Deno.readTextFile("locales-zh-CN.xml"));

for (const i in bibs) {
  const cite = new Cite(bibs[i]);
  const language = ((typeof bibs[i]["language"] === "string" &&
      bibs[i]["language"].toLowerCase().includes("en")) ||
      bibs[i]["title"] === "string" &&
        !cn_stopwords_regex.test(bibs[i]["title"]))
    ? "en-US"
    : "zh-CN";
  const bib_l = cite.format("bibliography", {
    template: templateName,
    lang: language,
  });
  bibs[i]["title"] = bib_l.replace(/\[\d+\] /, "").replace(/\n/g, "");
}

config = plugins.config.get("@bibtex");
config.format.asciiOnly = false;

await Deno.writeTextFile(
  "bibout.bib",
  new Cite(bibs).format(
    "bibtex",
  ),
);
