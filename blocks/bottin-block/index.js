const { default: Fiche } = require("./components/Fiche");

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls } = wp.editor;
const { PanelBody } = wp.components;

registerBlockType("bottin-block-plugin/bottin-block", {
  title: "Bottin Block",
  description: "Block Fiches Bottin",
  icon: "book-alt",
  category: "layout",
  supports: {
    html: false,
  },
  edit({ className, attributes, setAttributes }) {
    const onSocieteChange = (temp_bottinSociete) => {
      setAttributes({ bottinSociete: temp_bottinSociete.target.value });
    };

    const onFullVersionCheckedChange = (temp_fullVersionChecked) => {
      setAttributes({
        fullVersionChecked: temp_fullVersionChecked.target.checked,
      });
    };

    return [
      <InspectorControls style={{ marginBottom: "40px" }}>
        <PanelBody title={"Fiche Bottin Configuration"}>
          <input
            placeholder="Entrer nom d'entreprise"
            value={attributes.bottinSociete}
            onChange={(bottinSociete) => onSocieteChange(bottinSociete)}
          />

          {/* TODO JF
          decommenter si besoin d'un rendu conditionnel sur base d'une checkbox */}
          {/* <br />
          <br />
          <input
            name="fullVersionChecked"
            type="checkbox"
            checked={attributes.fullVersionChecked}
            onChange={(fullVersionChecked) =>
              onFullVersionCheckedChange(fullVersionChecked)
            }
          />
          <label htmlFor="fullVersionChecked">
            Afficher La version complete
          </label> */}
        </PanelBody>
      </InspectorControls>,
      <Fiche
        className={className}
        bottinSociete={attributes.bottinSociete}
        // ficheObject={attributes.ficheObject}
        ficheObj={attributes.ficheObj}
        setAttributes={setAttributes}
        fullVersionChecked={attributes.fullVersionChecked}
      />,
    ];
  },
  save() {
    return null;
  },
});
