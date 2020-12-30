function DisplayFilteredSearch({
  filteredSociete,
  setAttributes,
  bottinSociete,
}) {
  console.log(filteredSociete);

  const handleClick = (temp_event) => {
    // console.log("clicked");
    let societe = temp_event.target.id;
    setAttributes({
      bottinSociete: societe,
    });
    console.log(bottinSociete);
  };

  return (
    <div style={{ height: "300px", overflowY: "scroll" }}>
      {filteredSociete.map((elem, key) => {
        return (
          <p
            style={{ cursor: "pointer" }}
            id={elem.societe}
            key={key}
            onClick={(e) => handleClick(e)}
          >
            {elem.societe}
          </p>
        );
      })}
    </div>
  );
}

export default DisplayFilteredSearch;
