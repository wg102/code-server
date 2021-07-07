/**
 * @jest-environment jsdom
 */
import { JSDOM } from "jsdom"
import { getNlsConfiguration, nlsConfigElementId, setBodyBackgroundToThemeBackgroundColor } from "../../../src/browser/pages/vscode"

describe("vscode", () => {
  describe("getNlsConfiguration", () => {
    beforeEach(() => {
      const { window } = new JSDOM()
      global.document = window.document
    })

    it("should throw an error if Document is undefined", () => {
      const errorMsgPrefix = "[vscode]"
      const errorMessage = `${errorMsgPrefix} Could not parse NLS configuration. document is undefined.`

      expect(() => {
        getNlsConfiguration(undefined as any as Document)
      }).toThrowError(errorMessage)
    })
    it("should throw an error if no nlsConfigElement", () => {
      const errorMsgPrefix = "[vscode]"
      const errorMessage = `${errorMsgPrefix} Could not parse NLS configuration. Could not find nlsConfigElement with id: ${nlsConfigElementId}`

      expect(() => {
        getNlsConfiguration(document)
      }).toThrowError(errorMessage)
    })
    it("should throw an error if no nlsConfig", () => {
      const mockElement = document.createElement("div")
      mockElement.setAttribute("id", nlsConfigElementId)
      document.body.appendChild(mockElement)

      const errorMsgPrefix = "[vscode]"
      const errorMessage = `${errorMsgPrefix} Could not parse NLS configuration. Found nlsConfigElement but missing data-settings attribute.`

      expect(() => {
        getNlsConfiguration(document)
      }).toThrowError(errorMessage)

      document.body.removeChild(mockElement)
    })
    it("should return the correct configuration", () => {
      const mockElement = document.createElement("div")
      const dataSettings = {
        first: "Jane",
        last: "Doe",
      }

      mockElement.setAttribute("id", nlsConfigElementId)
      mockElement.setAttribute("data-settings", JSON.stringify(dataSettings))
      document.body.appendChild(mockElement)
      const actual = getNlsConfiguration(global.document)

      expect(actual).toStrictEqual(dataSettings)

      document.body.removeChild(mockElement)
    })
  })
  describe.only("setBodyBackgroundToThemeBackgroundColor", () => {
    beforeEach(() => {
      // We need to set the url in the JSDOM constructor
      // to prevent this error "SecurityError: localStorage is not available for opaque origins"
      // See: https://github.com/jsdom/jsdom/issues/2304#issuecomment-622314949
      const { window } = new JSDOM("", {url: "http://localhost"})
      global.document = window.document
      global.localStorage = window.localStorage
    })
    it("should return null", () => {
      localStorage.setItem("colorThemeData", "{\"id\":\"vs-dark max-SS-Cyberpunk-themes-cyberpunk-umbra-color-theme-json\",\"label\":\"Activate UMBRA protocol\",\"settingsId\":\"Activate UMBRA protocol\",\"themeTokenColors\":[{\"settings\":{\"foreground\":\"#eeffffff\",\"background\":\"#263238ff\"}},{\"settings\":{\"fontStyle\":\"italic\",\"foreground\":\"#6766b3\"},\"scope\":[\"comment\",\"punctuation.definition.comment\"]},{\"settings\":{\"foreground\":\"#EEFFFF\"},\"scope\":[\"variable\",\"string constant.other.placeholder\"]},{\"settings\":{\"foreground\":\"#ffffff\"},\"scope\":[\"constant.other.color\"]},{\"settings\":{\"foreground\":\"#FF5370\"},\"scope\":[\"invalid\",\"invalid.illegal\"]},{\"settings\":{\"foreground\":\"#d57bff\"},\"scope\":[\"keyword\",\"storage.type\",\"storage.modifier\"]},{\"settings\":{\"foreground\":\"#00b0ff\"},\"scope\":[\"keyword.control\",\"constant.other.color\",\"punctuation\",\"meta.tag\",\"punctuation.definition.tag\",\"punctuation.separator.inheritance.php\",\"punctuation.definition.tag.html\",\"punctuation.definition.tag.begin.html\",\"punctuation.definition.tag.end.html\",\"punctuation.section.embedded\",\"keyword.other.template\",\"keyword.other.substitution\"]},{\"settings\":{\"foreground\":\"#ff5680\"},\"scope\":[\"entity.name.tag\",\"meta.tag.sgml\",\"markup.deleted.git_gutter\"]},{\"settings\":{\"foreground\":\"#00b0ff\"},\"scope\":[\"entity.name.function\",\"meta.function-call\",\"variable.function\",\"support.function\",\"keyword.other.special-method\"]},{\"settings\":{\"foreground\":\"#b4baff\"},\"scope\":[\"meta.block variable.other\"]},{\"settings\":{\"foreground\":\"#00FF9C\"},\"scope\":[\"support.other.variable\",\"string.other.link\"]},{\"settings\":{\"foreground\":\"#fffc58\"},\"scope\":[\"constant.numeric\",\"constant.language\",\"support.constant\",\"constant.character\",\"constant.escape\",\"variable.parameter\",\"keyword.other.unit\",\"keyword.other\"]},{\"settings\":{\"fontStyle\":\"normal\",\"foreground\":\"#76c1ff\"},\"scope\":[\"string\",\"constant.other.symbol\",\"constant.other.key\",\"entity.other.inherited-class\",\"markup.heading\",\"markup.inserted.git_gutter\",\"meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js\"]},{\"settings\":{\"foreground\":\"#00FF9C\"},\"scope\":[\"entity.name\",\"support.type\",\"support.class\",\"support.orther.namespace.use.php\",\"meta.use.php\",\"support.other.namespace.php\",\"markup.changed.git_gutter\",\"support.type.sys-types\"]},{\"settings\":{\"foreground\":\"#00FF9C\"},\"scope\":[\"support.type\"]},{\"settings\":{\"foreground\":\"#98e3ff\"},\"scope\":[\"source.css support.type.property-name\",\"source.sass support.type.property-name\",\"source.scss support.type.property-name\",\"source.less support.type.property-name\",\"source.stylus support.type.property-name\",\"source.postcss support.type.property-name\"]},{\"settings\":{\"foreground\":\"#ff5680\"},\"scope\":[\"entity.name.module.js\",\"variable.import.parameter.js\",\"variable.other.class.js\"]},{\"settings\":{\"fontStyle\":\"italic\",\"foreground\":\"#ff5680\"},\"scope\":[\"variable.language\"]},{\"settings\":{\"fontStyle\":\"italic\",\"foreground\":\"#6095ff\"},\"scope\":[\"entity.name.method.js\"]},{\"settings\":{\"foreground\":\"#6095ff\"},\"scope\":[\"meta.class-method.js entity.name.function.js\",\"variable.function.constructor\"]},{\"settings\":{\"foreground\":\"#ee6dff\"},\"scope\":[\"entity.other.attribute-name\"]},{\"settings\":{\"fontStyle\":\"italic\",\"foreground\":\"#00FF9C\"},\"scope\":[\"text.html.basic entity.other.attribute-name.html\",\"text.html.basic entity.other.attribute-name\"]},{\"settings\":{\"foreground\":\"#00FF9C\"},\"scope\":[\"entity.other.attribute-name.class\"]},{\"settings\":{\"foreground\":\"#82AAFF\"},\"scope\":[\"source.sass keyword.control\"]},{\"settings\":{\"foreground\":\"#C3E88D\"},\"scope\":[\"markup.inserted\"]},{\"settings\":{\"foreground\":\"#FF5370\"},\"scope\":[\"markup.deleted\"]},{\"settings\":{\"foreground\":\"#C792EA\"},\"scope\":[\"markup.changed\"]},{\"settings\":{\"foreground\":\"#89DDFF\"},\"scope\":[\"string.regexp\"]},{\"settings\":{\"foreground\":\"#89DDFF\"},\"scope\":[\"constant.character.escape\"]},{\"settings\":{\"fontStyle\":\"underline\"},\"scope\":[\"*url*\",\"*link*\",\"*uri*\"]},{\"settings\":{\"fontStyle\":\"italic\",\"foreground\":\"#82AAFF\"},\"scope\":[\"tag.decorator.js entity.name.tag.js\",\"tag.decorator.js punctuation.definition.tag.js\"]},{\"settings\":{\"fontStyle\":\"italic\",\"foreground\":\"#FF5370\"},\"scope\":[\"source.js constant.other.object.key.js string.unquoted.label.js\"]},{\"settings\":{\"foreground\":\"#C792EA\"},\"scope\":[\"source.json meta.structure.dictionary.json support.type.property-name.json\"]},{\"settings\":{\"foreground\":\"#FFCB6B\"},\"scope\":[\"source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json\"]},{\"settings\":{\"foreground\":\"#F78C6C\"},\"scope\":[\"source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json\"]},{\"settings\":{\"foreground\":\"#FF5370\"},\"scope\":[\"source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json\"]},{\"settings\":{\"foreground\":\"#C17E70\"},\"scope\":[\"source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json\"]},{\"settings\":{\"foreground\":\"#82AAFF\"},\"scope\":[\"source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json\"]},{\"settings\":{\"foreground\":\"#f07178\"},\"scope\":[\"source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json\"]},{\"settings\":{\"foreground\":\"#C792EA\"},\"scope\":[\"source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json\"]},{\"settings\":{\"foreground\":\"#C3E88D\"},\"scope\":[\"source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json\"]},{\"settings\":{\"foreground\":\"#EEFFFF\"},\"scope\":[\"text.html.markdown\",\"punctuation.definition.list_item.markdown\"]},{\"settings\":{\"foreground\":\"#C792EA\"},\"scope\":[\"text.html.markdown markup.inline.raw.markdown\"]},{\"settings\":{\"foreground\":\"#65737E\"},\"scope\":[\"text.html.markdown markup.inline.raw.markdown punctuation.definition.raw.markdown\"]},{\"settings\":{\"foreground\":\"\"},\"scope\":[\"text.html.markdown meta.dummy.line-break\"]},{\"settings\":{\"foreground\":\"#C3E88D\"},\"scope\":[\"markdown.heading\",\"markup.heading | markup.heading entity.name\",\"markup.heading.markdown punctuation.definition.heading.markdown\"]},{\"settings\":{\"fontStyle\":\"italic\",\"foreground\":\"#f07178\"},\"scope\":[\"markup.italic\"]},{\"settings\":{\"fontStyle\":\"bold\",\"foreground\":\"#f07178\"},\"scope\":[\"markup.bold\",\"markup.bold string\"]},{\"settings\":{\"fontStyle\":\"bold\",\"foreground\":\"#f07178\"},\"scope\":[\"markup.bold markup.italic\",\"markup.italic markup.bold\",\"markup.quote markup.bold\",\"markup.bold markup.italic string\",\"markup.italic markup.bold string\",\"markup.quote markup.bold string\"]},{\"settings\":{\"fontStyle\":\"underline\",\"foreground\":\"#F78C6C\"},\"scope\":[\"markup.underline\"]},{\"settings\":{\"fontStyle\":\"strike\",\"foreground\":\"\"},\"scope\":[\"markup.strike\"]},{\"settings\":{\"background\":\"#65737E\",\"foreground\":\"#65737E\"},\"scope\":[\"markup.quote punctuation.definition.blockquote.markdown\"]},{\"settings\":{\"fontStyle\":\"italic\",\"foreground\":\"\"},\"scope\":[\"markup.quote\"]},{\"settings\":{\"foreground\":\"#82AAFF\"},\"scope\":[\"string.other.link.title.markdown\"]},{\"settings\":{\"foreground\":\"#C792EA\"},\"scope\":[\"string.other.link.description.title.markdown\"]},{\"settings\":{\"foreground\":\"#FFCB6B\"},\"scope\":[\"constant.other.reference.link.markdown\"]},{\"settings\":{\"foreground\":\"#C792EA\"},\"scope\":[\"markup.raw.block\"]},{\"settings\":{\"foreground\":\"#00000050\"},\"scope\":[\"markup.raw.block.fenced.markdown\"]},{\"settings\":{\"foreground\":\"#00000050\"},\"scope\":[\"punctuation.definition.fenced.markdown\"]},{\"settings\":{\"foreground\":\"#EEFFFF\"},\"scope\":[\"markup.raw.block.fenced.markdown\",\"variable.language.fenced.markdown\",\"punctuation.section.class.end\"]},{\"settings\":{\"foreground\":\"#65737E\"},\"scope\":[\"variable.language.fenced.markdown\"]},{\"settings\":{\"fontStyle\":\"bold\",\"background\":\"#00000050\",\"foreground\":\"#65737E\"},\"scope\":[\"meta.separator\"]},{\"settings\":{\"foreground\":\"#EEFFFF\"},\"scope\":[\"markup.table\"]},{\"settings\":{\"foreground\":\"#6796e6\"},\"scope\":\"token.info-token\"},{\"settings\":{\"foreground\":\"#cd9731\"},\"scope\":\"token.warn-token\"},{\"settings\":{\"foreground\":\"#f44747\"},\"scope\":\"token.error-token\"},{\"settings\":{\"foreground\":\"#b267e6\"},\"scope\":\"token.debug-token\"}],\"semanticTokenRules\":[],\"extensionData\":{\"_extensionId\":\"max-SS.Cyberpunk\",\"_extensionIsBuiltin\":false,\"_extensionName\":\"Cyberpunk\",\"_extensionPublisher\":\"max-SS\"},\"colorMap\":{\"titleBar.activeBackground\":\"#100d23\",\"titleBar.activeForeground\":\"#00ff9c\",\"titleBar.inactiveBackground\":\"#1e1d45\",\"titleBar.inactiveForeground\":\"#00ff9c\",\"titleBar.border\":\"#100d23\",\"editorGutter.background\":\"#05051366\",\"editorGutter.addedBackground\":\"#3c9f4a\",\"editorGutter.deletedBackground\":\"#a22929\",\"editorGutter.modifiedBackground\":\"#26506d\",\"merge.commonContentBackground\":\"#ff004c33\",\"merge.commonHeaderBackground\":\"#ff004c44\",\"merge.currentContentBackground\":\"#00ff8427\",\"merge.currentHeaderBackground\":\"#00ff8450\",\"merge.incomingContentBackground\":\"#003cff42\",\"merge.incomingHeaderBackground\":\"#003cff6b\",\"terminalCursor.foreground\":\"#9dff00\",\"terminal.foreground\":\"#00ff6a\",\"debugToolBar.background\":\"#002212ec\",\"debugToolBar.border\":\"#00ff6a\",\"editorLink.activeForeground\":\"#3d81fe\",\"textLink.activeForeground\":\"#3d5afe\",\"textLink.foreground\":\"#3d5afe\",\"button.background\":\"#00ff9da6\",\"button.foreground\":\"#00140b\",\"button.hoverBackground\":\"#00ff9c\",\"extensionButton.prominentBackground\":\"#00ff9da6\",\"extensionButton.prominentForeground\":\"#00140b\",\"extensionButton.prominentHoverBackground\":\"#00ff9c\",\"diffEditor.insertedTextBackground\":\"#00ff8427\",\"diffEditor.removedTextBackground\":\"#ff174534\",\"gitlens.gutterBackgroundColor\":\"#182333\",\"gitlens.gutterForegroundColor\":\"#00e676\",\"gitlens.gutterUncommittedForegroundColor\":\"#ffff00\",\"gitlens.lineHighlightBackgroundColor\":\"#ff174426\",\"gitlens.lineHighlightOverviewRulerColor\":\"#ffff00\",\"gitlens.trailingLineForegroundColor\":\"#00ff8449\",\"gitDecoration.untrackedResourceForeground\":\"#00ff6a\",\"gitDecoration.deletedResourceForeground\":\"#ff004c\",\"gitDecoration.modifiedResourceForeground\":\"#00c3ff\",\"gitDecoration.conflictingResourceForeground\":\"#ffff00\",\"gitDecoration.ignoredResourceForeground\":\"#6196f770\",\"gitDecoration.submoduleResourceForeground\":\"#ffff00\",\"activityBar.background\":\"#100d23\",\"activityBar.foreground\":\"#00ff9d\",\"activityBarBadge.background\":\"#00ff6a\",\"activityBarBadge.foreground\":\"#001107\",\"badge.background\":\"#00ffc8\",\"badge.foreground\":\"#001107\",\"activityBar.border\":\"#09040f\",\"editor.background\":\"#100d23\",\"editor.foreground\":\"#00ff9c\",\"editorError.foreground\":\"#ff1865\",\"editorRuler.foreground\":\"#182333\",\"editor.lineHighlightBackground\":\"#006eff2d\",\"editor.lineHighlightBorder\":\"#ff000000\",\"editor.selectionBackground\":\"#311b92\",\"editor.selectionHighlightBackground\":\"#5e35b1\",\"editorCursor.foreground\":\"#00ff6a\",\"editorWarning.foreground\":\"#009550\",\"editor.findMatchHighlightBackground\":\"#283593\",\"editor.wordHighlightBackground\":\"#42557b\",\"editor.wordHighlightStrongBackground\":\"#42557b\",\"editorGroup.background\":\"#1b2738\",\"editorGroup.border\":\"#1e2c3f\",\"editorGroupHeader.tabsBackground\":\"#372963\",\"editorIndentGuide.activeBackground\":\"#00ffc8\",\"editorIndentGuide.background\":\"#1e1e44\",\"editorLineNumber.foreground\":\"#3d5afe\",\"editorLineNumber.activeForeground\":\"#00ffc8\",\"editorWhitespace.foreground\":\"#2b3e5a\",\"editorHoverWidget.background\":\"#002212ec\",\"editorHoverWidget.border\":\"#00ff9c\",\"editorSuggestWidget.background\":\"#002212ec\",\"editorSuggestWidget.border\":\"#00ff9c\",\"editorSuggestWidget.selectedBackground\":\"#002f6de8\",\"editorSuggestWidget.highlightForeground\":\"#00c3ff\",\"editorWidget.background\":\"#002212ec\",\"editorBracketMatch.border\":\"#ff004c\",\"editorBracketMatch.background\":\"#ff005533\",\"editorWidget.border\":\"#00ff9c\",\"tab.activeForeground\":\"#00ff9c\",\"tab.border\":\"#372963\",\"tab.inactiveBackground\":\"#1e1d45\",\"tab.inactiveForeground\":\"#7877b3\",\"tab.activeBackground\":\"#100d23\",\"input.background\":\"#002212ec\",\"input.border\":\"#00ff9c\",\"input.foreground\":\"#00ff6a\",\"input.placeholderForeground\":\"#009550\",\"inputValidation.warningBackground\":\"#693300e8\",\"inputValidation.warningBorder\":\"#ff9100\",\"inputValidation.infoBackground\":\"#002f6de8\",\"inputValidation.infoBorder\":\"#00c3ff\",\"inputValidation.errorBackground\":\"#53001ce5\",\"inputValidation.errorBorder\":\"#ff004c\",\"panelTitle.activeBorder\":\"#00ff9c\",\"dropdown.background\":\"#002212ec\",\"dropdown.border\":\"#00ff9c\",\"dropdown.foreground\":\"#00ff9c\",\"statusBar.debuggingBackground\":\"#9900ff33\",\"statusBar.debuggingForeground\":\"#c566fc\",\"statusBar.debuggingBorder\":\"#b700ff\",\"statusBar.background\":\"#002212ec\",\"statusBar.border\":\"#00ff9c\",\"statusBar.foreground\":\"#00ff9c\",\"list.activeSelectionBackground\":\"#002212ec\",\"list.activeSelectionForeground\":\"#00ff9c\",\"list.focusBackground\":\"#002212ec\",\"list.hoverBackground\":\"#002212ec\",\"list.hoverForeground\":\"#00ff9c\",\"list.highlightForeground\":\"#00ff9c\",\"list.inactiveSelectionBackground\":\"#100d23\",\"list.inactiveSelectionForeground\":\"#00ff6a\",\"list.errorForeground\":\"#ff235a\",\"notificationCenter.border\":\"#00ff9c\",\"notificationCenterHeader.background\":\"#002212ec\",\"notificationCenterHeader.foreground\":\"#00ff9c\",\"notificationLink.foreground\":\"#3d5afe\",\"notifications.background\":\"#002212e7\",\"notifications.foreground\":\"#00ff9c\",\"notifications.border\":\"#3d5afe\",\"notificationToast.border\":\"#00ff9c\",\"progressBar.background\":\"#ff4081\",\"peekViewEditor.matchHighlightBackground\":\"#5e35b1\",\"peekView.border\":\"#00e676\",\"peekViewEditor.background\":\"#131341\",\"peekViewResult.background\":\"#131341\",\"peekViewResult.fileForeground\":\"#00e676\",\"peekViewTitle.background\":\"#002212ec\",\"peekViewTitleLabel.foreground\":\"#00e676\",\"peekViewTitleDescription.foreground\":\"#009550\",\"peekViewResult.selectionBackground\":\"#5c35b154\",\"peekViewResult.lineForeground\":\"#7877b3\",\"peekViewResult.matchHighlightBackground\":\"#6a3ecf6e\",\"peekViewResult.selectionForeground\":\"#00e676\",\"panel.background\":\"#131341\",\"panel.border\":\"#00e676\",\"panelTitle.activeForeground\":\"#00e676\",\"panelTitle.inactiveForeground\":\"#7877b3\",\"scrollbarSlider.background\":\"#5c35b154\",\"scrollbarSlider.activeBackground\":\"#6a3ecf6e\",\"scrollbarSlider.hoverBackground\":\"#6a3ecf6e\",\"sideBar.background\":\"#1e1d45\",\"sideBar.border\":\"#09040f\",\"sideBar.foreground\":\"#8b96ff\",\"errorForeground\":\"#ff3270\",\"foreground\":\"#ffffff\",\"sideBarTitle.foreground\":\"#bbbbbb\"},\"watch\":false}")
      expect(setBodyBackgroundToThemeBackgroundColor(document, localStorage)).toBeNull()

      localStorage.removeItem("colorThemeData")
    })
    it("should throw an error if Document is undefined", () => {
      const errorMsgPrefix = "[vscode]"
      const errorMessage = `${errorMsgPrefix} Could not set body background to theme background color. Document is undefined.`

      expect(() => {
        setBodyBackgroundToThemeBackgroundColor(undefined as any as Document, localStorage)
      }).toThrowError(errorMessage)
    })
    it("should throw an error if localStorage is undefined", () => {
      const errorMsgPrefix = "[vscode]"
      const errorMessage = `${errorMsgPrefix} Could not set body background to theme background color. localStorage is undefined.`

      expect(() => {
        setBodyBackgroundToThemeBackgroundColor(document, undefined as any as Storage)
      }).toThrowError(errorMessage)
    })
    it("should throw an error if it can't find colorThemeData in localStorage", () => {
      const errorMsgPrefix = "[vscode]"
      const errorMessage = `${errorMsgPrefix} Could not set body background to theme background color. Could not find colorThemeData in localStorage.`

      expect(() => {
        setBodyBackgroundToThemeBackgroundColor(document, localStorage)
      }).toThrowError(errorMessage)
    })
  })
})
