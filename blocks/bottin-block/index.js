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

    return [
      <InspectorControls style={{ marginBottom: "40px" }}>
        <PanelBody title={"Fiche Bottin Configuration"}>
          <input
            placeholder="Entrer nom d'entreprise"
            value={attributes.bottinSociete}
            onChange={(bottinSociete) => onSocieteChange(bottinSociete)}
          />
        </PanelBody>
      </InspectorControls>,
      <Fiche
        className={className}
        bottinSociete={attributes.bottinSociete}
        // ficheObject={attributes.ficheObject}
        ficheObj={attributes.ficheObj}
        setAttributes={setAttributes}
      />,
    ];
  },
  save() {
    return null;
  },
});
