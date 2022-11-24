module.exports = {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    {
      name: "removeAttrs",
      params: {
        attrs: "path:stroke-width",
      },
    },
    {
      name: "convertColors",
      params: {
        currentColor: true,
      },
    },
    {
      name: "addClassesToSVGElement",
      params: {
        className: "icon",
      },
    },
    { name: "removeXMLNS" },
    {
      name: "sortAttrs",
      params: {
        xmlnsOrder: "alphabetical",
      },
    },
    { name: "removeDimensions" },
  ],
};
