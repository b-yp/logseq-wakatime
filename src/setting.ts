export const initSetting = () => {
  logseq.useSettingsSchema([
    {
      key: "apiKey",
      type: "string",
      title: "API Key",
      description: "Your Secret API Key",
      default: ''
    },
    {
      key: "interval",
      type: "number",
      title: "Interval",
      description: "The interval time for sending a heartbeat, Unit: second.",
      default: 5,
    },
    {
      key: 'url',
      type: 'string',
      title: 'Wakatime URL',
      description: 'The URL of Wakatime',
      default: 'https://api.wakatime.com/api/v1/'
    }
  ])
}
