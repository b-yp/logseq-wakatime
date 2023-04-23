import "@logseq/libs";

function main() {
  logseq.Editor.registerSlashCommand('/wakatime', async () => {
    console.log("wakatime")
  })
}

logseq.ready(main).catch(console.error);
