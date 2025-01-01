import "@logseq/libs";

import { logseq as PL } from "../package.json";
import { initSetting } from "./setting";
import { sendHeartbeats } from "./api";

const pluginId = PL.id;

const setHeartbeats = async (entity?: string) => {
  const graph = await logseq.App.getCurrentGraph()

  const heartbeatsData = {
    entity,
    type: "file",
    time: Math.floor(Date.now() / 1000),
    project: graph?.name,
    language: "markdown",
    is_write: true
  }
  sendHeartbeats(heartbeatsData)
}

const init = () => {
  let time = 0
  const interval = (logseq.settings?.interval || 5) * 1000

  logseq.App.onRouteChanged((res) => {
    setHeartbeats(res?.parameters?.path?.name)
  })

  logseq.DB.onChanged(async ({ blocks }) => {
    if (new Date().getTime() - time > interval) {
      time = new Date().getTime()

      const block = blocks[0]
      const page = await logseq.Editor.getPage(block?.page?.id)

      setHeartbeats(page?.name)
    }
  })
}

async function main() {
  console.info(`#${pluginId}: MAIN`)

  initSetting()

  if (!logseq.settings?.apiKey) {
    logseq.UI.showMsg(`Please set the Wakatime API key first`, "error")
  }

  if (logseq.settings?.url.trim() === '') {
    logseq.UI.showMsg(`Please set the Wakatime host first`, "error")
  }

  logseq.onSettingsChanged((current) => {
    if (!current.apiKey) return
    init()
  })
}

logseq.ready(main).catch(console.error)
