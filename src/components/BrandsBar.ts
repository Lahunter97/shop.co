import adidas from '../assets/adidas.png';
import nike from '../assets/nike.png';
import camper from '../assets/camper.png';
import polo from '../assets/polo.png';
import tomtailor from '../assets/tomtailor.png';
import levis from '../assets/levis.png';

export default function renderBrandsBar(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'section';
  section.style.backgroundColor = '#fff';
  section.style.padding = '1.5rem 2rem';

  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';
  container.style.justifyContent = 'center';
  container.style.gap = '1.5rem';

  section.appendChild(container);

  const brands = [
    { name: 'Adidas', logo: adidas },
    { name: 'Nike', logo: nike },
    { name: 'Camper', logo: camper },
    { name: 'Polo', logo: polo },
    { name: 'Tommy Jeans', logo: tomtailor },
    { name: "Levi's", logo: levis },
  ];

  brands.forEach(({ name, logo }) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      width: 120px;
      height: 80px;
      padding: 0.5rem;
      background-color: #fff;
      border-radius: 8px;
      transition: transform 0.3s;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    wrapper.addEventListener('mouseenter', () => {
      wrapper.style.transform = 'scale(1.1)';
    });
    wrapper.addEventListener('mouseleave', () => {
      wrapper.style.transform = 'scale(1)';
    });

    const img = document.createElement('img');
    img.src = logo;
    img.alt = name;
    img.style.cssText = `
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    `;

    wrapper.appendChild(img);
    container.appendChild(wrapper);
  });

  return section;
}
