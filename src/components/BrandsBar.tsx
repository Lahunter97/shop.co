import adidasLogo from "../assets/adidas.png";
import nikeLogo from "../assets/nike.png";
import camperLogo from "../assets/camper.png";
import poloLogo from "../assets/polo.png";
import tommyLogo from "../assets/tomtailor.png";
import levisLogo from "../assets/levis.png";

export default function BrandsBar() {
  const brands = [
    { name: "Adidas", logo: adidasLogo },
    { name: "Nike", logo: nikeLogo },
    { name: "Camper", logo: camperLogo },
    { name: "Polo", logo: poloLogo },
    { name: "Tommy Jeans", logo: tommyLogo },
    { name: "Levi's", logo: levisLogo },
  ];

  return (
    <section
      className="section"
      style={{
        backgroundColor: "#fff",
        padding: "1.5rem 2rem",
      }}
    >
      <div
        className="is-flex is-align-items-center is-justify-content-center"
        style={{
          gap: "3rem",
          flexWrap: "nowrap",
          whiteSpace: "nowrap",
        }}
      >
        {brands.map(({ name, logo }) => (
          <div
            key={name}
            className="is-flex is-align-items-center is-justify-content-center"
            style={{
              minWidth: "120px",
              minHeight: "80px",
              maxWidth: "150px",
              maxHeight: "100px",
              padding: "0.5rem",
              backgroundColor: "#fff",
              borderRadius: "8px",
              transition: "transform 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={logo}
              alt={name}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                backgroundColor: "transparent",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
