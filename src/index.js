import * as cheerio from "cheerio";
const main = (url) => {
  (async () => {
    const req = await fetch("https://ssstik.io/abc?url=dl", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
      },
      body: `id=${url}&locale=en&tt=SGlSc1Q_`,
    });
    const $ = cheerio.load(await req.text());

    const data = {
      username: $(".pure-u-18-24.pd-lr").text(),
      avatar: $(".result_author").attr("src"),
      img_thumbnail: /background-image:\s*url\(([^)]+)\)/
        .exec($("style").text())[1]
        .replace(/['"]/g, ""),
      mp4: $(
        ".pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.without_watermark.vignette_active.notranslate"
      ).attr("href"),
      mp3: $(
        ".pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.music.vignette_active.notranslate"
      ).attr("href"),
    };

    console.log(data);
  })();
};
// https://www.tiktok.com/@freyajkt48/video/7305074556123761926
const url = "https://www.tiktok.com/@babunwafi813/video/7299026002838080774";

main(url);
