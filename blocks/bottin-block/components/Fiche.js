const { useState, useEffect } = wp.element;
import axios from "axios";
import DisplayFilteredSearch from "./DisplayFilteredSearch";

function Fiche({ bottinSociete, setAttributes }) {
  const [allFichesSocieteId, setAllFichesSocieteId] = useState([]);
  const [ficheObject, setFicheObject] = useState({});
  const [searchInput, setSearchInput] = useState(null);
  const [filteredSociete, setFilteredSociete] = useState([]);

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
      (elem) => elem.societe.toLowerCase() == bottinSociete.toLowerCase()
    );
    matrouvaille ? setSearchInput(matrouvaille) : setSearchInput(null);
  }, [bottinSociete]);

  useEffect(() => {
    axios
      .get(`https://new.marche.be/wp-json/ca/v1/bottin/${searchInput?.id}`)
      .then((res) => {
        setFicheObject(res.data);
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
  } else {
    return (
      <div>
        <p>Societe: {ficheObject.societe}</p>
        <p>Email: {ficheObject.email}</p>
        <p>Telephone: {ficheObject.telephone}</p>
        <p>
          Adresse:
          {`${ficheObject.localite} ${ficheObject.rue} ${ficheObject.numero}`}
        </p>
      </div>
    );
  }
}

export default Fiche;
