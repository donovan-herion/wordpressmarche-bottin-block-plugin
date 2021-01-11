const { useState, useEffect } = wp.element;
import axios from "axios";
import DisplayFilteredSearch from "./DisplayFilteredSearch";

function Fiche({ bottinSociete, ficheObj, fullVersionChecked, setAttributes }) {
  const [allFichesSocieteId, setAllFichesSocieteId] = useState([]);
  const [searchInput, setSearchInput] = useState(null);
  const [filteredSociete, setFilteredSociete] = useState([]);
  const [linkToFiche, setLinkToFiche] = useState(null);

  console.log(searchInput);

  console.log(ficheObj, "ici mon objet");

  const getFichesSocieteId = () => {
    axios
      .get(`https://new.marche.be/wp-json/ca/v1/bottinsocieteid`)
      .then((res) => {
        setAllFichesSocieteId(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getFichesSocieteId();
  }, []);

  console.log(allFichesSocieteId);

  useEffect(() => {
    let matrouvaille = allFichesSocieteId.find(
      (elem) => elem.societe.toLowerCase() == bottinSociete?.toLowerCase()
    );
    matrouvaille ? setSearchInput(matrouvaille) : setSearchInput(null);
  }, [bottinSociete, allFichesSocieteId]);

  useEffect(() => {
    axios
      .get(`https://new.marche.be/wp-json/ca/v1/bottin/${searchInput?.id}`)
      .then((res) => {
        setAttributes({ ficheObj: res.data });
        console.log(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [searchInput]);

  useEffect(() => {
    if (bottinSociete) {
      let filteredSociete = allFichesSocieteId.filter((elem) =>
        elem.societe.toLowerCase().includes(bottinSociete.toLowerCase())
      );
      console.log("FilteredSoc", filteredSociete);
      filteredSociete
        ? setFilteredSociete(filteredSociete)
        : setFilteredSociete([]);
    }
  }, [bottinSociete, allFichesSocieteId]);

  useEffect(() => {
    let windowLocationHref = window.location.href;
    let prefixUrl = windowLocationHref.split("wp")[0];
    let ficheSlug = ficheObj.slug;
    setLinkToFiche(`${prefixUrl}/bottin/fiche/${ficheSlug}`);
  }, []);

  if (!bottinSociete) {
    return (
      <div
        style={{
          border: "2px solid #EFDF38",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <img
          style={{ borderRadius: "50%" }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Annuaire.jpg/220px-Annuaire.jpg"
          alt=""
        />
        Veuillez entrer le nom d'une entreprise dans la configuration du block
      </div>
    );
  } else if (searchInput == null) {
    return (
      <DisplayFilteredSearch
        filteredSociete={filteredSociete}
        setAttributes={setAttributes}
        bottinSociete={bottinSociete}
      />
    );
    // } else if (!fullVersionChecked) {
  } else {
    //TODO JF ACTIVER LA LIGNE CI DESSUS POUR ACTIVER LE RENDU CONDITIONNEL SUR BASE DE LA CHECKBOX
    return (
      <div>
        <h2>{ficheObj?.societe}</h2>
        <p>{ficheObj?.email}</p>
        <p>{ficheObj?.telephone}</p>
        <p>{`${ficheObj?.localite} ${ficheObj?.rue} ${ficheObj?.numero}`}</p>
        <p>
          <a href={ficheObj?.website} target="_blank">
            {ficheObj?.website}
          </a>
        </p>
        <p>
          <a href={linkToFiche} target="_blank">
            Plus d'information
          </a>
        </p>
      </div>
    );
  }
  // } else {
  // return (
  // <div>
  {
    /* <p>{fullVersionChecked ? "true" : "false or undefined"}</p> */
  }
  {
    /* TODO:JF  */
  }
  {
    /* Ici entrer ce qui devrait s'afficher dans la partie administration du block bottin  */
  }
  {
    /* apres avoir selectionne une fiche particuliere */
  }

  {
    /* !! Il faut aussi adapter index.js pour decommenter la checkbox responsable du changement
        d'etat de fullVersionChecked */
  }
  // </div>
  // );
  // }
}

export default Fiche;
