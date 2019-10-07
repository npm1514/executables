module.exports = () => {
  return `{
  "presets": [
    [
      "@babel/preset-env"
    ],
    "@babel/react"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread"
  ]
}`;
}